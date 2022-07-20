import { filterMissions } from "../api";

const missions = [{
  description: "Thaicom is the name of a series of communications satellites operated from Thailand, and also the name of Thaicom Public Company Limited, which is the company that owns and operates the Thaicom satellite fleet and other telecommunication businesses in Thailand and throughout the Asia-Pacific region. The satellite projects were named Thaicom by the King of Thailand, His Majesty the King Bhumibol Adulyadej, as a symbol of the linkage between Thailand and modern communications technology.",
  manufacturers: ['Orbital ATK'],
  mission_id: "9D1B7E0",
  mission_name: "Thaicom",
  payload_ids: ['Thaicom 6', 'Thaicom 8'],
  twitter: "https://twitter.com/thaicomplc",
  website: "http://www.thaicom.net/en/satellites/overview",
  wikipedia: "https://en.wikipedia.org/wiki/Thaicom",
}, {
  description: "Telstar 19V (Telstar 19 Vantage) is a communication satellite in the Telstar series of the Canadian satellite communications company Telesat. It was built by Space Systems Loral (MAXAR) and is based on the SSL-1300 bus. As of 26 July 2018, Telstar 19V is the heaviest commercial communications satellite ever launched, weighing at 7,076 kg (15,600 lbs) and surpassing the previous record, set by TerreStar-1 (6,910 kg/15230lbs), launched by Ariane 5ECA on 1 July 2009.",
  manufacturers: ['SSL'],
  mission_id: "F4F83DE",
  mission_name: "Telstar",
  payload_ids: ['Telstar 19V', 'Telstar 18V'],
  twitter: null,
  website: "https://www.telesat.com/",
  wikipedia: "https://en.wikipedia.org/wiki/Telesat",
}];

describe('true is truthy and false is falsy', () => {

  test('Size of input array', () => {
    expect(missions.length).toBe(2);
  });

  test('true is truthy', () => {
    expect(filterMissions(missions).length).toBe(2);
  });

  test('mission_id of the first input object', () => {
    expect(missions[0].mission_id).toBe('9D1B7E0');
  });

  test('mission_name of the first input object', () => {
    expect(missions[0].mission_name).toBe('Thaicom');
  });

  test('reserved of the first input object', () => {
    expect(missions[0].reserved).toBeUndefined();
  });

  test('wikipedia of the first input object', () => {
    expect(missions[0].wikipedia).toBe('https://en.wikipedia.org/wiki/Thaicom');
  });

  test('id of the first output object', () => {
    expect(filterMissions(missions)[0].id).toBe('9D1B7E0');
  });

  test('name of the first output object', () => {
    expect(filterMissions(missions)[0].name).toBe('Thaicom');
  });

  test('reserved of the first output object', () => {
    expect(filterMissions(missions)[0].reserved).toBeFalsy();
  });

  test('wikipedia of the first output object', () => {
    expect(filterMissions(missions)[0].wikipedia).toBeUndefined();
  });

  test('id of the second output object', () => {
    expect(filterMissions(missions)[1].id).toBe('F4F83DE');
  });

  test('name of the second output object', () => {
    expect(filterMissions(missions)[1].name).toBe('Telstar');
  });

  test('reserved of the second output object', () => {
    expect(filterMissions(missions)[1].reserved).toBeFalsy();
  });

  test('manufacturers of the second output object', () => {
    expect(filterMissions(missions)[0].manufacturers).toBeUndefined();
  });
});