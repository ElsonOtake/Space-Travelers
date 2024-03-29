import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Badge from 'react-bootstrap/Badge';
import { fetchMissions, joinMission, leaveMission } from '../redux/missions/Missions';

const Missions = () => {
  const missionsData = useSelector((state) => state.missionsReducer);
  const dispatch = useDispatch();

  const handleJoinClick = (e) => {
    const id = e.target.classList[0].substr(4);
    dispatch(joinMission(id));
  };

  const handleLeaveClick = (e) => {
    const id = e.target.classList[0].substr(4);
    dispatch(leaveMission(id));
  };

  useEffect(() => {
    if (missionsData.length === 0) {
      dispatch(fetchMissions());
    }
  }, [missionsData.length]);

  return (
    <Container className="mt-4">
      <Row>
        <Col>
          <Table striped bordered hover size="sm">
            <thead>
              <tr>
                <th className="col-sm-1 fw-bold">Mission</th>
                <th className="col-sm-6 fw-bold">Description</th>
                <th className="col-sm-1 fw-bold">Status</th>
                <th className="col-sm-1"> </th>
              </tr>
            </thead>
            <tbody>
              {
                missionsData.length > 0
                && missionsData.map((mission) => (
                  <tr key={mission.id}>
                    <td
                      className="fw-bold"
                    >
                      {
                          mission.name
                        }
                    </td>
                    <td
                      className="small"
                    >
                      <small>
                        {
                          mission.description
                        }
                      </small>
                    </td>
                    <td className="align-middle">
                      <div className="d-flex justify-content-center">
                        {!mission.reserved && (
                        <Badge bg="secondary">
                          <small>NOT A MEMBER</small>
                        </Badge>
                        )}
                        {mission.reserved && (
                        <Badge bg="info">
                          <small>Active Member</small>
                        </Badge>
                        )}
                      </div>
                    </td>
                    <td className="align-middle">
                      <div className="d-flex justify-content-center">
                        {!mission.reserved && (
                        <Button
                          variant="outline-secondary"
                          className={`btn-${mission.id}`}
                          onClick={
                                (e) => {
                                  handleJoinClick(e);
                                }
                              }
                        >
                          <small className={`sml-${mission.id}`}>Join Mission</small>
                        </Button>
                        )}
                        {mission.reserved && (
                        <Button
                          variant="outline-danger"
                          className={`btn-${mission.id}`}
                          onClick={
                                (e) => {
                                  handleLeaveClick(e);
                                }
                              }
                        >
                          <small className={`sml-${mission.id}`}>Leave Mission</small>
                        </Button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              }
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  );
};

export default Missions;
