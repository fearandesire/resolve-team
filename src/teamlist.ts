const teamList = {
    nba: [{
        name: 'Atlanta Hawks',
        colors: ['#E03A3E', '#C1D32F', '#000000'],
        nicknames: ['hawks', 'atlanta', 'atl'],
        abbrev: ['ATL']
    },
    {
        name: 'Boston Celtics',
        colors: ['#007A33', '#BA9653', '#000000'],
        nicknames: ['celtics', 'boston', 'bos', 'celt'],
        abbrev: ['BOS']
    },
    {
        name: 'Brooklyn Nets',
        colors: ['#000000', '#FFFFFF', '#000000'],
        nicknames: ['nets', 'brooklyn', 'bkn'],
        abbrev: ['BKN']
    },
    {
        name: 'Charlotte Hornets',
        colors: ['#1D1160', '#00788C', '#000000'],
        nicknames: ['hornets', 'charlotte', 'cha'],
        abbrev: ['CHA']
    },
    {
        name: 'Chicago Bulls',
        colors: ['#CE1141', '#000000', '#000000'],
        nicknames: ['bulls', 'chicago', 'chi'],
        abbrev: ['CHI']
    },
    {
        name: 'Cleveland Cavaliers',
        colors: ['#860038', '#041E42', '#000000'],
        nicknames: ['cavaliers', 'cleveland', 'cle'],
        abbrev: ['CLE']
    },
    {
        name: 'Dallas Mavericks',
        colors: ['#00538C', '#B8C4CA', '#000000'],
        nicknames: ['mavericks', 'dallas', 'dal'],
        abbrev: ['DAL']
    },
    {
        name: 'Denver Nuggets',
        colors: ['#0E2240', '#FEC524', '#000000'],
        nicknames: ['nuggets', 'denver', 'den'],
        abbrev: ['DEN']
    },
    {
        name: 'Detroit Pistons',
        colors: ['#C8102E', '#1D42BA', '#000000'],
        nicknames: ['pistons', 'detroit', 'det'],
        abbrev: ['DET']
    },
    {
        name: 'Golden State Warriors',
        colors: ['#1D428A', '#FFC72C', '#000000'],
        nicknames: ['warriors', 'golden state', 'gs'],
        abbrev: ['GSW']
    },
    {
        name: 'Houston Rockets',
        colors: ['#CE1141', '#000000', '#000000'],
        nicknames: ['rockets', 'houston', 'hou'],
        abbrev: ['HOU']
    },
    {
        name: 'Indiana Pacers',
        colors: ['#002D62', '#FDBB30', '#000000'],
        nicknames: ['pacers', 'indiana', 'ind'],
        abbrev: ['IND']
    },
    {
        name: 'Los Angeles Clippers',
        colors: ['#ED174C', '#006BB6', '#000000'],
        nicknames: ['clippers', 'los angeles', 'lac'],
        abbrev: [undefined]
    },
    {
        name: 'Los Angeles Lakers',
        colors: ['#552583', '#FDB927', '#000000'],
        nicknames: ['lakers', 'los angeles', 'lal'],
        abbrev: ['LAL']
    },
    {
        name: 'Memphis Grizzlies',
        colors: ['#5D76A9', '#12173F', '#000000'],
        nicknames: ['grizzlies', 'memphis', 'mem'],
        abbrev: ['MEM']
    },
    {
        name: 'Miami Heat',
        colors: ['#98002E', '#F9A01B', '#000000'],
        nicknames: ['heat', 'miami', 'mia'],
        abbrev: ['MIA']
    },
    {
        name: 'Milwaukee Bucks',
        colors: ['#00471B', '#EEE1C6', '#000000'],
        nicknames: ['bucks', 'milwaukee', 'mil'],
        abbrev: ['MIL']
    },
    {
        name: 'Minnesota Timberwolves',
        colors: ['#0C2340', '#236192', '#000000'],
        nicknames: ['timberwolves', 'minnesota', 'min'],
        abbrev: ['MIN']
    },
    {
        name: 'New Orleans Pelicans',
        colors: ['#002B5C', '#B4975A', '#E31837', '#85714D'],
        nicknames: ['pelicans', 'new orleans', 'no'],
        abbrev: ['NOP']
    },
    {
        name: 'New York Knicks',
        colors: ['#006BB6', '#F58426', '#BEC0C2'],
        nicknames: ['knicks', 'new york', 'ny'],
        abbrev: ['NYK']
    },
    {
        name: 'Oklahoma City Thunder',
        colors: ['#007AC1', '#F05133', '#002D62', '#EF3B24', '#C4CED4'],
        nicknames: ['thunder', 'oklahoma city', 'okc'],
        abbrev: ['OKC']
    },
    {
        name: 'Orlando Magic',
        colors: ['#0077C0', '#C4CED4', '#000000'],
        nicknames: ['magic', 'orlando', 'orl'],
        abbrev: ['ORL']
    },
    {
        name: 'Philadelphia 76ers',
        colors: ['#006BB6', '#ED174C', '#002B5C'],
        nicknames: ['76ers', 'philadelphia', 'philly'],
        abbrev: ['PHI']
    },
    {
        name: 'Phoenix Suns',
        colors: ['#1D1160', '#E56020', '#63727A'],
        nicknames: ['suns', 'phoenix', 'phx'],
        abbrev: ['PHX']
    },
    {
        name: 'Portland Trail Blazers',
        colors: ['#E03A3E', '#000000', '#FFFFFF'],
        nicknames: ['trail blazers', 'portland', 'por'],
        abbrev: ['POR']
    },
    {
        name: 'Sacramento Kings',
        colors: ['#5A2D81', '#63727A', '#BEC0C2'],
        nicknames: ['kings', 'sacramento', 'sac'],
        abbrev: ['SAC']
    },
    {
        name: 'San Antonio Spurs',
        colors: ['#000000', '#C4CED4', '#BAC3C9', '#AC1A2F'],
        nicknames: ['spurs', 'san antonio', 'sa'],
        abbrev: ['SAS']
    },
    {
        name: 'Toronto Raptors',
        colors: ['#CE1141', '#000000', '#A1A1A4', '#B4975A'],
        nicknames: ['raptors', 'toronto', 'tor'],
        abbrev: ['TOR']
    },
    {
        name: 'Utah Jazz',
        colors: ['#002B5C', '#00471B', '#F9A01B', '#FFFFFF'],
        nicknames: ['jazz', 'utah', 'uta'],
        abbrev: ['UTA']
    },
    {
        name: 'Washington Wizards',
        colors: ['#002B5C', '#E31837', '#C4CED4', '#002244'],
        nicknames: ['wizards', 'washington', 'was'],
        abbrev: ['WAS']
    }],

    nfl:
        [{
            name: 'Arizona Cardinals',
            colors: ['#97233F', '#000000'],
            nicknames: ['cardinals', 'cards', 'ari'],
            abbrev: ['ARI']
        },
        {
            name: 'Atlanta Falcons',
            colors: ['#A71930', '#000000', '#A5ACAF'],
            nicknames: ['falcons', 'atlanta', 'atl'],
            abbrev: ['ATL']
        },
        {
            name: 'Baltimore Ravens',
            colors: ['#241773', '#9E7C0C', '#000000'],
            nicknames: ['ravens', 'baltimore', 'bal'],
            abbrev: ['BAL']
        },
        {
            name: 'Buffalo Bills',
            colors: ['#00338D', '#C60C30'],
            nicknames: ['bills', 'buffalo', 'buf'],
            abbrev: ['BUF']
        },
        {
            name: 'Carolina Panthers',
            colors: ['#0085CA', '#101820', '#A5ACAF'],
            nicknames: ['panthers', 'carolina', 'car'],
            abbrev: ['CAR']
        },
        {
            name: 'Chicago Bears',
            colors: ['#0B162A', '#C83803'],
            nicknames: ['bears', 'chicago', 'chi'],
            abbrev: ['CHI']
        },
        {
            name: 'Cincinnati Bengals',
            colors: ['#FB4F14', '#000000'],
            nicknames: ['bengals', 'cincinnati', 'cin'],
            abbrev: ['CIN']
        },
        {
            name: 'Cleveland Browns',
            colors: ['#311D00', '#FF3C00'],
            nicknames: ['browns', 'cleveland', 'cle'],
            abbrev: ['CLE']
        },
        {
            name: 'Dallas Cowboys',
            colors: ['#003594', '#041E42', '#A5ACAF'],
            nicknames: ['cowboys', 'dallas', 'dal'],
            abbrev: ['DAL']
        },
        {
            name: 'Denver Broncos',
            colors: ['#FB4F14', '#002244'],
            nicknames: ['broncos', 'denver', 'den'],
            abbrev: ['DEN']
        },
        {
            name: 'Detroit Lions',
            colors: ['#0076B6', '#B0B7BC', '#000000'],
            nicknames: ['lions', 'detroit', 'det'],
            abbrev: ['DET']
        },
        {
            name: 'Green Bay Packers',
            colors: ['#203731', '#FFB612'],
            nicknames: ['packers', 'green bay', 'gb'],
            abbrev: ['GB']
        },
        {
            name: 'Houston Texans',
            colors: ['#03202F', '#A71930', '#FFFFFF'],
            nicknames: ['texans', 'houston', 'hou'],
            abbrev: ['HOU']
        },
        {
            name: 'Indianapolis Colts',
            colors: ['#002C5F', '#A5ACAF', '#FFFFFF'],
            nicknames: ['colts', 'indianapolis', 'ind'],
            abbrev: ['IND']
        },
        {
            name: 'Jacksonville Jaguars',
            colors: ['#006778', '#D7A22A', '#9F792C', '#000000'],
            nicknames: ['jaguars', 'jacksonville', 'jax'],
            abbrev: ['JAX']
        },
        {
            name: 'Kansas City Chiefs',
            colors: ['#E31837', '#FFB81C'],
            nicknames: ['chiefs', 'kansas city', 'kc'],
            abbrev: ['KC']
        },
        {
            name: 'Las Vegas Raiders',
            colors: ['#000000', '#A5ACAF', '#C4C9CC'],
            nicknames: ['raiders', 'las vegas', 'lv'],
            abbrev: ['LV']
        },
        {
            name: 'Los Angeles Chargers',
            colors: ['#0072C6', '#FFC20E', '#000000'],
            nicknames: ['chargers', 'l.a. chargers', 'lac'],
            abbrev: ['LAC']
        },
        {
            name: 'Los Angeles Rams',
            colors: ['#002244', '#869397', '#FFFFFF'],
            nicknames: ['rams', 'l.a. rams', 'lar'],
            abbrev: ['LAR']
        },
        {
            name: 'Miami Dolphins',
            colors: ['#008E97', '#F58220', '#005778', '#FB4F14'],
            nicknames: ['dolphins', 'miami', 'mia'],
            abbrev: ['MIA']
        },
        {
            name: 'Minnesota Vikings',
            colors: ['#4F2683', '#FFC62F', '#FFFFFF'],
            nicknames: ['vikings', 'minnesota', 'min'],
            abbrev: ['MIN']
        },
        {
            name: 'New England Patriots',
            colors: ['#002244', '#C60C30', '#B0B7BC', '#FFFFFF'],
            nicknames: ['patriots', 'new england', 'ne'],
            abbrev: ['NE']
        },
        {
            name: 'New Orleans Saints',
            colors: ['#D3BC8D', '#000000'],
            nicknames: ['saints', 'new orleans', 'no'],
            abbrev: ['NO']
        },
        {
            name: 'New York Giants',
            colors: ['#0B2265', '#A71930', '#A5ACAF'],
            nicknames: ['giants', 'new york', 'nyg'],
            abbrev: ['NYG']
        },
        {
            name: 'New York Jets',
            colors: ['#0C371D', '#FFFFFF'],
            nicknames: ['jets', 'new york', 'nyj'],
            abbrev: ['NYJ']
        },
        {
            name: 'Philadelphia Eagles',
            colors: ['#004C54', '#A5ACAF', '#000000', '#FFD814'],
            nicknames: ['eagles', 'philadelphia', 'phi'],
            abbrev: ['PHI']
        },
        {
            name: 'Pittsburgh Steelers',
            colors: ['#101820', '#FFB81C'],
            nicknames: ['steelers', 'pittsburgh', 'pit'],
            abbrev: ['PIT']
        },
        {
            name: 'San Francisco 49ers',
            colors: ['#AA0000', '#B3995D'],
            nicknames: ['49ers', 'san francisco', 'sf'],
            abbrev: ['SF']
        },
        {
            name: 'Seattle Seahawks',
            colors: ['#002244', '#69BE28', '#A5ACAF'],
            nicknames: ['seahawks', 'seattle', 'sea'],
            abbrev: ['SEA']
        },
        {
            name: 'Tampa Bay Buccaneers',
            colors: ['#D50A0A', '#34302B', '#FF7900', '#B1BABF', '#FFFFFF'],
            nicknames: ['buccaneers', 'tampa bay', 'tb'],
            abbrev: ['TB']
        },
        {
            name: 'Tennessee Titans',
            colors: ['#0C2340', '#4B92DB', '#C8102E', '#B3995D'],
            nicknames: ['titans', 'tennessee', 'ten'],
            abbrev: ['TEN']
        },
        {
            name: 'Washington Commanders',
            colors: ['#773141', '#FFB612', '#FFFFFF'],
            nicknames:
                ['cmdrs',
                    'washington',
                    'wash cmdrs',
                    'was cmndrs',
                    'was',
                    'wash commanders'],
            abbrev: ['WAS']
        }]
}

export default teamList
