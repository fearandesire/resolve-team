import type Fuse from 'fuse.js'
import teamList from '../data/teamlist.js'
import { type Options, defaultOptions } from '../types/options.js'
import type { Team, TeamList } from '../types/team.js'
import { initializeFuse } from '../utils/search.js'
import { listValidSports, validateInputs } from '../utils/validation.js'

/**
 * Acceptable sports the library can search for.
 *
 * i.e: 'nba', 'nfl'
 */
type SportLeague = keyof TeamList

/**
 * Provides methods for resolving and comparing sports team names using fuzzy search capabilities.
 *
 * @example
 * ```ts
 * const resolver = new TeamResolver()
 *
 // Basic usage - returns team name
 * const basic = await resolver.resolve('celtics')
 * console.log(basic) // 'Boston Celtics'
 *
 // Get full team object (name, colors, nicknames, abbrev, sport)
 * const full = await resolver.resolve('celtics', { full: true })
 *
 // Compare two teams
 * const areSame = await resolver.compare('celtics', 'boston')
 * console.log(areSame) // true
 * ```
 */
export class TeamResolver {
	private fuseInstance: Fuse<Team> | null = null
	private lastOptions: Options | null = null
	private options: Options

	/**
	 * Creates a new TeamResolver instance with optional default options.
	 *
	 * @param {Options} [options=defaultOptions] - Default options to use for all resolver operations
	 */
	constructor(options: Options = defaultOptions) {
		this.options = { ...defaultOptions, ...options }
	}

	/**
	 * Resolves a sports team name or complete team data based on a search query.
	 * Uses fuzzy search to find matches even with partial or misspelled input.
	 *
	 * @remarks
	 * The search is performed across team names, nicknames, and abbreviations.
	 * The threshold option controls how strict the matching is:
	 * - Lower values (0.0-0.3): Require very close matches
	 * - Medium values (0.4-0.6): Allow moderate fuzzy matching
	 * - Higher values (0.7-1.0): Very loose matching, may return unexpected results
	 *
	 * @example
	 * ```ts
	 // Basic usage - returns team name
	 * const basic = await resolver.resolve('celtics')
	 * console.log(basic) // 'Boston Celtics'
	 *
	 // Get full team object
	 * const full = await resolver.resolve('celtics', { full: true })
	 *
	 // Restrict the search to a specific sport
	 * const strict = await resolver.resolve('minnesota', {
	 *   sport: 'nfl',
	 *   threshold: 0.2
	 * }) // 'Minnesota Vikings'
	 *
	 * ```
	 */
	public async resolve(
		query: string,
		options: Options & { full: true },
	): Promise<Team | null>
	public async resolve(
		query: string,
		options?: Options,
	): Promise<string | null>
	public async resolve(
		query: string,
		options: Options = this.options,
	): Promise<string | Team | null> {
		const finalOptions = { ...this.options, ...options }
		const invalidInput = await validateInputs(
			query,
			finalOptions.sport?.toLowerCase(),
		)
		if (invalidInput) {
			throw new Error(invalidInput)
		}

		const fuse = await this.getFuseInstance(finalOptions)
		const result = fuse.search(query)

		// Return null if no matches found
		if (result.length === 0) {
			return null
		}

		// Safely extract the first match, handling potential undefined
		const item = result[0]?.item
		if (!item) {
			return null
		}

		// Return either full team object or just the name based on options
		return finalOptions.full ? item : item.name
	}

	/**
	 * Compares two team queries to determine if they refer to the same team.
	 * Uses fuzzy search to handle variations in team names, nicknames, and abbreviations.
	 *
	 * @example
	 * ```ts
	 // Compare teams using default options
	 * const areSame = await resolver.compare('lakers', 'lal')
	 * console.log(areSame) // true
	 *
	 // Compare teams within a specific sport
	 * const nflCompare = await resolver.compare('giants', 'nyg', {
	 *   sport: 'nfl',
	 *   threshold: 0.3
	 * })
	 *
	 // Using loose matching
	 * const looseCompare = await resolver.compare('new york', 'ny', {
	 *   threshold: 0.6
	 * })
	 *
	 // Retrieving the full team object that's matched
	 * const fullCompare = await resolver.compare('giants', 'nyg', {
	 *   full: true,
	 *   threshold: 0.3
	 * })
	 * console.log(fullCompare) // Returns the full New York Giants team object
	 * ```
	 */

	/**
	 * @param {string} team1 - First team query
	 * @param {string} team2 - Second team query
	 * @param {Options} [options] - Optional search configuration
	 * @returns {Promise<boolean>} True if both queries resolve to the same team, false otherwise
	 */
	public async compare(team1: string, team2: string): Promise<boolean>
	public async compare(
		team1: string,
		team2: string,
		options?: Options,
	): Promise<boolean>

	/**
	 * @param {string} team1 - First team query
	 * @param {string} team2 - Second team query
	 * @param {Options & { full: true }} options - Search configuration with full=true to return team object
	 * @returns {Promise<Team | null>} The matched team object if teams are the same, null otherwise
	 */
	public async compare(
		team1: string,
		team2: string,
		options: Options & { full: true },
	): Promise<Team | null>

	public async compare(
		team1: string,
		team2: string,
		options: Options = this.options,
	): Promise<boolean | Team | null> {
		const finalOptions = { ...this.options, ...options, full: true }

		const result1 = (await this.resolve(team1, finalOptions)) as Team | null
		const result2 = (await this.resolve(team2, finalOptions)) as Team | null

		if (!result1 || !result2) {
			return false
		}

		if (result1.name !== result2.name) {
			return false
		}

		return options.full === true ? result1 : true
	}

	/**
	 * Returns an array of team names for the specified sport league.
	 *
	 * @param {keyof TeamList} sport - The sport league to get teams for ('nba' or 'nfl')
	 * @returns {string[]} Array of team names for the specified league
	 * @throws {Error} If invalid sport is provided
	 *
	 * @example
	 * ```ts
	 * const resolver = new TeamResolver()
	 * const nbaTeams = resolver.getTeamsByLeague('nba')
	 * console.log(nbaTeams) // ['Atlanta Hawks', 'Boston Celtics', ...]
	 * ```
	 */
	public async getTeamsByLeague(sport: SportLeague): Promise<string[]> {
		const teams = teamList[sport.toLowerCase() as keyof TeamList]
		if (!teams) {
			const validSports = await listValidSports()
			throw new Error(
				`Invalid sport: ${sport}. Must be one of: ${validSports.join(', ')}`,
			)
		}
		return teams.map((team: Team) => team.name)
	}

	/**
	 * Returns an array of all NBA team names.
	 *
	 * @returns {string[]} Array of all NBA team names
	 *
	 * @example
	 * ```ts
	 * const resolver = new TeamResolver()
	 * const nbaTeams = resolver.getNbaTeams()
	 * console.log(nbaTeams) // ['Atlanta Hawks', 'Boston Celtics', ...]
	 * ```
	 */
	public async getNbaTeams(): Promise<string[]> {
		return this.getTeamsByLeague('nba')
	}

	/**
	 * Returns an array of all NFL team names.
	 *
	 * @returns {string[]} Array of all NFL team names
	 *
	 * @example
	 * ```ts
	 * const resolver = new TeamResolver()
	 * const nflTeams = resolver.getNflTeams()
	 * console.log(nflTeams) // ['Arizona Cardinals', 'Atlanta Falcons', ...]
	 * ```
	 */
	public async getNflTeams(): Promise<string[]> {
		return this.getTeamsByLeague('nfl')
	}

	/**
	 * Gets or initializes the Fuse instance for fuzzy searching.
	 * @private
	 */
	private async getFuseInstance(options: Options): Promise<Fuse<Team>> {
		const optionsChanged =
			!this.lastOptions ||
			this.lastOptions.sport !== options.sport ||
			this.lastOptions.threshold !== options.threshold

		if (!this.fuseInstance || optionsChanged) {
			this.fuseInstance = await initializeFuse(options)
			this.lastOptions = { ...options }
		}
		return this.fuseInstance
	}
}

// Singleton for simple use

/**
 * Provides methods for resolving and comparing sports team names using fuzzy search capabilities.
 * 
 * There's also a set of {@link Options} that can be used to configure the search to set the sport, threshold, and retrieve the full team object.
 *
 * @example
 * ```ts
 * import { teamResolver } from 'resolve-team'
 // Basic usage - returns team name
 * const basic = await teamResolver.resolve('celtics')
 * console.log(basic) // 'Boston Celtics'
 *
 // Get full team object (name, colors, nicknames, abbrev, sport)
 * const full = await teamResolver.resolve('celtics', { full: true })
 *
 // Compare two teams
 * const areSame = await teamResolver.compare('celtics', 'boston')
 * console.log(areSame) // true
 * 
 // Sport specific search
 * const nbaTeams = await teamResolver.resolve('minnesota', {
 *   sport: 'nba',
 *   threshold: 0.2
 * })
 * console.log(nbaTeams) // 'Minnesota Timberwolves'
 * ```
 */
export const teamResolver: TeamResolver = new TeamResolver()
// ! For backward compatibility, we still export the old functions; simply using the new class

/**
 * @deprecated Use the {@link TeamResolver} class instead.
 * Resolves {@link Team} data based on the query and options provided.
 * Returns the complete team object when the full option is true.
 *
 * @example
 * ```ts
 // Get full team details with strict matching
 * const celtics = await resolveTeam('celtics', {
 *   full: true,
 *   threshold: 0.2
 * })
 // Returns:
 // {
 //   name: 'Boston Celtics',
 //   colors: ['#007A33', '#BA9653', '#000000'],
 //   nicknames: ['celtics', 'boston', 'bos', 'celt'],
 //   abbrev: ['BOS'],
 //   sport: 'nba'
 // }
 *
 // Search only in NBA with default threshold
 * const celtics = await resolveTeam('boston', {
 *   full: true,
 *   sport: 'nba'
 * })
 * ```
 *
 * @param {string} query - The search term (team name, nickname, or abbreviation).
 * @param {Options & { full: true }} options - Search options with full=true to return complete team data.
 * @returns {Promise<Team|null>} The matched team object or null if no match is found.
 */
export async function resolveTeam(
	query: string,
	options: Options & { full: true },
): Promise<Team | null>

/**
 * @deprecated Use the {@link TeamResolver} class instead.
 * Resolves a team name based on the query.
 * Returns just the team name when no options are provided or full=false.
 *
 * @example
 * ```ts
 // Basic usage with default options
 * const team = await resolveTeam('nyg')
 * console.log(team) // 'New York Giants'
 *
 // Using strict matching (lower threshold)
 * const exact = await resolveTeam('sf', {
 *   threshold: 0.2
 * })
 *
 // Search in specific sport category
 * const nfl = await resolveTeam('ny', {
 *   sport: 'nfl',
 *   threshold: 0.4
 * })
 *```
 *
 * @param {string} query - The search term (team name, nickname, or abbreviation).
 * @param {Options} [options] - Optional search configuration.
 * @returns {Promise<string|null>} The matched team name or null if no match is found.
 */
export async function resolveTeam(
	query: string,
	options?: Options,
): Promise<string | null>

// Implementation
export async function resolveTeam(
	query: string,
	options: Options = defaultOptions,
): Promise<string | Team | null> {
	const resolver = new TeamResolver(options)
	return resolver.resolve(query, options)
}
