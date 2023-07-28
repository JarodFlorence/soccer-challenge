import { calculateScore, updateScore } from './solution';  // Assuming you have exported the functions

describe('calculateScore function', () => {
  test('calculates scores correctly', () => {
    const input = `
      Lions 3, Snakes 3
      Tarantulas 1, FC Awesome 0
      Lions 1, FC Awesome 1
      Tarantulas 3, Snakes 1
      Lions 4, Grouches 0
    `;
    const expectedOutput = [
      '1. Tarantulas, 6 pts',
      '2. Lions, 5 pts',
      '3. FC Awesome, 1 pt',
      '3. Snakes, 1 pt',
      '5. Grouches, 0 pts',
    ];
    expect(calculateScore(input)).toEqual(expectedOutput);
  });
});

describe('updateScore function', () => {
  test('updates scores correctly', () => {
    let teams = [];
    updateScore(teams, 'Lions', 3, 1);
    expect(teams[0]).toEqual({ name: 'Lions', score: 3 });

    updateScore(teams, 'Lions', 1, 1);
    expect(teams[0]).toEqual({ name: 'Lions', score: 4 });
  });
});
