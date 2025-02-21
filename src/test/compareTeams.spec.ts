import { describe, expect, test } from 'vitest'
import { teamResolver } from '../core/resolver.js'

describe('compareTeams functionality', () => {
	test('matches exact team names', async () => {
		expect(
			await teamResolver.compare('Boston Celtics', 'Boston Celtics'),
		).toBe(true)
	})

	test('matches team name with abbreviation', async () => {
		expect(await teamResolver.compare('Los Angeles Lakers', 'LAL')).toBe(
			true,
		)
	})

	test('matches team nicknames', async () => {
		expect(await teamResolver.compare('lakers', 'lal')).toBe(true)
	})

	test('matches case-insensitive', async () => {
		expect(await teamResolver.compare('CELTICS', 'bos')).toBe(true)
	})

	test('returns false for different teams', async () => {
		expect(await teamResolver.compare('Lakers', 'Celtics')).toBe(false)
	})

	test('returns false for invalid team names', async () => {
		expect(
			await teamResolver.compare('Invalid Team', 'Boston Celtics'),
		).toBe(false)
	})

	test('returns false for non-resolvable teams', async () => {
		// Using completely invalid team names that shouldn't match any part of real team names
		expect(await teamResolver.compare('XYZ123', 'ABC987')).toBe(false)
	})

	test('matches teams with sport-specific options', async () => {
		expect(
			await teamResolver.compare('Giants', 'NYG', { sport: 'nfl' }),
		).toBe(true)
	})

	test('matches with different thresholds', async () => {
		// Test with known matching teams
		expect(
			await teamResolver.compare('Lakers', 'LAL', { threshold: 0.2 }),
		).toBe(true)
		expect(
			await teamResolver.compare('Lakers', 'LAL', { threshold: 0.8 }),
		).toBe(true)
	})

	test('handles empty strings', async () => {
		await expect(
			teamResolver.compare('', 'Boston Celtics'),
		).rejects.toThrowError()
		await expect(
			teamResolver.compare('Boston Celtics', ''),
		).rejects.toThrowError()
		await expect(teamResolver.compare('', '')).rejects.toThrowError()
	})

	test('handles whitespace-only strings', async () => {
		await expect(
			teamResolver.compare('   ', 'Boston Celtics'),
		).rejects.toThrowError()
		await expect(
			teamResolver.compare('Boston Celtics', '   '),
		).rejects.toThrowError()
		await expect(teamResolver.compare('   ', '   ')).rejects.toThrowError()
	})

	test('matches teams across different formats', async () => {
		const variations: [string, string][] = [
			['Boston Celtics', 'BOS'],
			['Boston Celtics', 'celtics'],
			['Boston Celtics', 'boston'],
			['BOS', 'celtics'],
			['BOS', 'boston'],
			['celtics', 'boston'],
		]

		for (const [team1, team2] of variations) {
			expect(await teamResolver.compare(team1, team2)).toBe(true)
		}
	})
})
