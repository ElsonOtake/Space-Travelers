import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchMissions } from '../redux/missions/Missions';

const Missions = () => {
  const missionsData = useSelector((state) => state.missionsReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchMissions());
  }, []);

  return (
    <ul>
      {missionsData.map((data) => (
        <li key={data.mission_id}>
          {data.mission_name}
        </li>
      ))}
    </ul>
);
};

export default Missions;
