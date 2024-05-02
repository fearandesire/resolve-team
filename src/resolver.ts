import Fuse from 'fuse.js'
import teamList from './teamlist.js'
import { defaultOptions, Options, Team, TeamList } from './interfaces.js'

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

// Define function overloads
export function resolveTeam(
	query: string,
	options: Options & { full: true },
): Team | null
export function resolveTeam(query: string, options?: Options): string | null

// Function implementation
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
