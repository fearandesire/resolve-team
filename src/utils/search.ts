import Fuse, { type IFuseOptions } from 'fuse.js'
import teamList from '../data/teamlist.js'
import {
	type Options,
	type Team,
	type TeamList,
	defaultOptions,
} from '../types/index.js'

/**
 * Initializes a Fuse.js instance for searching teams.
 *
 * @param {Options} options - The options for Fuse.js initialization.
 * @returns {Fuse<Team>} A Fuse.js instance configured for team searching.
 * @internal
 */
export async function initializeFuse(options: Options): Promise<Fuse<Team>> {
	const { sport, threshold } = options
	const sportSanitized = sport?.toLowerCase()

	const teams =
		sportSanitized === 'all' || !sportSanitized
			? Object.values(teamList).flat()
			: teamList[sportSanitized as keyof TeamList]

	const searchOptions: IFuseOptions<Team> = {
		isCaseSensitive: false,
		shouldSort: true,
		minMatchCharLength: 3,
		threshold: (threshold ?? defaultOptions.threshold) as number,
		keys: ['name', 'nicknames', 'abbrev'],
		useExtendedSearch: threshold === 0,
	}
	return new Fuse(teams, searchOptions)
}
