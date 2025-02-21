/**
 * Represents a sports team with its identifying information.
 *
 * @example
 * ```ts
 * const team: Team = {
 *   name: 'Los Angeles Lakers',
 *   colors: ['#552583', '#FDB927', '#000000'],
 *   nicknames: ['lakers', 'los angeles', 'lal'],
 *   abbrev: ['LAL'],
 *   sport: 'nba'
 * }
 * ```
 *
 * @interface
 */
interface Team {
	/** The official full name of the team. */
	name: string
	/** The official team colors in hexadecimal format. */
	colors: string[]
	/** Common nicknames and alternative names for the team. */
	nicknames: string[]
	/** Official abbreviations used by the league. */
	abbrev: string[]
	/** The sport this team belongs to (e.g., 'nba', 'nfl'). */
	sport: string
}

/**
 * Represents a list of teams categorized by sport.
 * This is the source data that the {@linkcode resolveTeam} API uses to identify and resolve team information.
 * Currently supports NBA and NFL teams.
 *
 * @example
 * ```ts
 * const teams: TeamList = {
 *   nba: [
 *     {
 *       name: 'Boston Celtics',
 *       colors: ['#007A33', '#BA9653', '#000000'],
 *       nicknames: ['celtics', 'boston', 'bos'],
 *       abbrev: ['BOS']
 *     }
 *   ],
 *   nfl: [
 *     {
 *       name: 'Green Bay Packers',
 *       colors: ['#203731', '#FFB612'],
 *       nicknames: ['packers', 'green bay', 'gb'],
 *       abbrev: ['GB']
 *     }
 *   ]
 * }
 * ```
 *
 * @interface
 */
interface ITeamList {
	/** List of NBA teams. */
	nba: Team[]
	/** List of NFL teams. */
	nfl: Team[]
}

export type { Team, ITeamList as TeamList }
