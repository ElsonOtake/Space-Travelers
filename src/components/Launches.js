import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Container from 'react-bootstrap/Container';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Badge from 'react-bootstrap/Badge';
import Form from 'react-bootstrap/Form';
import { fetchLaunches, toggleLaunch } from '../redux/launches/Launches';

const formatDate = (value) => {
  const date = new Date(value);
  return value && !Number.isNaN(date.getTime()) ? date.toLocaleString() : 'To be announced';
};

const Launches = () => {
  const { items, status, error } = useSelector((state) => state.launches);
  const dispatch = useDispatch();
  const [schedule, setSchedule] = useState('upcoming');
  const visibleLaunches = items.filter((launch) => launch.upcoming === (schedule === 'upcoming'));

  useEffect(() => {
    if (status === 'idle') dispatch(fetchLaunches());
  }, [status, dispatch]);

  return (
    <Container className="mt-4 mb-4">
      <h1 className="h4">Launches</h1>
      <p>Browse upcoming and past launches and add them to My Launches.</p>
      <Form.Group className="mb-3" controlId="launch-schedule">
        <Form.Label>Launch schedule</Form.Label>
        <Form.Select value={schedule} onChange={(event) => setSchedule(event.target.value)}>
          <option value="upcoming">Upcoming</option>
          <option value="past">Past</option>
        </Form.Select>
      </Form.Group>
      {status === 'loading' && <p role="status">Loading launches…</p>}
      {status === 'failed' && (
        <div role="alert">
          <p>{error}</p>
          <Button onClick={() => dispatch(fetchLaunches())}>Try again</Button>
        </div>
      )}
      {status === 'succeeded' && visibleLaunches.length === 0 && (
        <p>{`No ${schedule} launches available.`}</p>
      )}
      {visibleLaunches.length > 0 && (
        <Table striped bordered hover responsive>
          <caption>
            {`${schedule === 'upcoming' ? 'Upcoming' : 'Past'} launches. Dates use your local time.`}
          </caption>
          <thead>
            <tr>
              <th scope="col">Launch</th>
              <th scope="col">Description</th>
              <th scope="col">Date</th>
              <th scope="col">Status</th>
              <th scope="col">My Launches</th>
            </tr>
          </thead>
          <tbody>
            {visibleLaunches.map((launch) => (
              <tr key={launch.id}>
                <th scope="row">{launch.name}</th>
                <td>
                  <p>{launch.description}</p>
                  {launch.rocket && (
                    <p>{`Rocket: ${launch.rocket}`}</p>
                  )}
                  {launch.pad && (
                    <p>{`Launch pad: ${launch.pad}`}</p>
                  )}
                  {launch.links.webcast && (
                    <a href={launch.links.webcast} target="_blank" rel="noreferrer">Watch webcast</a>
                  )}
                </td>
                <td>{formatDate(launch.date)}</td>
                <td><Badge bg="secondary">{launch.status || 'Unknown'}</Badge></td>
                <td>
                  <Button
                    variant={launch.reserved ? 'outline-danger' : 'outline-primary'}
                    aria-pressed={launch.reserved}
                    aria-label={`${launch.reserved ? 'Remove' : 'Add'} ${launch.name} ${launch.reserved ? 'from' : 'to'} My Launches`}
                    onClick={() => dispatch(toggleLaunch(launch.id))}
                  >
                    {launch.reserved ? 'Remove from My Launches' : 'Add to My Launches'}
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Container>
  );
};

export default Launches;
