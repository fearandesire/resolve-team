interface Team {
    name: string;
    colors: string[];
    nicknames: string[];
};

interface TeamList {
    nba: Team[];
    nfl: Team[];
};

const defaultOptions: Options = {
    sport: 'all',
    threshold: 0.4,
    full: false,
};

interface Options {
    sport?: string
    threshold?: number;
    full?: boolean;
};

export { Team, TeamList, defaultOptions, Options }