import { useSelector } from 'react-redux';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ListGroup from 'react-bootstrap/ListGroup';
import CrewPhoto from './CrewPhoto';
import '../css/crew.css';

const MyProfile = () => {
  const launches = useSelector((state) => state.launches.items);
  const crew = useSelector((state) => state.crew.items);
  const rocketsData = useSelector((state) => state.rocketsReducer.items);

  return (
    <Container className="mt-4">
      <Row className="g-4">
        <Col xs={12} md={4}>
          <h4>My Launches</h4>
          {launches.every((launch) => !launch.reserved) && <p>No launches selected yet.</p>}
          <ListGroup>
            {launches.filter((launch) => launch.reserved).map((launch) => (
              <ListGroup.Item key={launch.id}>{launch.name}</ListGroup.Item>
            ))}
          </ListGroup>
        </Col>
        <Col xs={12} md={4}>
          <h4>My Crew</h4>
          {crew.every((member) => !member.selected) && <p>No crew members selected yet.</p>}
          <ListGroup>
            {
              crew.filter((member) => member.selected).map((res) => (
                <ListGroup.Item className="crew-profile-member" key={res.id}>
                  <CrewPhoto name={res.name} image={res.image} />
                  {res.name}
                </ListGroup.Item>
              ))
            }
          </ListGroup>
        </Col>
        <Col xs={12} md={4}>
          <h4>My Rockets</h4>
          <ListGroup>
            {
              rocketsData.length > 0
              && rocketsData.filter((rocket) => rocket.reserved).map((res) => (
                <ListGroup.Item key={res.id}>
                  {res.name}
                </ListGroup.Item>
              ))
            }
          </ListGroup>
        </Col>
      </Row>
    </Container>
  );
};

export default MyProfile;
