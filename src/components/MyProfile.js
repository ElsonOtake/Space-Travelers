import { useSelector } from 'react-redux';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ListGroup from 'react-bootstrap/ListGroup';

const MyProfile = () => {
  const missionsData = useSelector((state) => state.missionsReducer);

  return (
    <Container>
      <Row>
        <Col>
          <h4>My Missions</h4>
        </Col>
        <Col>
          <h4>My Rockets</h4>
        </Col>
      </Row>
    </Container>
  );
};

export default MyProfile;
