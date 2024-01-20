import resolveTeam from '../index'; // Adjust the import path as needed

// Mock teamList for testing
// Assuming teamList has a similar structure to this
jest.mock('../../src/teamlist', () => ({
    nba: [{ name: 'Boston Celtics', colors: ['Green', 'White'], nicknames: ['Celtics', 'BOS'] },
        { name: 'Brooklyn Nets', colors: ['Black', 'White'], nicknames: ['Nets', 'BKN'] },
        {
            name: 'Charlotte Hornets',
            colors: ['#1D1160', '#00788C', '#000000'],
            nicknames: ['hornets', 'charlotte', 'cha'],
            abbrev: ['CHA']
        }],
    nfl: [{ name: 'Chicago Bears', colors: ['Navy', 'Orange'], nicknames: ['Bears', 'CHI'] }]
}));

describe('resolveTeam function', () => {
    test('resolves NBA team name using abbreviation', () => {
        expect(resolveTeam('BOS')).toBe('Boston Celtics');
    });

    test('resolves NFL team name using partial name', () => {
        expect(resolveTeam('bears')).toBe('Chicago Bears');
    });

    test('returns full NBA team object when full option is true', () => {
        const expected =     {
            name: 'Charlotte Hornets',
            colors: ['#1D1160', '#00788C', '#000000'],
            nicknames: ['hornets', 'charlotte', 'cha'],
            abbrev: ['CHA']
        }
        expect(resolveTeam('horntd', { full: true, })).toEqual(expected);
    });
});
