import {
  beforeEach, expect, test, vi,
} from 'vitest';
import axios from 'axios';
import axiosGetCrew, {
  CREW_URL, UPCOMING_LAUNCHES_URL, PAST_LAUNCHES_URL, axiosGetLaunches,
  filterCrew, filterLaunches, filterRockets, axiosGetRockets, ROCKETS_URL,
} from '../api';

vi.mock('axios', () => ({ default: { get: vi.fn() } }));

beforeEach(() => vi.clearAllMocks());

test('crew mapping preserves photos and nullable biography links with stable IDs', () => {
  const member = {
    name: 'Jessica Watkins',
    role: 'Commander',
    image: 'https://example.com/jessica.jpg',
    agency: 'NASA',
    status: 'Active',
    mission: 'Crew-13',
    wikipedia: null,
  };
  expect(filterCrew([member])).toEqual([{ ...member, id: member.name, selected: false }]);
  expect(filterCrew([{ name: 'Other' }, member])[1].id).toBe(member.name);
});

test('launch mapping accepts the minimal past launch response and missing dates', () => {
  const [launch] = filterLaunches([{ name: 'Flight 13', status: 'Launch Successful' }], false);
  expect(launch).toMatchObject({
    name: 'Flight 13',
    upcoming: false,
    reserved: false,
    description: 'No description available.',
    links: {},
  });
  expect(launch.id).toBe('Flight 13|');
});

test('fetches crew from the revival endpoint', async () => {
  axios.get.mockResolvedValueOnce({ data: [{ name: 'Jessica Watkins', image: null }] });
  expect(await axiosGetCrew()).toEqual([
    expect.objectContaining({ id: 'Jessica Watkins', image: null }),
  ]);
  expect(axios.get).toHaveBeenCalledWith(CREW_URL);
});

test('combines upcoming and past launches, preserving details and removing overlap', async () => {
  const upcoming = {
    name: 'Flight 14',
    date_utc: '2026-10-27T04:45:00Z',
    details: 'Test flight',
    links: { webcast: 'https://example.com/watch' },
  };
  axios.get.mockResolvedValueOnce({ data: [upcoming] });
  axios.get.mockResolvedValueOnce({ data: [upcoming, { name: 'Flight 13' }] });
  const result = await axiosGetLaunches();
  expect(axios.get).toHaveBeenCalledWith(UPCOMING_LAUNCHES_URL);
  expect(axios.get).toHaveBeenCalledWith(PAST_LAUNCHES_URL);
  expect(result).toHaveLength(2);
  expect(result[0]).toMatchObject({
    description: 'Test flight', upcoming: true, links: upcoming.links,
  });
  expect(result[1].upcoming).toBe(false);
});

test('rejects API error objects instead of treating them as empty results', async () => {
  axios.get.mockResolvedValueOnce({ data: { error: 'route_not_available' } });
  await expect(axiosGetCrew()).rejects.toThrow('Unexpected crew response');
  axios.get.mockResolvedValueOnce({ data: [] });
  axios.get.mockResolvedValueOnce({ data: { error: 'unavailable' } });
  await expect(axiosGetLaunches()).rejects.toThrow('Unexpected launches response');
});

test('maps rocket names to stable IDs', async () => {
  const rockets = [
    { name: 'Falcon 9 Block 5', description: 'Reusable rocket' },
    { name: 'Falcon 9 v1.0' },
  ];
  expect(filterRockets(rockets)).toEqual([
    {
      id: 'Falcon 9 Block 5', name: 'Falcon 9 Block 5', description: 'Reusable rocket', reserved: false,
    },
    {
      id: 'Falcon 9 v1.0', name: 'Falcon 9 v1.0', description: 'No description available.', reserved: false,
    },
  ]);
  expect(filterRockets([...rockets].reverse())[0].id).toBe('Falcon 9 v1.0');
  axios.get.mockResolvedValueOnce({ data: rockets });
  expect(await axiosGetRockets()).toEqual(filterRockets(rockets));
  expect(axios.get).toHaveBeenCalledWith(ROCKETS_URL);
});
