import  { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getList } from '../redux/rockets/Rockets';
import Rocket from './Rocket';

const Rockets = () => {
  // Get rockets data from reducer
  const data = useSelector((state) => state.rocketsReducer);
  const dispatch = useDispatch();

  // Dispatch action to get rockets
  // Conditioning so it just dispatch the action if we dont have the data
  useEffect(() => {
    if (data.length === 0) {
      dispatch(getList());
    }
  }, [data.length, dispatch]);


  // Create a rocket sending values as props
  const createRocket = (data) => <Rocket
        id={data.id}
        name={data.name}
        description={data.description}
        image={data.image}
        key={data.id}
        reserved={data.reserved}
      />

  // Map the rockets array to return a Rocket component with the createRocket function
  
  return (
    <>
    <p>working</p>
      {data.map((i) => createRocket(i) )}
    </>
  )

};

export default Rockets;
