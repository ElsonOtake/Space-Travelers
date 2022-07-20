import  { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getList } from '../redux/rockets/Rockets';

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


};

export default Rockets;
