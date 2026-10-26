import {
  beforeEach, expect, test, vi,
} from 'vitest';
import {
  render, screen, fireEvent, waitFor,
} from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import axios from 'axios';
import App from '../App';
import crew from '../redux/crew/Crew';
import launches from '../redux/launches/Launches';
import rocketsReducer from '../redux/rockets/Rockets';
import { CREW_URL, UPCOMING_LAUNCHES_URL, PAST_LAUNCHES_URL } from '../redux/api';

vi.mock('axios', () => ({ default: { get: vi.fn() } }));

const member = {
  name: 'Jessica Watkins',
  image: 'https://example.com/jessica.jpg',
  role: 'Commander',
  agency: 'NASA',
  status: 'Active',
  mission: 'Crew-13',
  wikipedia: null,
};
const upcoming = {
  name: 'Falcon 9 | Next flight',
  date_utc: '2026-10-27T04:45:00Z',
  status: 'Go for Launch',
  details: 'A satellite launch',
  links: { webcast: 'https://example.com/watch' },
};
const past = { name: 'Falcon 9 | Previous flight', status: 'Launch Successful', date_utc: null };

const renderApp = (path) => {
  window.history.replaceState({}, '', path);
  const store = configureStore({ reducer: { crew, launches, rocketsReducer } });
  render(<Provider store={store}><App /></Provider>);
  return store;
};

beforeEach(() => {
  vi.clearAllMocks();
  axios.get.mockImplementation((url) => {
    const data = {
      [CREW_URL]: [member], [UPCOMING_LAUNCHES_URL]: [upcoming], [PAST_LAUNCHES_URL]: [past],
    };
    return Promise.resolve({ data: data[url] });
  });
});

test('redirects missions to launches, supports selections across navigation, and displays crew photos', async () => {
  renderApp('/missions');
  expect(await screen.findByText(upcoming.name)).toBeInTheDocument();
  expect(window.location.pathname).toBe('/launches');
  expect(screen.getByRole('link', { name: 'Watch webcast' })).toHaveAttribute('href', upcoming.links.webcast);
  fireEvent.click(screen.getByRole('button', { name: /Add .* to My Launches/ }));
  expect(screen.getByRole('button', { name: /Remove .* from My Launches/ })).toHaveAttribute('aria-pressed', 'true');
  fireEvent.change(screen.getByLabelText('Launch schedule'), { target: { value: 'past' } });
  expect(screen.getByText(past.name)).toBeInTheDocument();
  expect(screen.getByText('To be announced')).toBeInTheDocument();
  expect(screen.getByText('No description available.')).toBeInTheDocument();
  fireEvent.click(screen.getByRole('link', { name: 'Crew' }));
  expect(await screen.findByRole('img', { name: member.name })).toHaveAttribute('src', member.image);
  expect(screen.queryByRole('link', { name: /Learn more/ })).not.toBeInTheDocument();
  fireEvent.click(screen.getByRole('button', { name: /Add .* to My Crew/ }));
  fireEvent.click(screen.getByRole('link', { name: 'My Profile' }));
  expect(screen.getByText(upcoming.name)).toBeInTheDocument();
  expect(screen.getByText(member.name)).toBeInTheDocument();
  expect(screen.getByRole('img', { name: member.name })).toBeInTheDocument();
  fireEvent.click(screen.getByRole('link', { name: 'Launches' }));
  fireEvent.click(screen.getByRole('button', { name: /Remove .* from My Launches/ }));
  fireEvent.click(screen.getByRole('link', { name: 'Crew' }));
  fireEvent.click(screen.getByRole('button', { name: /Remove .* from My Crew/ }));
  fireEvent.error(screen.getByRole('img', { name: member.name }));
  expect(screen.getByRole('img', { name: `${member.name}: photo unavailable` })).toBeInTheDocument();
  fireEvent.click(screen.getByRole('link', { name: 'My Profile' }));
  expect(screen.queryByText(upcoming.name)).not.toBeInTheDocument();
  expect(screen.queryByText(member.name)).not.toBeInTheDocument();
  // StrictMode and revisiting pages must not cause duplicate requests.
  expect(axios.get).toHaveBeenCalledTimes(3);
});

test.each([
  ['/crew', 'crew'], ['/launches', 'launches'],
])('shows a retryable error on %s and recovers', async (path, resource) => {
  const defaultImplementation = axios.get.getMockImplementation();
  axios.get.mockRejectedValue(new Error('Network unavailable'));
  renderApp(path);
  expect(await screen.findByRole('alert')).toHaveTextContent(`Unable to load ${resource}`);
  axios.get.mockImplementation(defaultImplementation);
  fireEvent.click(screen.getByRole('button', { name: 'Try again' }));
  await waitFor(() => expect(screen.queryByRole('alert')).not.toBeInTheDocument());
  expect(await screen.findByText(resource === 'crew' ? member.name : upcoming.name)).toBeInTheDocument();
});

test.each([
  ['/crew', 'No crew members available.'],
  ['/launches', 'No upcoming launches available.'],
])('shows empty results on %s', async (path, message) => {
  axios.get.mockResolvedValue({ data: [] });
  renderApp(path);
  expect(await screen.findByText(message)).toBeInTheDocument();
});
