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

// Updated SearchResult type
type SearchResult = Team | string | null;

function validateInputs(sport: string, query: string): string | null {
    if (!(sport in teamList)) {
        return 'Invalid sport category. Please choose from ' + Object.keys(teamList).join(', ') + '.';
    }
    if (typeof query !== 'string' || query.trim().length === 0) {
        return 'Invalid query. Please provide a non-empty string.';
    }
    return null;
}

function initializeFuse(sport: string, options: Options): Fuse<Team> {
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

    return new Fuse(teamList[sport as keyof TeamList], searchOptions);
}

export default function resolveTeam(sport: string, query: string, options: Options = { threshold: 0.4, full: false }): SearchResult {
    const errorMessage = validateInputs(sport, query);
    if (errorMessage) {
     return null
    }

    const fuse = initializeFuse(sport, options);
    const result = fuse.search(query);

    if (result.length > 0) {
        return options.full ? result[0].item : result[0].item.name;
    } else {
        return null
    }
}
