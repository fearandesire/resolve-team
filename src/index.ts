import Fuse from 'fuse.js';
import teamList from './teamlist';

type Team = {
    name: string;
    colors: string[];
    nicknames: string[];
};

type TeamList = {
    nba: Team[];
    nfl: Team[];
};

const defaultOptions: Options = {
    sport: 'all',
    threshold: 0.4,
    full: false,
};

type Options = {
    sport?: string
    threshold?: number;
    full?: boolean;
};


function validateInputs(team: string, sport: string = 'all'): string | null {
    if (!(sport in teamList) && sport !== 'all') {
        return 'Invalid sport category. Please choose from ' + Object.keys(teamList).join(', ') + '.';
    }
    if (typeof team !== 'string' || team.trim().length === 0) {
        return 'Invalid query. Please provide a non-empty string.';
    }
    return null;
}


function initializeFuse(options: Options): Fuse<Team> {
    const { sport } = options

    const allSportsTeams = Object.values(teamList).flat()
    const combinedTeams =  sport === 'all'
        ? allSportsTeams
        : teamList[sport as keyof TeamList];
    const searchOptions = {
        isCaseSensitive: false,
        shouldSort: true,
        minMatchCharLength: 1,
        keys: ['name', 'nicknames', 'abbrev'],
    };
    return new Fuse(combinedTeams, searchOptions);
}


export default function resolveTeam(query: string, options: Options = defaultOptions): string | object | null {
    const finalOptions = { ...defaultOptions, ...options };
    const errorMessage = validateInputs(query, finalOptions.sport);
    if (errorMessage) {
        return null;
    }

    if (!options?.sport) {
        options.sport = 'all'
    }
    const fuse = initializeFuse(options);
    const result = fuse.search(query);

    if (result.length > 0) {
        return options.full ? result[0].item : result[0].item.name;
    } else {
        return null
    }
}