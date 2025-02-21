/**
 * Configuration options for the {@linkcode resolveTeam} API's Fuse.js search functionality.
 *
 * @remarks
 * The threshold option controls how strictly the fuzzy search matches terms:
 * - 0.0 = exact matches only
 * - 0.4 = default, good balance of fuzzy/exact matching
 * - 1.0 = very loose matching
 *
 * @example
 * ```ts
 * // Example with strict matching
 * const strict = await resolveTeam('NY', { threshold: 0.2 })
 *
 * // Example with loose matching
 * const loose = await resolveTeam('NY', { threshold: 0.6 })
 *
 * // Example with sport filtering
 * const nbaOnly = await resolveTeam('NY', {
 *   sport: 'nba',
 *   threshold: 0.4
 * })
 *
 * // Example returning full team data
 * const fullData = await resolveTeam('NY', {
 *   full: true,
 *   threshold: 0.4
 * })
 * ```
 *
 * @interface
 */
interface Options {
	/**
	 * The sport category to search within.
	 * Use 'nba', 'nfl', or 'all' (default).
	 */
	sport?: string
	/**
	 * Controls fuzzy search sensitivity (0 to 1).
	 * - 0.0: Exact matches only
	 * - 0.4: Default, balanced matching
	 * - 1.0: Very loose matching
	 */
	threshold?: number
	/**
	 * When true, returns the complete team object.
	 * When false (default), returns only the team name.
	 */
	full?: boolean
}

/**
 * The default options used by the {@linkcode resolveTeam} API for the Fuse.js search.
 * These values can be overridden by passing custom options to the API.
 *
 * @remarks
 * - sport: 'all' - Searches across all available sports
 * - threshold: 0.4 - Moderate fuzzy matching (0 = exact match, 1 = loose match)
 * - full: false - Returns only the team name instead of full team object
 *
 * @example
 * ```ts
 * // Using default options
 * const result = await resolveTeam('lakers') // Returns: 'Los Angeles Lakers'
 *
 * // Overriding defaults
 * const result = await resolveTeam('lakers', {
 *   sport: 'nba',
 *   threshold: 0.2, // Stricter matching
 *   full: true // Get full team object
 * })
 * ```
 *
 * @constant
 * @type {Options}
 */
const defaultOptions: Options = {
	sport: 'all',
	threshold: 0.4,
	full: false,
}

export { defaultOptions }
export type { Options }
