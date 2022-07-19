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

  const handleClick = (e) => {
    const id = e.target.classList[0].substr(4);
    const button = document.querySelector(`.btn-${id}`);
    const badge = document.querySelector(`.bdg-${id}`);
    if (button.firstChild.innerText === "Join Mission") {
      button.firstChild.innerText = "Leave Mission";
      button.classList.remove("btn-outline-secondary");
      button.classList.add("btn-outline-danger");
      badge.firstChild.innerText = "Active Member";
      badge.classList.remove("bg-secondary");
      badge.classList.add("bg-info");
    } else {
      button.firstChild.innerText = "Join Mission";
      button.classList.remove("btn-outline-danger");
      button.classList.add("btn-outline-secondary");
      badge.firstChild.innerText = "NOT A MEMBER";
      badge.classList.remove("bg-info");
      badge.classList.add("bg-secondary");
    }

  }

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
                missionsData.map((mission) => {
                  return (
                    <tr key={mission.id}>
                      <td
                        className="fw-bold">{
                          mission.name
                        }
                      </td>
                      <td
                        className="small"
                      >
                        <small>{
                          mission.description
                        }
                        </small>
                      </td>
                      <td className="align-middle">
                        <div className="d-flex justify-content-center flex-wrap">
                          <Badge bg="secondary" className={`bdg-${mission.id}`}>
                            <small>NOT A MEMBER</small>
                          </Badge>
                        </div>
                      </td>
                      <td className="align-middle">
                        <div className="d-flex justify-content-center">
                          <Button variant="outline-secondary" className={`btn-${mission.id}`}
                            onClick={
                              (e) => {
                                handleClick(e)
                              }
                            }
                          >
                            <small className={`sml-${mission.id}`}>Join Mission</small>
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
