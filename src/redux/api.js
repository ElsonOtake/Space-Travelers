import axios from 'axios';

const API_BASE = 'https://gateway.pipeworx.io/spacex/v4';
export const ROCKETS_URL = `${API_BASE}/rockets`;
export const CREW_URL = `${API_BASE}/crew`;
export const UPCOMING_LAUNCHES_URL = `${API_BASE}/launches/upcoming`;
export const PAST_LAUNCHES_URL = `${API_BASE}/launches/past`;

export const filterCrew = (crew) => crew.map((member) => ({
  id: member.name,
  name: member.name,
  role: member.role,
  image: member.image,
  agency: member.agency,
  status: member.status,
  mission: member.mission,
  wikipedia: member.wikipedia,
  selected: false,
}));

const axiosGetCrew = async () => {
  const response = await axios.get(CREW_URL);
  if (!Array.isArray(response.data)) {
    throw new Error('Unexpected crew response');
  }
  return filterCrew(response.data);
};

export default axiosGetCrew;

export const filterLaunches = (launches, upcoming) => launches.map((launch) => ({
  id: `${launch.name}|${launch.date_utc || ''}`,
  name: launch.name,
  description: launch.details || 'No description available.',
  date: launch.date_utc,
  status: launch.status,
  rocket: launch.rocket,
  pad: launch.pad,
  links: launch.links || {},
  upcoming,
  reserved: false,
}));

export const axiosGetLaunches = async () => {
  const [upcoming, past] = await Promise.all([
    axios.get(UPCOMING_LAUNCHES_URL),
    axios.get(PAST_LAUNCHES_URL),
  ]);
  if (!Array.isArray(upcoming.data) || !Array.isArray(past.data)) {
    throw new Error('Unexpected launches response');
  }
  const launches = [
    ...filterLaunches(upcoming.data, true),
    ...filterLaunches(past.data, false),
  ];
  return launches.filter((launch, index) => (
    launches.findIndex((item) => item.id === launch.id) === index
  ));
};

export const filterRockets = (rockets) => rockets.map((rocket) => ({
  id: rocket.name,
  name: rocket.name,
  description: rocket.description || 'No description available.',
  reserved: false,
}));

export const axiosGetRockets = async () => {
  const response = await axios.get(ROCKETS_URL);
  if (!Array.isArray(response.data)) {
    throw new Error('Unexpected rockets response');
  }
  return filterRockets(response.data);
};
