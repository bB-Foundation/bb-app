import countries from 'src/assets/data/countries';

export const data: {label: string; value: null | string}[] = [
  {label: 'No country', value: null},
  ...countries.map(c => ({label: c.name, value: c.id})),
];
