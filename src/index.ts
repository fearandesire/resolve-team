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
    sport: string | 'all';
    threshold?: number;
    full?: boolean;
};

type SearchResult = Team | string | null;

function validateInputs(query: string, sport: string | 'all'): string | null {
    if (!(sport in teamList) && sport !== 'all') {
        return 'Invalid sport category. Please choose from ' + Object.keys(teamList).join(', ') + '.';
    }
    if (typeof query !== 'string' || query.trim().length === 0) {
        return 'Invalid query. Please provide a non-empty string.';
    }
    return null;
}

function initializeFuse(options: Options): Fuse<Team> {
    const { sport } = options;
    const combinedTeams =  sport === 'all'
        ? Object.values(teamList).flat()
        : teamList[sport as keyof TeamList];

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

    return new Fuse(combinedTeams, searchOptions);
}


export default function resolveTeam(query: string, options: Options = { sport: 'all', threshold: 0.4, full: false }): SearchResult {
    const errorMessage = validateInputs(query, options.sport);
    if (errorMessage) {
     return null
    }
    const fuse = initializeFuse(options);
    const result = fuse.search(query);

    if (result.length > 0) {
        return options.full ? result[0].item : result[0].item.name;
    } else {
        return null
    }
}
