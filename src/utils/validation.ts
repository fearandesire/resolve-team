import teamList from '../data/teamlist.js'

/**
 * Validates the inputs for team and sport.
 *
 * @param {string} team - The team name to search for.
 * @param {string} [sport='all'] - The sport category to search within. Defaults to 'all'.
 * @returns {string|null} Error message if inputs are invalid, otherwise null.
 * @internal
 */
export async function validateInputs(
	team: string,
	sport: string = 'all',
): Promise<string | null> {
	if (!(sport in teamList) && sport !== 'all') {
		return (
			'Invalid sport category. Please choose from ' +
			(await listValidSports()).join(', ') +
			'.'
		)
	}
	if (typeof team !== 'string' || team.trim().length === 0) {
		return 'Invalid query. Please provide a non-empty string for the team name.'
	}
	return null
}

export async function listValidSports(): Promise<string[]> {
	return Object.keys(teamList)
}
