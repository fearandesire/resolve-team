import { describe, expect, test } from 'vitest'
import { teamResolver } from '../core/resolver.js'
import teamList from '../data/teamlist.js'
import type { TeamList } from '../types/team.js'

describe('Team data integrity', () => {
	test('each team object should have all defined, non-null values', () => {
		const sports: (keyof TeamList)[] = Object.keys(
			teamList,
		) as (keyof TeamList)[]
		for (const sport of sports) {
			for (const team of teamList[sport]) {
				expect(team).toBeDefined()
				for (const key of Object.keys(team)) {
					const value = team[key as keyof typeof team]
					expect(value).toBeDefined()
					expect(value).not.toBeNull()
					// If the value is an array, check each element
					if (Array.isArray(value)) {
						expect(value).not.toContain(undefined)
						expect(value).not.toContain(null)
						expect(value.length).toBeGreaterThan(0)
						for (const element of value) {
							expect(element).toBeDefined()
							expect(element).not.toBeNull()
							expect(typeof element).toBe('string')
						}
					}
				}
			}
		}
	})

	test('each team should have valid color codes', () => {
		const isValidHexColor = (color: string) =>
			/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(color)

		for (const sport of Object.keys(teamList) as (keyof TeamList)[]) {
			for (const team of teamList[sport]) {
				for (const color of team.colors) {
					expect(isValidHexColor(color)).toBe(true)
				}
			}
		}
	})

	test('each team should have unique nicknames and abbreviations', () => {
		for (const sport of Object.keys(teamList) as (keyof TeamList)[]) {
			const allNicknames = new Set<string>()
			const allAbbrev = new Set<string>()

			for (const team of teamList[sport]) {
				// Check for duplicate nicknames
				for (const nickname of team.nicknames) {
					expect(allNicknames.has(nickname.toLowerCase())).toBe(false)
					allNicknames.add(nickname.toLowerCase())
				}

				// Check for duplicate abbreviations
				for (const abbrev of team.abbrev) {
					expect(allAbbrev.has(abbrev.toLowerCase())).toBe(false)
					allAbbrev.add(abbrev.toLowerCase())
				}
			}
		}
	})
})

describe('TeamResolver functionality', () => {
	test('resolves NBA teams using various inputs', async () => {
		expect(await teamResolver.resolve('BOS')).toBe('Boston Celtics')
		expect(await teamResolver.resolve('lakers')).toBe('Los Angeles Lakers')
		expect(await teamResolver.resolve('gsw')).toBe('Golden State Warriors')
		expect(await teamResolver.resolve('sixers')).toBe('Philadelphia 76ers')
	})

	test('resolves NFL teams using various inputs', async () => {
		expect(await teamResolver.resolve('bears')).toBe('Chicago Bears')
		expect(await teamResolver.resolve('SF')).toBe('San Francisco 49ers')
		expect(await teamResolver.resolve('commanders')).toBe(
			'Washington Commanders',
		)
		expect(await teamResolver.resolve('bucs')).toBe('Tampa Bay Buccaneers')
	})

	test('returns full team object when full option is true', async () => {
		const expected = {
			name: 'Charlotte Hornets',
			colors: ['#1D1160', '#00788C', '#000000'],
			nicknames: ['hornets', 'charlotte', 'cha'],
			abbrev: ['CHA'],
			sport: 'nba',
		}
		expect(await teamResolver.resolve('hornets', { full: true })).toEqual(
			expected,
		)
	})

	test('handles sport-specific searches - basic', async () => {
		expect(await teamResolver.resolve('nyg', { sport: 'nfl' })).toBe(
			'New York Giants',
		)
		expect(await teamResolver.resolve('nyk', { sport: 'nba' })).toBe(
			'New York Knicks',
		)
	})

	test('handles sport-specific searches - strict matching', async () => {
		// Should not find NBA team when searching in NFL
		expect(
			await teamResolver.resolve('lakers', {
				sport: 'nfl',
				threshold: 0,
			}),
		).toBeNull()

		// Abbreviation exact match with threshold 0
		expect(
			await teamResolver.resolve('BOS', { sport: 'nba', threshold: 0 }),
		).toBe('Boston Celtics')

		// Abbreviation match with threshold 0.1
		expect(
			await teamResolver.resolve('bos', { sport: 'nba', threshold: 0.1 }),
		).toBe('Boston Celtics')

		// Abbreviation match with threshold 0.2
		expect(
			await teamResolver.resolve('bos', { sport: 'nba', threshold: 0.2 }),
		).toBe('Boston Celtics')

		// Abbreviation match with threshold 0.3
		expect(
			await teamResolver.resolve('bos', { sport: 'nba', threshold: 0.3 }),
		).toBe('Boston Celtics')

		// Abbreviation match with threshold 0.4
		expect(
			await teamResolver.resolve('bos', { sport: 'nba', threshold: 0.4 }),
		).toBe('Boston Celtics')
	})

	test('handles sport-specific searches - full objects', async () => {
		// Should return correct sport field in full object
		const nflTeam = await teamResolver.resolve('giants', {
			sport: 'nfl',
			full: true,
		})
		expect(nflTeam?.sport).toBe('nfl')
		const nbaTeam = await teamResolver.resolve('warriors', {
			sport: 'nba',
			full: true,
		})
		expect(nbaTeam?.sport).toBe('nba')
	})

	test('handles fuzzy matching with different thresholds', async () => {
		// Default threshold (0.4)
		expect(await teamResolver.resolve('celts')).toBe('Boston Celtics')

		// Strict threshold
		expect(await teamResolver.resolve('celts', { threshold: 0.1 }))

		// Loose threshold
		expect(await teamResolver.resolve('bos', { threshold: 0.8 })).toBe(
			'Boston Celtics',
		)
	})

	test('handles invalid and edge case inputs', async () => {
		await expect(teamResolver.resolve('')).rejects.toThrowError()
		await expect(teamResolver.resolve('   ')).rejects.toThrowError()
		expect(await teamResolver.resolve('xyz123')).toBeNull()
		await expect(
			teamResolver.resolve('invalid', { sport: 'invalid' }),
		).rejects.toThrowError()
	})

	test('handles case insensitivity', async () => {
		const teamName = 'Los Angeles Lakers'
		expect(await teamResolver.resolve('lakers')).toBe(teamName)
		expect(await teamResolver.resolve('LAKERS')).toBe(teamName)
		expect(await teamResolver.resolve('LaKeRs')).toBe(teamName)
	})

	test('compares teams correctly', async () => {
		expect(await teamResolver.compare('lakers', 'lal')).toBe(true)
		expect(await teamResolver.compare('lakers', 'celtics')).toBe(false)
		expect(
			await teamResolver.compare('nyg', 'giants', { sport: 'nfl' }),
		).toBe(true)
		await expect(
			teamResolver.compare('nyg', 'giants', { sport: 'mlb' }),
		).rejects.toThrowError()
	})
})
