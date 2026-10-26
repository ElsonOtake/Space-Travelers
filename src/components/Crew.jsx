import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Badge from 'react-bootstrap/Badge';
import { fetchCrew, toggleCrew } from '../redux/crew/Crew';
import CrewPhoto from './CrewPhoto';
import '../css/crew.css';

const Crew = () => {
  const { items, status, error } = useSelector((state) => state.crew);
  const dispatch = useDispatch();

  useEffect(() => {
    if (status === 'idle') dispatch(fetchCrew());
  }, [status, dispatch]);

  return (
    <Container className="mt-4 mb-4">
      <h1 className="h4">Crew</h1>
      <p>Meet the astronauts and add members to My Crew.</p>
      {status === 'loading' && <p role="status">Loading crew…</p>}
      {status === 'failed' && (
        <div role="alert">
          <p>{error}</p>
          <Button onClick={() => dispatch(fetchCrew())}>Try again</Button>
        </div>
      )}
      {status === 'succeeded' && items.length === 0 && <p>No crew members available.</p>}
      <div className="crew-grid">
        {items.map((member) => (
          <article className="crew-card" key={member.id}>
            <CrewPhoto name={member.name} image={member.image} />
            <div className="crew-card-body">
              <h2 className="h5">{member.name}</h2>
              {member.status && <Badge bg="secondary">{member.status}</Badge>}
              <dl className="mt-3">
                <dt>Role</dt>
                <dd>{member.role || 'Not available'}</dd>
                <dt>Agency</dt>
                <dd>{member.agency || 'Not available'}</dd>
                <dt>Mission</dt>
                <dd>{member.mission || 'Not assigned'}</dd>
              </dl>
              {member.wikipedia && (
                <a href={member.wikipedia} target="_blank" rel="noreferrer">
                  Learn more about
                  {' '}
                  {member.name}
                </a>
              )}
              <Button
                className="mt-3"
                variant={member.selected ? 'outline-danger' : 'primary'}
                aria-pressed={member.selected}
                aria-label={`${member.selected ? 'Remove' : 'Add'} ${member.name} ${member.selected ? 'from' : 'to'} My Crew`}
                onClick={() => dispatch(toggleCrew(member.id))}
              >
                {member.selected ? 'Remove from My Crew' : 'Add to My Crew'}
              </Button>
            </div>
          </article>
        ))}
      </div>
    </Container>
  );
};

export default Crew;
