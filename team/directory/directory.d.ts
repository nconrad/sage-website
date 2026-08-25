
export type Team = 'leadership' | 'collab' | 'ci' | 'ai' | 'platform' | 'past-collab' | 'past-member' | 'advisory' | 'emeritus'

export type TeamMember = {
  name: string
  image: string
  institution: string
  title: string | {[team: strimg]: string}
  teams: Team | Team[]
  href?: string
}

