import Fuse from 'fuse.js'
import { defaultOptions, Options, Team, TeamList } from './interfaces.js'
import teamList from './teamlist.js'

/**
 * Validates the inputs for team and sport.
 *
 * @param {string} team - The team name to search for.
 * @param {string} [sport='all'] - The sport category to search within. Defaults to 'all'.
 * @returns {string|null} Error message if inputs are invalid, otherwise null.
 */
function validateInputs(team: string, sport: string = 'all'): string | null {
	if (!(sport in teamList) && sport !== 'all') {
		return (
			'Invalid sport category. Please choose from ' +
			Object.keys(teamList).join(', ') +
			'.'
		)
	}
	if (typeof team !== 'string' || team.trim().length === 0) {
		return 'Invalid query. Please provide a non-empty string.'
	}
	return null
}

/**
 * Initializes a Fuse.js instance for searching teams.
 *
 * @param {Options} options - The options for Fuse.js initialization.
 * @returns {Fuse<Team>} A Fuse.js instance configured for team searching.
 */
function initializeFuse(options: Options): Fuse<Team> {
	const { sport } = options
	const sportLCase = sport?.toLowerCase()
	const allTeams = Object.values(teamList).flat()
	const combinedTeams =
		sportLCase === 'all' ? allTeams : teamList[sportLCase as keyof TeamList]
	const searchOptions = {
		isCaseSensitive: false,
		shouldSort: true,
		minMatchCharLength: 1,
		keys: ['name', 'nicknames', 'abbrev'],
	}
	return new Fuse(combinedTeams, searchOptions)
}

/**
 * Resolves a team based on the query and options provided.
 *
 * @param {string} query - The query string to search for.
 * @param {Options & { full: true }} options - The options for the search, including a flag to return full team details.
 * @returns {Team|null} The matched team object or null if no match is found.
 */
export function resolveTeam(
	query: string,
	options: Options & { full: true },
): Team | null

/**
 * Resolves a team based on the query and options provided.
 *
 * @param {string} query - The query string to search for.
 * @param {Options} [options] - The options for the search.
 * @returns {string|null} The matched team name or null if no match is found.
 */
export function resolveTeam(query: string, options?: Options): string | null

/**
 * Resolves a team based on the query and options provided.
 *
 * @param {string} query - The query string to search for.
 * @param {Options} [options=defaultOptions] - The options for the search. Defaults to defaultOptions.
 * @returns {string|Team|null} The matched team name or full team object based on the options, or null if no match is found.
 */
export function resolveTeam(
	query: string,
	options: Options = defaultOptions,
): string | Team | null {
	const finalOptions = { ...defaultOptions, ...options }
	const errorMessage = validateInputs(
		query,
		finalOptions.sport?.toLowerCase(),
	)
	if (errorMessage) {
		return null
	}

	const fuse = initializeFuse(finalOptions)
	const result = fuse.search(query)

	if (result.length > 0) {
		return finalOptions.full ? result[0].item : result[0].item.name
	} else {
		return null
	}
}
