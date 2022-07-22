import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import Rocket from '../components/Rocket';
import store from '../redux/configureStore';
import { GET_ROCKETS } from '../redux/rockets/Rockets';

const rocket = [
  {
    name: 'Lothar',
    id: 1,
    description: 'rocket description',
    image: [
      'https://imgur.com/DaCfMsj.jpg',
      'https://imgur.com/azYafd8.jpg',
    ],
    reserved: false,
  },
];

const RocketMuck = () => {
  const rocketList = store.getState().rocketsReducer;

  render(
    <Provider store={store}>
      <div>
        {rocketList.map((data) => (
          <Rocket
            id={data.id}
            name={data.name}
            description={data.description}
            image={data.image}
            key={data.id}
            reserved={data.reserved}
          />
        ))}
      </div>
    </Provider>,
  );
};

describe('Rocket tests', () => {
  store.dispatch({ type: GET_ROCKETS, payload: rocket });
  test('Check rendering and mucked data usage', () => {
    RocketMuck();

    expect(screen.getByText(/Lothar/i)).toBeInTheDocument();
    expect(screen.getByText(/rocket description/i)).toBeInTheDocument();
    expect(screen.getByText(/Reserve Rocket/i)).toBeInTheDocument();
  });

  test('Check resevation', () => {
    RocketMuck();
    const reserveBtn = screen.getByText(/Reserve Rocket/i);

    fireEvent.click(reserveBtn);
    RocketMuck();
    expect(screen.getByText(/Reserved/i)).toBeInTheDocument();
  });
});
