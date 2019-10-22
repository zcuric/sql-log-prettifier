import chalk from 'chalk';
import sqlFormatter from 'sql-formatter';
import keywords from './keywords';
import { Options, OutputSettings, Settings } from 'types';

const defaultOptions: Options = {
  format: true,
  noColors: false,
  settings: {
    topLevelWords: {
      color: '#E53935',
      modifiers: ['bold'],
    },
    newLineWords: {
      color: '#6182B8',
      modifiers: ['bold'],
    },
    otherWords: {
      color: '#7C4DFF',
      modifiers: ['bold'],
    },
    strings: {
      color: '#945EB8',
      modifiers: [],
    },
    numbers: {
      color: '#91B859',
      modifiers: [],
    },
  },
};

const substitute = (
  word: string,
  { color, modifiers = [] }: OutputSettings
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
