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

type Options = {
    threshold?: number;
    full?: boolean;
};

/**
 * Perform a fuzzy search on the team list.
 * @param {keyof TeamList} sport - The sport to search for.
 * @param {string} query - The query string to search for.
 * @param {Options} [options] - The options object for customizing the search behavior.
 * @returns {string | Team | null} - The matched team name, team object, or null if no match is found.
 */
export default function teamResolver(sport: keyof TeamList, query: string, options?: Options): string | Team | null {

    if (!options) {
        options = {
            threshold: 0.4,
            full: false,
        };
    } else {
        if (options.threshold === undefined) {
            options.threshold = 0.4;
        }
        if (options.full === undefined) {
            options.full = false;
        }
    }
    
    const searchOptions = {
        isCaseSensitive: false,
        shouldSort: true,
        threshold: options.threshold,
        location: 0,
        distance: 100,
        maxPatternLength: 32,
        minMatchCharLength: 1,
        keys: ['name', 'nicknames', 'abbrev'],
    };

    const teams = teamList[sport];
    const fuse = new Fuse(teams, searchOptions);
    const result = fuse.search(query);

    if (result.length > 0) {
        return options.full ? result[0].item : result[0].item.name;
    } else {
        return null;
    }
}
