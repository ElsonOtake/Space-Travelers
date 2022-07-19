import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchMissions } from '../redux/missions/Missions';
import { Container, Row, Col, Table } from 'react-bootstrap';

const Missions = () => {
  const missionsData = useSelector((state) => state.missionsReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    (missionsData.length === 0) && dispatch(fetchMissions());
  }, [missionsData.length]);

  return (
    <Container>
      {/* {missionsData.map((data) => (
        <li key={data.mission_id}>
          {data.mission_name}
        </li>
      ))} */}
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
                      <td></td>
                      <td></td>
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
