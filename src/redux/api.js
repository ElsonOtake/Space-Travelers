import axios from 'axios';

const urlMissions = 'https://api.spacexdata.com/v3/missions';

const filterMissions = (missions) => {
  const response = [];
  missions.forEach((mission) => {
    response.push({
      id: mission.mission_id,
      name: mission.mission_name,
      description: mission.description,
      reserved: false,
    });
  });
  return response;
};

export const axiosGetMissions = async () => {
  try {
    const response = await axios.get(urlMissions);
    return filterMissions(response.data);
  } catch (error) {
    throw new Error(error);
  }
};