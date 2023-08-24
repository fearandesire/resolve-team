import Fuse from 'fuse.js';
import teamList from './teamlist.js';

type Team = {
    name: string;
    colors: string[];
    nicknames: string[];
};

type TeamList = {
    nba: Team[];
    nfl: Team[];
};

type thresh = number | 0.4;

/**
 * Perform a fuzzy search on the team list.
 * @param {keyof TeamList} sport - The sport to search for.
 * @param {string} query - The query string to search for.
 * @param {number} [threshold=0.4] - The threshold for fuzzy matching. 0 is a perfect match - 1 is a wide range. Defaults to 0.4 if not provided.
 * @returns {string | null} - The matched team name, or null if no match is found.
 */
export default function teamResolver(sport: keyof TeamList, query: string, threshold?: number): string | null {
    if (threshold === undefined) {
            threshold = 0.4
        }
    const options = {
        isCaseSensitive: false,
        shouldSort: true,
        threshold,
        location: 0,
        distance: 100,
        maxPatternLength: 32,
        minMatchCharLength: 1,
        keys: ['name', 'nicknames'],
    };

    const teams = teamList[sport];
    const fuse = new Fuse(teams, options);
    const result = fuse.search(query);

    return result.length > 0 ? result[0].item.name : null;
}