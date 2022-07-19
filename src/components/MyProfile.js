import { useSelector } from 'react-redux';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ListGroup from 'react-bootstrap/ListGroup';

const MyProfile = () => {
  const missionsData = useSelector((state) => state.missionsReducer);

  return (
    <Container className='mt-4'>
      <Row>
        <Col>
          <h4>My Missions</h4>
          <ListGroup>
            {
              missionsData.length > 0 &&
              missionsData.map((mission) => {
                if (mission.reserved) {
                  return ( 
                    <ListGroup.Item>
                      {mission.name}
                    </ListGroup.Item>
                  )
                }
                return null;
              })
            }
          </ListGroup>
        </Col>
        <Col>
          <h4>My Rockets</h4>
        </Col>
      </Row>
    </Container>
  );
};

export default MyProfile;
