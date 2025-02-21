import { describe, expect, test } from 'vitest'
import teamList from '../data/teamlist.js'
import { teamResolver } from '../index.js'
import { type TeamList } from '../types/team.js'

describe('getTeamsByLeague functionality', () => {
	test('returns all NBA teams correctly', async () => {
		const nbaTeams = await teamResolver.getTeamsByLeague('nba')

		// Verify we get an array of strings
		expect(Array.isArray(nbaTeams)).toBe(true)
		expect(nbaTeams.every((team: string) => typeof team === 'string')).toBe(
			true,
		)

		// Verify we get all NBA teams
		const expectedNbaTeams = teamList.nba.map((team) => team.name)
		expect(nbaTeams).toEqual(expectedNbaTeams)
		expect(nbaTeams.length).toBe(teamList.nba.length)

		// Verify some specific team names are present
		expect(nbaTeams).toContain('Los Angeles Lakers')
		expect(nbaTeams).toContain('Boston Celtics')
		expect(nbaTeams).toContain('Golden State Warriors')
	})

	test('returns all NFL teams correctly', async () => {
		const nflTeams = await teamResolver.getTeamsByLeague('nfl')

		// Verify we get an array of strings
		expect(Array.isArray(nflTeams)).toBe(true)
		expect(nflTeams.every((team: string) => typeof team === 'string')).toBe(
			true,
		)

		// Verify we get all NFL teams
		const expectedNflTeams = teamList.nfl.map((team) => team.name)
		expect(nflTeams).toEqual(expectedNflTeams)
		expect(nflTeams.length).toBe(teamList.nfl.length)

		// Verify some specific team names are present
		expect(nflTeams).toContain('Green Bay Packers')
		expect(nflTeams).toContain('Dallas Cowboys')
		expect(nflTeams).toContain('New England Patriots')
	})

	test('throws error for invalid sport', async () => {
		// Test with invalid sport
		await expect(
			teamResolver.getTeamsByLeague('mlb' as keyof TeamList),
		).rejects.toThrowError()
		await expect(
			teamResolver.getTeamsByLeague('' as keyof TeamList),
		).rejects.toThrowError()
	})

	test('returns teams in consistent order', async () => {
		// Test that multiple calls return teams in the same order
		const firstNbaCall = await teamResolver.getTeamsByLeague('nba')
		const secondNbaCall = await teamResolver.getTeamsByLeague('nba')
		const firstNflCall = await teamResolver.getTeamsByLeague('nfl')
		const secondNflCall = await teamResolver.getTeamsByLeague('nfl')

		expect(firstNbaCall).toEqual(secondNbaCall)
		expect(firstNflCall).toEqual(secondNflCall)
	})

	test('returned team names match source data format', async () => {
		const nbaTeams = await teamResolver.getTeamsByLeague('nba')
		const nflTeams = await teamResolver.getTeamsByLeague('nfl')

		// Verify team names match exactly with source data
		for (const team of nbaTeams) {
			const sourceTeam = teamList.nba.find((t) => t.name === team)
			expect(sourceTeam).toBeDefined()
			expect(sourceTeam?.name).toBe(team)
		}

		for (const team of nflTeams) {
			const sourceTeam = teamList.nfl.find((t) => t.name === team)
			expect(sourceTeam).toBeDefined()
			expect(sourceTeam?.name).toBe(team)
		}
	})
})
