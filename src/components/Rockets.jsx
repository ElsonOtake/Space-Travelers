import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import { getList } from '../redux/rockets/Rockets';
import Rocket from './Rocket';
import '../css/rockets.css';

const Rockets = () => {
  const { items, status, error } = useSelector((state) => state.rocketsReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    if (status === 'idle') dispatch(getList());
  }, [status, dispatch]);

  return (
    <Container className="mt-4 mb-4">
      <h1 className="h4">Rockets</h1>
      {status === 'loading' && <p role="status">Loading rockets…</p>}
      {status === 'failed' && (
        <div role="alert">
          <p>{error}</p>
          <Button onClick={() => dispatch(getList())}>Try again</Button>
        </div>
      )}
      {status === 'succeeded' && items.length === 0 && <p>No rockets available.</p>}
      {items.map((rocket) => (
        <Rocket
          id={rocket.id}
          name={rocket.name}
          description={rocket.description}
          key={rocket.id}
          reserved={rocket.reserved}
        />
      ))}
    </Container>
  );
};

export default Rockets;
