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

  // Map the rockets array to return a Rocket component
  // Send values as props
  return (
    <>
    <p>working</p>
      {data.map((i) => <Rocket 
        id={i.id}
        name={i.name}
        description={i.description}
        image={i.image}
        key={i.id}
        />
      )}
    </>
  )

};

export default Rockets;
