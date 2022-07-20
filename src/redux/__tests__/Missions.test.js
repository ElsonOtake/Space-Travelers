import { joinMission, leaveMission } from '../missions/Missions';

describe('Test the action functions joinMission and leaveMission', () => {
  test('joinMission call with id = 1', () => {
    expect(joinMission(1).id).toBe(1);
    expect(joinMission(1).type).not.toBe('JOIN_MISSION');
    expect(joinMission(1).type).toBe('space-travelers/missions/JOIN_MISSION');
  });

  test('leaveMission call with id = 2', () => {
    expect(leaveMission(2).id).toBe(2);
    expect(leaveMission(2).type).not.toBe('LEAVE_MISSION');
    expect(leaveMission(2).type).toBe('space-travelers/missions/LEAVE_MISSION');
  });
});
