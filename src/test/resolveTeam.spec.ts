import resolveTeam from '../index.js'; // Adjust the import path as needed

// Mock teamList for testing
// Assuming teamList has a similar structure to this
jest.mock('../../src/teamlist', () => ({
    nba: [{ name: 'Boston Celtics', colors: ['Green', 'White'], nicknames: ['Celtics', 'BOS'] }],
    nfl: [{ name: 'Chicago Bears', colors: ['Navy', 'Orange'], nicknames: ['Bears', 'CHI'] }]
}));

describe('resolveTeam function', () => {
    test('resolves NBA team name using abbreviation', () => {
        expect(resolveTeam('nba', 'BOS')).toBe('Boston Celtics');
    });

    test('resolves NFL team name using partial name', () => {
        expect(resolveTeam('nfl', 'Chicago')).toBe('Chicago Bears');
    });

    test('returns full NBA team object when full option is true', () => {
        const expected = {
            name: 'Boston Celtics',
            colors: ['Green', 'White'],
            nicknames: ['Celtics', 'BOS']
        };
        expect(resolveTeam('nba', 'BOS', { full: true })).toEqual(expected);
    });
});
