const today = new Date();
const year = today.getFullYear();

const format = (date) => date.toISOString().split('T')[0];
const subDays = (days) => {
  const d = new Date(today);
  d.setDate(today.getDate() - days);
  return d;
};
const addDays = (days) => {
  const d = new Date(today);
  d.setDate(today.getDate() + days);
  return d;
};

export const discoverConfigs = {
  'this-week': {
    title: 'New & Trending This Week',
    description:
      'Discover the hottest new releases and trending titles from the last 7 days.',
    params: {
      dates: `${format(subDays(7))},${format(today)}`,
      ordering: '-added',
    },
  },

  'last-30-days': {
    title: 'Last 30 Days',
    description:
      "See what's been dominating the charts in the past month.",
    params: {
      dates: `${format(subDays(30))},${format(today)}`,
      ordering: '-added',
    },
  },
  'next-week': {
    title: 'Coming Next Week',
    params: {
      dates: `${format(addDays(1))},${format(addDays(7))}`,
      ordering: '-added', // or '-released' if you prefer by date
    },
  },

  'top-rated': {
    title: 'Top Rated Games',
    description:
      'The highest-rated games across all time — critically acclaimed and fan favorites.',
    params: {
      ordering: '-rating',
    },
  },

  'best-of-the-year': {
    title: `Best of ${year}`,
    description: `The best and highest-rated games released in ${year}.`,
    params: {
      dates: `${year}-01-01,${year}-12-31`,
      ordering: '-metacritic',
    },
  },

  'popular-in-current-year': {
    title: `Popular in ${year}`,
    description: `The most popular and most-added games of ${year}.`,
    params: {
      dates: `${year}-01-01,${year}-12-31`,
      ordering: '-added',
    },
  },

  'all-time-top': {
    title: 'All-Time Top Games',
    description:
      'Legendary titles that stood the test of time — the best of the best.',
    params: {
      ordering: '-metacritic',
    },
  },

  // New additions for richer discovery experience
  'most-anticipated': {
    title: 'Most Anticipated Upcoming Games',
    description:
      'Upcoming titles the gaming community is most excited about.',
    params: {
      dates: `${format(today)},${year + 1}-12-31`,
      ordering: '-added',
    },
  },

  'new-releases': {
    title: 'New Releases',
    description: 'Freshly launched games that just hit the market.',
    params: {
      dates: `${format(subDays(30))},${format(today)}`,
      ordering: '-released',
    },
  },

  'highest-metacritic': {
    title: 'Critically Acclaimed',
    description:
      'Games that earned the highest Metacritic scores — critically unmatched.',
    params: {
      ordering: '-metacritic',
    },
  },

  'hidden-gems': {
    title: 'Hidden Gems',
    description:
      'Underrated games loved by players but missed by the mainstream.',
    params: {
      ordering: '-rating',
      metacritic: '70,85',
    },
  },

  'retro-classics': {
    title: 'Retro Classics',
    description:
      'Blast from the past — the most iconic titles from the early gaming era.',
    params: {
      dates: '1980-01-01,2000-12-31',
      ordering: '-added',
    },
  },
};
