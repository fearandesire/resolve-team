/**
 * Represents a sports team.
 *
 * @interface
 */
interface Team {
	/** The name of the team. */
	name: string
	/** The team colors. */
	colors: string[]
	/** The nicknames of the team. */
	nicknames: string[]
	/** The abbreviations of the team. */
	abbrev: string[]
}

/**
 * Represents a list of teams categorized by sport.
 *
 * @interface
 */
interface TeamList {
	/** List of NBA teams. */
	nba: Team[]
	/** List of NFL teams. */
	nfl: Team[]
}

/**
 * The default options for the Fuse.js search.
 *
 * @constant
 * @type {Options}
 */
const defaultOptions: Options = {
	sport: 'all',
	threshold: 0.4,
	full: false,
}

/**
 * Represents the options for the Fuse.js search.
 *
 * @interface
 */
interface Options {
	/** The sport category to search within. */
	sport?: string
	/** The threshold for the Fuse.js search. */
	threshold?: number
	/** Flag to return full team details. */
	full?: boolean
}

export { Team, TeamList, defaultOptions, Options }
