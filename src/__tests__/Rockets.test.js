import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import axios from 'axios';
import App from '../App';
import crew from '../redux/crew/Crew';
import launches from '../redux/launches/Launches';
import rocketsReducer from '../redux/rockets/Rockets';
import { ROCKETS_URL } from '../redux/api';

jest.mock('axios');

const rocket = {
  name: 'Falcon 9 Block 5',
  description: 'A reusable two-stage rocket.',
  family: 'Falcon',
  reusable: true,
};

const renderApp = () => {
  window.history.replaceState({}, '', '/');
  const store = configureStore({ reducer: { crew, launches, rocketsReducer } });
  render(<Provider store={store}><App /></Provider>);
  return store;
};

beforeEach(() => {
  jest.clearAllMocks();
  axios.get.mockResolvedValue({ data: [rocket] });
});

test('loads Pipeworx rockets once in StrictMode and preserves reservations across navigation', async () => {
  renderApp();
  expect(screen.getByRole('status')).toHaveTextContent('Loading rockets');
  expect(await screen.findByText(rocket.name)).toBeInTheDocument();
  expect(screen.getByText(rocket.description)).toBeInTheDocument();
  expect(axios.get).toHaveBeenCalledTimes(1);
  expect(axios.get).toHaveBeenCalledWith(ROCKETS_URL);
  fireEvent.click(screen.getByRole('button', { name: 'Reserve Rocket' }));
  expect(screen.getByText('Reserved')).toBeInTheDocument();
  fireEvent.click(screen.getByRole('link', { name: 'My Profile' }));
  expect(screen.getByText(rocket.name)).toBeInTheDocument();
  fireEvent.click(screen.getByRole('link', { name: 'Rockets' }));
  fireEvent.click(screen.getByRole('button', { name: 'Cancel Reservation' }));
  expect(screen.queryByText('Reserved')).not.toBeInTheDocument();
  fireEvent.click(screen.getByRole('link', { name: 'My Profile' }));
  expect(screen.queryByText(rocket.name)).not.toBeInTheDocument();
  expect(axios.get).toHaveBeenCalledTimes(1);
});

test('handles a network rejection and retries without an unhandled promise or duplicate request', async () => {
  axios.get.mockRejectedValueOnce(new Error('Network Error'));
  const store = renderApp();
  expect(await screen.findByRole('alert')).toHaveTextContent('Unable to load rockets');
  expect(store.getState().rocketsReducer.status).toBe('failed');
  expect(axios.get).toHaveBeenCalledTimes(1);
  fireEvent.click(screen.getByRole('button', { name: 'Try again' }));
  expect(await screen.findByText(rocket.name)).toBeInTheDocument();
  expect(screen.queryByRole('alert')).not.toBeInTheDocument();
  expect(axios.get).toHaveBeenCalledTimes(2);
});

test('treats an empty response as loaded without refetching on navigation', async () => {
  axios.get.mockResolvedValue({ data: [] });
  renderApp();
  expect(await screen.findByText('No rockets available.')).toBeInTheDocument();
  fireEvent.click(screen.getByRole('link', { name: 'My Profile' }));
  fireEvent.click(screen.getByRole('link', { name: 'Rockets' }));
  expect(screen.getByText('No rockets available.')).toBeInTheDocument();
  expect(axios.get).toHaveBeenCalledTimes(1);
});

test('shows an error for a malformed API response', async () => {
  axios.get.mockResolvedValue({ data: { error: 'unavailable' } });
  renderApp();
  expect(await screen.findByRole('alert')).toHaveTextContent('Unable to load rockets');
});
