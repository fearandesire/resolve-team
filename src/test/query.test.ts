import { describe, expect, test, it } from '@jest/globals';
import teamResolver from '../index'

describe('teamResolver', () => {
 
  // Tests abbreviations

  test('returns name for abbreviation', () => {
    expect(teamResolver('nba', 'LA')).toBe('Los Angeles Lakers');
  }); 

  test('returns name for abbreviation', () => {
    expect(teamResolver('nba', 'BOS')).toBe('Boston Celtics');
  }); 

   // Tests perfect match
   it('should return the correct team name when a perfect match is found', () => {
    const result = teamResolver('nba', 'Boston Celtics');
    expect(result).toBe('Boston Celtics');
  });

  // Tests fuzzy match
  it('should return the correct team name when a fuzzy match is found', () => {
    const result = teamResolver('nba', 'celts');
    expect(result).toBe('Boston Celtics');
  });
  
  // Tests  null when no match is found.
  it('should return null when no match is found', () => {
    const result = teamResolver('nba', 'xyz');
    expect(result).toBeNull();
  });

  it('get full object of team info', () => {
    const result = teamResolver('nba', 'Boston Celtics', { full: true });
    console.log(result)
    expect(result).toEqual(        {
          name: 'Boston Celtics',
          colors: ['#007A33', '#BA9653', '#000000'],
          nicknames: ['celtics', 'boston', 'bos', 'celt'],
        }
    )
  });
});