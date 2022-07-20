import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchMissions } from '../redux/missions/Missions';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import { Badge } from 'react-bootstrap';

const Missions = () => {
  const missionsData = useSelector((state) => state.missionsReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    (missionsData.length === 0) && dispatch(fetchMissions());
  }, [missionsData.length]);

  return (
    <Container>
      <Row>
        <Col>
          <Table striped bordered hover size="sm">
            <thead>
              <tr>
                <th className="col-sm-1 fw-bold">Mission</th>
                <th className="col-sm-6 fw-bold">Description</th>
                <th className="col-sm-1 fw-bold">Status</th>
                <th className="col-sm-1"></th>
              </tr>
            </thead>
            <tbody>
              {
                missionsData.length > 0 &&
                missionsData.map((data) => {
                  return (
                    <tr key={data.mission_id}>
                      <td
                        className="fw-bold">{
                          data.mission_name
                        }
                      </td>
                      <td
                        className="small"
                      >
                        <small>{
                          data.description
                        }
                        </small>
                      </td>
                      <td className="align-middle">
                        <div className="d-flex justify-content-center">
                          <Badge className="text-uppercase" bg="secondary">
                            <small>not a member</small>
                          </Badge>
                        </div>
                      </td>
                      <td className="align-middle">
                        <div className="d-flex justify-content-center">
                          <Button variant="outline-secondary" className="text-capitalize">
                            <small>join mission</small>
                          </Button>
                        </div>
                        
                      </td>
                    </tr>
                  )
                })
              }
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
);
};

export default Missions;
