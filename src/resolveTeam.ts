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

type SearchResult = {
    team: Team | string | null;
    success: boolean;
    error?: string;
};

/**
 * Validate inputs and return a formatted error message if invalid.
 * @param {string} sport - The sport category.
 * @param {string} query - The search query.
 * @returns {string | null} - Error message or null if valid.
 */
function validateInputs(sport: keyof TeamList, query: string): string | null {
    if (!teamList[sport]) {
        return 'Invalid sport category. Please choose from ' + Object.keys(teamList).join(', ') + '.';
    }
    if (typeof query !== 'string' || query.trim().length === 0) {
        return 'Invalid query. Please provide a non-empty string.';
    }
    return null;
}

/**
 * Initializes Fuse.js with the provided options and team data.
 * @param {keyof TeamList} sport - The sport category.
 * @param {Options} options - Search options.
 * @returns {Fuse} - The initialized Fuse instance.
 */
function initializeFuse(sport: keyof TeamList, options: Options): Fuse<Team> {
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

    return new Fuse(teamList[sport], searchOptions);
}

/**
 * Perform a fuzzy search on the team list.
 * @param {keyof TeamList} sport - The sport to search for.
 * @param {string} query - The query string to search for.
 * @param {Options} [options={ threshold: 0.4, full: false }] - The options object for customizing the search behavior.
 * @returns {SearchResult} - The search result.
 */
export default function resolveTeam<T extends keyof TeamList>(sport: T, query: string, options: Options = { threshold: 0.4, full: false }): SearchResult {
    
    const errorMessage = validateInputs(sport, query);
    if (errorMessage) {
        return { team: null, success: false, error: errorMessage };
    }

    const fuse = initializeFuse(sport, options);
    const result = fuse.search(query);

    if (result.length > 0) {
        const teamResult = options.full ? result[0].item : result[0].item.name;
        return { team: teamResult, success: true };
    } else {
        return { team: null, success: false, error: 'No matching team found.' };
    }
}
