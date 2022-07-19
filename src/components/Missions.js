import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchMissions } from '../redux/missions/Missions';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';

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
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Mission</th>
                <th>Description</th>
                <th>Status</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {
                missionsData.length > 0 &&
                missionsData.map((data) => {
                  return (
                    <tr key={data.mission_id}>
                      <td>{data.mission_name}</td>
                      <td>{data.description}</td>
                      <td><Button variant="secondary">NOT A MEMBER</Button></td>
                      <td><Button variant="outline-secondary">Join Mission</Button></td>
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
