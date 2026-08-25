import { getTeam, type TeamMember, type Team } from '../directory'


const TeamCard = (props: TeamMember & {teamName: Team}) => {
  const { name, image, institution, title, href, teamName } = props;

  return (
    <div className="flex flex-row w-full h-full">
      <div className="rounded-full bg-gray-100 rounded-lg overflow-hidden mr-4">
        {href ?
          <a href={href} className="block flex items-center justify-center">
            <img
              src={image}
              className="rounded-md w-[160px] h-[160px] object-cover"

              alt={name}
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = 'https://via.placeholder.com/160?text=No+Image';
              }}
            />
          </a> :
          <img
            src={image}
            className="rounded-md w-[160px] h-[160px] object-cover"
            alt={name}
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = 'https://via.placeholder.com/160?text=No+Image';
            }}
          />
        }
      </div>
      <div className="flex-1 min-w-0">
        <h3 className="text-lg font-medium text-gray-900">{href ? <a href={href}>{name}</a> : name}</h3>
        <div className="text-gray-600">{institution}</div>
        <i className="text-gray-500">{typeof title == 'string' ? title : title[teamName]}</i>
      </div>
    </div>
  )
}

const LinkCard = (props: TeamMember & {teamName: Team}) => {
  return <TeamCard {...props} />
}

type Props = {
  team: Team | Team[]
  exclude?: Team | Team[]
}

export default function Team(props: Props) {
  const { team: teamName, exclude } = props

  const teamNames = Array.isArray(teamName) ? teamName : [teamName]
  const team = teamNames
    .flatMap(t => getTeam(t, {exclude}))
    .filter((person, i, arr) => arr.findIndex(p => p.name === person.name) === i)

  return (
    <div className="w-full">
      <div className="flex flex-wrap -mx-4">
        {team.map((person) => {
          const personTeams = Array.isArray(person.teams) ? person.teams : [person.teams]
          const matchedTeam = teamNames.find(t => personTeams.includes(t)) ?? personTeams[0]
          return (
            <div key={person.name} className="w-full md:w-1/2 px-4 mb-8">
              <LinkCard {...person} teamName={matchedTeam} />
            </div>
          )
        })}
      </div>
    </div>
  )
}


