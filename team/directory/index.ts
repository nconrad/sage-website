import type { Team, TeamMember } from './directory'


const team : TeamMember[] = [{
  name: 'Pete Beckman',
  image: require('@site/static/img/team/pete_beckman.jpg').default,
  institution: 'Northwestern University',
  title: 'Director',
  teams: 'leadership'
}, {
  name: 'Nicola Ferrier',
  image: require('@site/static/img/team/nicola_ferrier.jpg').default,
  institution: 'Northwestern University / ANL',
  title: 'Deputy Director / ML@Edge',
  href: 'https://www.anl.gov/profile/nicola-j-ferrier',
  teams: 'leadership'
}, {
  name: 'Ilkay Altintas',
  image: require('@site/static/img/team/ilkay_altintas.jpg').default,
  institution: 'Univ. of California-San Diego / SDSC',
  title: 'Cyberinfrastructure / Data Architect',
  href: 'https://words.sdsc.edu/ilkay/',
  teams: 'leadership'
}, {
  name: 'Jason Leigh',
  image: require('@site/static/img/team/jason-leigh.jpg').default,
  institution: 'University of Hawai\'i at Mānoa',
  title: 'Advanced Visualization & Applications',
  href: 'https://jasonleigh.me',
  teams: 'leadership'
}, {
  name: 'Mike Papka',
  image: require('@site/static/img/team/mike_papka.jpg').default,
  institution: 'University of Illinois Chicago / ANL',
  title: 'Education and Research Testbed',
  href: 'https://cs.uic.edu/profiles/papka-michael',
  teams: 'leadership'
}, {
  name: 'Eugene Kelly',
  image: require('@site/static/img/team/Eugene_Kelly-1-1024x1024.jpg').default,
  institution: 'Colorado State University',
  title: 'Bio / Ecology (NEON)',
  href: 'https://broadn.colostate.edu/eugene-kelly-bio/',
  teams: 'leadership'
}, {
  name: 'Daniel Reed',
  image: require('@site/static/img/team/dan_reed-2.jpg').default,
  institution: 'University of Utah',
  title: 'Chair: Advisory Committee',
  href: 'https://www.linkedin.com/in/danreed/',
  teams: 'leadership'
}, {
  name: 'Helen Taaffe',
  image: 'https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png',
  institution: 'Northwestern University',
  title: 'Executive Director / Project Manager',
  href: 'https://www.linkedin.com/in/helentaaffe/',
  teams: ['leadership', 'emeritus']
}, {
  name: 'Sanaiya Khatwani',
  image: require('@site/static/img/team/sanaiya-khatwani.jpeg').default,
  institution: 'Northwestern University',
  title: 'Senior Program Manager',
  href: 'https://www.linkedin.com/in/sanaiya-khatwani-98667219/',
  teams: 'leadership'
}, {
  name: 'Rajesh Sankaran',
  image: require('@site/static/img/team/raj_sankaran-1.jpg').default,
  institution: 'Northwestern University / ANL',
  title: 'Chief Platform Architect',
  href: 'https://www.anl.gov/profile/rajesh-sankaran',
  teams: ['leadership', 'emeritus']
}, {
  name: 'Douglas Toomey',
  image: require('@site/static/img/team/doug.webp').default,
  institution: 'University of Oregon / OHAZ',
  title: 'Hazard Detection and Monitoring',
  href: 'https://cas.uoregon.edu/directory/natural-sciences/all/drt',
  teams: ['leadership']
}, {
  name: 'Valerie Taylor',
  image: require('@site/static/img/team/valerie-taylor.jpg').default,
  institution: 'University of Chicago / ANL',
  title: 'Education Chair / Curricula',
  href: 'https://www.anl.gov/profile/valerie-e-taylor',
  teams: ['leadership', 'emeritus']
}, {
  name: 'Jim Olds',
  image: require('@site/static/img/team/James-Olds-400.jpg').default,
  institution: 'George Mason University',
  title: 'Risk Management',
  teams: 'leadership'
}, {
  name: 'Sean Shahkarami',
  image: require('@site/static/img/team/seanshahkarami.jpg').default,
  institution: 'Northwestern University / ANL',
  title: 'Software Engineer Lead',
  teams: ['leadership', 'ci']
}, {
  name: 'Neal Conrad',
  image: 'https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png',
  institution: 'ANL / Northwestern University',
  title: { 'leadership': 'Operations and User Support', 'ci': 'Principal Specialist, Research Software Engineering' },
  href: 'https://www.anl.gov/profile/neal-conrad',
  teams: ['leadership', 'ci'],
}, {
  name: 'Charlie Catlett',
  image: require('@site/static/img/team/charlie_catlett-3.jpg').default,
  institution: 'Argonne National Laboratory',
  title: 'Director of Array of Things / International AI Collaboration',
  href: 'https://www.anl.gov/profile/charles-edward-catlett',
  teams: ['leadership', 'emeritus']
}, {
  name: 'Scott Collis',
  image: require('@site/static/img/team/scott_collis.jpeg').default,
  institution: 'Northwestern University / ANL',
  title: 'Instru. Chair / Atmosphere',
  href: 'https://www.anl.gov/profile/scott-m-collis',
  teams: 'collab'
}, {
  name: 'Frank Vernon',
  image: require('@site/static/img/team/frank_vernon.png').default,
  institution: 'Univ. of California-San Diego',
  title: 'SoCal Network and Deployment',
  href: null,
  teams: 'collab'
},

{
  name: 'Irene Qualters',
  image: require('@site/static/img/team/irene_qualters.jpeg').default,
  institution: 'Los Alamos National Lab',
  title: 'Advisory Committee Chair',
  teams: 'past-collab'
},

{
  name: 'Francisco Lozano',
  image: require('@site/static/img/team/flozano.jpeg').default,
  institution: 'Northwestern University',
  title: 'Software Engineer',
  // href: '',
  teams: 'ci'
}, {
  name: 'Peter Lebiedzinski',
  image: 'https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png',
  institution: 'Northwestern University',
  title: 'Software Engineer',
  // href: '',
  teams: 'ci'
}, {
  name: 'Alex Tuna',
  image: require('@site/static/img/team/alex-tuna.jpg').default,
  institution: 'UC San Diego',
  title: 'Computational Data Scientist and Researcher',
  href: 'https://scil.ucsd.edu/alex-tuna-phd',
  teams: ['ci']
}, {
  name: 'Ismael Perez',
  image: require('@site/static/img/team/perez.png').default,
  institution: 'UC San Diego',
  title: 'Computational and Data Science Research Specialist',
  href: 'https://scil.ucsd.edu/ismael-perez',
  teams: ['ci']
},

{
  name: 'Seongha Park',
  image: require('@site/static/img/team/seongha-park.jpeg').default,
  institution: 'Argonne National Laboratory',
  title: 'Assistant Computer Scientist',
  href: 'https://www.anl.gov/profile/seongha-park',
  teams: 'ai'
}, {
  name: 'Yongho Kim',
  image: 'https://www.anl.gov/sites/www/files/styles/profile_teaser_square_350px/public/Kim-Yongho-Photo-Small-210x210.jpg?itok=fby9X02h',
  institution: 'Argonne National Laboratory',
  title: 'Assistant Computer Scientist',
  href: 'https://www.anl.gov/profile/yongho-kim',
  teams: 'ai'
}, {
  name: 'Christopher Lee',
  image: require('@site/static/img/team/chris-lee.png').default,
  institution: 'University of Hawai\'i at Mānoa',
  title: 'Research Assistant',
  href: ' https://coderabbyte.github.io/',
  teams: 'ai'
}, {
  name: 'Thomas Giambelluca',
  image: require('@site/static/img/team/Thomas-Giambelluca.png').default,
  institution: 'University of Hawai\'i at Mānoa',
  title: 'Professor Emeritus, Water Resources Research Center',
  href: 'https://www.wrrc.hawaii.edu/person/dr-thomas-giambelluca/',
  teams: 'ai'
}, {
  name: 'Christopher Shuler',
  image: require('@site/static/img/team/Chris-Shuler.jpeg').default,
  institution: 'University of Hawai\'i at Mānoa',
  title: 'Assistant Specialist, Water Resources Research Center',
  href: 'https://www.wrrc.hawaii.edu/person/christopher-shuler/',
  teams: 'ai'
},
{
  name: 'Nick Maggio',
  image: require('@site/static/img/team/maggio.jpeg').default,
  institution: 'University of Oregon / OHAZ',
  title: 'Hazard Detection and Monitoring',
  teams: 'platform'
}, {
  name: 'Daniel Reed, Chair',
  teams: 'advisory',
  image: null,
  institution: 'University of Utah',
  title: null
}, {
  name: 'Bill Gropp',
  teams: 'advisory',
  image: null,
  institution: 'University of Illinois Urbana-Champaign',
  title: null
}, {
  name: 'Diane Pataki',
  teams: 'advisory',
  image: null,
  institution: 'The University of Utah',
  title: null
}, {
  name: 'Amanda Randles',
  teams: 'advisory',
  image: null,
  institution: 'Duke University',
  title: null
}, {
  name: 'Ness Shroff',
  teams: 'advisory',
  image: null,
  institution: 'The Ohio State University',
  title: null
}, {
  name: 'Greg Hager',
  teams: 'advisory',
  image: null,
  institution: 'Johns Hopkins University',
  title: null
}]



const hasTeam = (obj: TeamMember, kind: Team) =>
  obj.teams == kind || (Array.isArray(obj.teams) && obj.teams.includes(kind))

const getTeam = (kind: Team, opts?: {exclude?: Team | Team[]}) => {
  const exclude = opts?.exclude ? (Array.isArray(opts.exclude) ? opts.exclude : [opts.exclude]) : []
  return team.filter(obj =>
    hasTeam(obj, kind) && !exclude.some(ex => hasTeam(obj, ex))
  )
}


export default team
export {getTeam, Team, TeamMember}
