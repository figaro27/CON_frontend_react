module.exports = [
	{
		label: 'dashboard',
		class: 'dashboard',
		icon: 'dashboard.png',
		path: ''
	},
	{
		label: 'buysell',
		class: 'buysell',
		icon: 'buysell.svg',
		base: 'buysell',
		sub_menus: [
			{
				label: 'BNX',
				path: '/buysell/bnx'
			},
			{
				label: 'Bitcoin',
				path: '/buysell/btc'
			},
			{
				label: 'Ethereum',
				path: '/buysell/eth'
			},
			{
				label: 'Litecoin',
				path: '/buysell/ltc'
			},
			{
				label: 'Bitcoin cash',
				path: '/buysell/bch'
			},
			{
				label: 'Ripple',
				path: '/buysell/xrp'
			}
		]
	},
	{
		label: 'reporting',
		class: 'report',
		icon: 'report.png',
		path: '/reporting'
	},
	{
		label: 'deposit',
		class: 'betal',
		icon: 'betal.png',
		path: '/invest'
	},
	{
		label: 'payout',
		class: 'betal',
		icon: 'invest.png',
		path: '/payout'
	},
	{
		label: 'konto',
		class: 'profil',
		icon: 'profil.png',
		path: '/updateprofile'
	}
];
