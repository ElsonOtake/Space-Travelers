import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import MyProfile from '../components/MyProfile';
import store from '../redux/configureStore';

jest.mock('axios');

describe('Tests for the MyProfile component', () => {
  render(
    <Provider store={store}>
      <MyProfile />
    </Provider>,
  );
  test('Check for the following test on screen', () => {
    expect(screen.getByText('My Launches')).toBeInTheDocument();
    expect(screen.getByText('My Crew')).toBeInTheDocument();
    expect(screen.getByText('My Rockets')).toBeInTheDocument();

    expect(screen.queryByText('My Profile')).toBeNull();

    expect(screen.getAllByRole('heading').length).toBe(3);
  });
  test('Check for the snapshot', () => {
    expect(screen.debug()).toMatchSnapshot();
  });
});
