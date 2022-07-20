import { useSelector } from 'react-redux';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ListGroup from 'react-bootstrap/ListGroup';

const MyProfile = () => {
  const missionsData = useSelector((state) => state.missionsReducer);
  const rocketsData = useSelector((state) => state.rocketsReducer);

  return (
    <Container className="mt-4">
      <Row>
        <Col>
          <h4>My Missions</h4>
          <ListGroup>
            {
              missionsData.length > 0
              && missionsData.filter((mission) => mission.reserved).map((res) => (
                <ListGroup.Item key={res.id}>
                  {res.name}
                </ListGroup.Item>
              ))
            }
          </ListGroup>
        </Col>
        <Col>
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
