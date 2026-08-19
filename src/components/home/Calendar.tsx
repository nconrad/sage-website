import { useEffect, useState } from 'react'


const calID = '65dcf6922cf9f84679f598865716f1fea2b7d974896c300fda9d3e26810aa1e8@group.calendar.google.com'
const apiKey = 'AIzaSyAchO5mV1RTkQvvQSqndYg3eM6MQSkIr9o'
const url = `https://www.googleapis.com/calendar/v3/calendars/${calID}/events?key=${apiKey}&singleEvents=true&calendarID=primary`

// Number of upcoming "Office Hours" recurring events to always include
const OFFICE_HOURS_COUNT = 3

// Event IDs to always show, even if they fall outside the normal fetch window.
// Add entries here to pin important future events (e.g. hackathons, workshops).
// `until` is optional; when set, the pin is dropped automatically after that date.
const PINNED_EVENTS: {id: string, until?: string}[] = [
  // {id: '4ld0b9jdcqt8ofkvqt32c6dea3', until: '2026-07-29'},  // Sage Grande Summer of AI Hack and Build (Jul 20–29, 2026)
]

// Max non-office-hours, non-pinned events to include
const MAX_OTHER_EVENTS = 7

// Fetch pool size — large enough to always find OFFICE_HOURS_COUNT upcoming other events
const FETCH_POOL_SIZE = 30

const orderBy = 'startTime'


const dateConfig = {
  month: 'short',
  weekday: 'long',
  year: 'numeric',
  day: 'numeric',
  hour: '2-digit',
  minute: '2-digit',
}


const formatCalDate = (start, end) => {
  const config = {...dateConfig}

  const {dateTime} = start
  let {date} = start

  // if only date, add a day and remove time from config
  if (!dateTime && date) {
    date = new Date(date)
    date.setDate(date.getDate() + 1)
    delete config.hour
    delete config.minute
  }

  const startStr = `${new Date(dateTime || date).toLocaleString('en-US', config)}`

  // display the end date if multi-day event
  const startDay = new Date(date).getDate()
  const endDay = new Date(end.date).getDate()
  const endStr =
    endDay > startDay
      ? `${new Date(end.dateTime || end.date).toLocaleString('en-US', config)}`
      : null

  return `${startStr} ${endStr ? ` - ${endStr}` : ''}`
}


export default function Calendar() {
  const [events, setEvents] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchEvents()
      .then(events => {
        console.log('events', events)
        setEvents(events)
      })
      .catch(err => setError(err))
  }, [])

  const fetchEvents = async () => {
    const timeMin = new Date().toISOString()

    // 1. Fetch a large pool of upcoming events sorted by start time
    const res = await fetch(`${url}&timeMin=${timeMin}&maxResults=${FETCH_POOL_SIZE}&orderBy=${orderBy}`)
    const data = await res.json()
    const pool: any[] = (data.items || []).sort(
      (a, b) => Date.parse(a.start.dateTime || a.start.date) - Date.parse(b.start.dateTime || b.start.date)
    )

    // 2. Pick first N office hours + up to MAX_OTHER_EVENTS of everything else
    const officeHours = pool.filter(e => e.summary === 'Office Hours').slice(0, OFFICE_HOURS_COUNT)
    const otherEvents = pool.filter(e => e.summary !== 'Office Hours').slice(0, MAX_OTHER_EVENTS)

    // 3. Fetch any pinned events not already present in the pool or expired
    const poolIds = new Set(pool.map(e => e.id))
    const now = Date.now()
    const pinnedEvents = (
      await Promise.all(
        PINNED_EVENTS
          .filter(({id, until}) => !poolIds.has(id) && (!until || Date.parse(until) >= now))
          .map(({id}) =>
            fetch(`https://www.googleapis.com/calendar/v3/calendars/${calID}/events/${id}?key=${apiKey}`)
              .then(r => r.json())
              .catch(() => null)
          )
      )
    ).filter(event => event?.start)

    // 4. Merge, deduplicate by ID, and sort
    const seen = new Set<string>()
    const merged = [...officeHours, ...otherEvents, ...pinnedEvents].filter(e => {
      if (seen.has(e.id)) return false
      seen.add(e.id)
      return true
    })

    merged.sort(
      (a, b) => Date.parse(a.start.dateTime || a.start.date) - Date.parse(b.start.dateTime || b.start.date)
    )

    return merged
  }

  return (
    <>
      {events?.length == 0 &&
        <p className="text-gray-500">
          Please check back later for upcoming Sage/Waggle workshops, hackathons, presentations, and more!
        </p>
      }
      {events && (
        <ul className="px-0 list-none">
          {events.map((event, i) => {
            const {description = '', summary, start, end} = event

            return (
              <li key={i} className="mb-8">
                <h3 className="mb-2">
                  {summary}
                  <i className="fas fa-external-link-alt"
                    style={{ position: 'absolute', marginLeft: '5px' }}
                  ></i>
                </h3>

                <span className="text-gray-500 font-bold text-sm">{formatCalDate(start, end)}</span>

                <h4 className="text-gray-500">[<a href={description} target="_blank" rel="noreferrer">Read more...</a>]</h4>
              </li>
            )
          })}
        </ul>
      )}

      {error && 'There was an issue loading the event calendar.'}
    </>
  )
}
