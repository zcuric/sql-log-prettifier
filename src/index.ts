import chalk from 'chalk';
import sqlFormatter from 'sql-formatter';
import keywords from './keywords';
import { Options, OutputSettings, Settings } from 'types';

const defaultOptions: Options = {
  format: true,
  noColors: false,
  settings: {
    functions: {
      color: '#ff5555',
      modifiers: ['bold'],
    },
    keywords: {
      color: '#ff5555',
      modifiers: ['bold'],
    },
    operators: {
      color: '#91B859',
      modifiers: ['bold'],
    },
    strings: {
      color: '#FFFFF',
    },
    numbers: {
      color: '#50fa7b',
    },
  },
};

const substitute = (
  word: string,
  { color = '#FFFFFF', modifiers = [] }: OutputSettings
) => {
  // @ts-ignore
  chalk.customColor = chalk.hex(color);
  const chalkModifiers = ['customColor', ...modifiers].join('.');
  return chalk`{${chalkModifiers} ${word}}`;
};

const colorKeywords = (query: string, words: Object, settings: Settings) => {
  const pattern = (word: string) => new RegExp(`\\b${word}\\b`, 'gmi');

  Object.keys(words).forEach((key: string) => {
    words[key].forEach((word: string) => {
      query = query.replace(pattern(word), substitute(word, settings[key]));
    });
  });

  return query;
};

const colorValues = (query: string, settings: Settings) => {
  const regexes = {
    strings: /('\w+')/gim,
    numbers: /(\s\b\d+\b)/gim,
  };

  Object.keys(regexes).forEach((reg: string) => {
    query = query.replace(regexes[reg], substitute('$1', settings[reg]));
  });

  return query;
};

export const prettify = (query: string, options: Options) => {
  const { format, noColors } = { ...defaultOptions, ...options };
  const settings = { ...defaultOptions.settings, ...options.settings };
  if (format) query = sqlFormatter.format(query);
  if (noColors) return query;
  query = colorKeywords(query, keywords, settings);
  query = colorValues(query, settings);
  return query;
};
