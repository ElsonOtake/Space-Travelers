import {
  beforeEach, describe, expect, test, vi,
} from 'vitest';
import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import MyProfile from '../components/MyProfile';
import store from '../redux/configureStore';

vi.mock('axios', () => ({ default: { get: vi.fn() } }));

describe('Tests for the MyProfile component', () => {
  beforeEach(() => render(
    <Provider store={store}>
      <MyProfile />
    </Provider>,
  ));
  test('Check for the following test on screen', () => {
    expect(screen.getByText('My Launches')).toBeInTheDocument();
    expect(screen.getByText('My Crew')).toBeInTheDocument();
    expect(screen.getByText('My Rockets')).toBeInTheDocument();

    expect(screen.queryByText('My Profile')).toBeNull();

    expect(screen.getAllByRole('heading').length).toBe(3);
  });
});
