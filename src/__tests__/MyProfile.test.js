import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import MyProfile from '../components/MyProfile';
import { Provider } from 'react-redux';
import store from '../redux/configureStore';

describe('Tests for the MyProfile component', () => {
  render(
    <Provider store={store}>
      <MyProfile />
    </Provider>,
  );
  test('Check for the following test on screen', () => {

    expect(screen.getByText('My Missions')).toBeInTheDocument();
    expect(screen.getByText('My Rockets')).toBeInTheDocument();

    expect(screen.queryByText('My Profile')).toBeNull();

    expect(screen.getAllByRole('heading').length).toBe(2);

});
  test('Check for the snapshot', () => {
    expect(screen.debug()).toMatchSnapshot();
  });
});