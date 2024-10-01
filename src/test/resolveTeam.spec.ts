import { resolveTeam } from '../index.js'
import teamList from '../teamlist.js'
import { TeamList } from '../interfaces'

describe('Team data integrity', () => {
	test('each team object should have all defined, non-null values', () => {
		const sports: (keyof TeamList)[] = Object.keys(
			teamList,
		) as (keyof TeamList)[]
		sports.forEach((sport) => {
			teamList[sport].forEach((team) => {
				expect(team).toBeDefined()
				Object.keys(team).forEach((key) => {
					const value = team[key as keyof typeof team]
					expect(value).toBeDefined()
					expect(value).not.toBeNull()
					// If the value is an array, check each element
					if (Array.isArray(value)) {
						expect(value).not.toContain(undefined)
						expect(value).not.toContain(null)
						value.forEach((element) => {
							expect(element).toBeDefined()
							expect(element).not.toBeNull()
						})
					}
				})
			})
		})
	})
})
describe('resolveTeam functionality', () => {
	test('resolves a NBA team name using abbreviation', async () => {
		expect(await resolveTeam('BOS')).toBe('Boston Celtics')
	})

	test('resolves a NFL team name using partial name', async () => {
		expect(await resolveTeam('bears')).toBe('Chicago Bears')
	})

	test('returns full NBA team object when full option is true', async () => {
		const expected = {
			name: 'Charlotte Hornets',
			colors: ['#1D1160', '#00788C', '#000000'],
			nicknames: ['hornets', 'charlotte', 'cha'],
			abbrev: ['CHA'],
		}
		expect(await resolveTeam('horntd', { full: true })).toEqual(expected)
	})
})
