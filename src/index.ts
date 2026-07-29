import { Ansis } from 'ansis';
import { format as formatSql } from 'sql-formatter';
import keywords from './keywords.js';
import type {
  Options,
  OutputSettings,
  Settings,
  SettingsKey,
} from './types.js';

export type { Options, OutputSettings, Settings, SettingsKey };

const defaultSettings: Required<Settings> = {
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
    color: '#FFFFFF',
  },
  numbers: {
    color: '#50fa7b',
  },
};

const defaultOptions: Required<Omit<Options, 'settings'>> = {
  format: true,
  noColors: false,
};

// Force truecolor: the prettified query is usually handed to a logger rather
// than written straight to a TTY, where auto-detection would strip the colors.
const ansis = new Ansis(3);

const substitute = (
  word: string,
  { color = '#FFFFFF', modifiers = [] }: OutputSettings = {}
) => {
  const style = modifiers.reduce<Ansis>(
    (styled, modifier) =>
      (styled as unknown as Record<string, Ansis | undefined>)[modifier] ??
      styled,
    ansis.hex(color)
  );
  return style(word);
};

const escapeRegExp = (value: string) =>
  value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

const colorKeywords = (query: string, settings: Required<Settings>) => {
  const pattern = (word: string) =>
    new RegExp(`\\b${escapeRegExp(word)}\\b`, 'gmi');

  for (const [key, words] of Object.entries(keywords)) {
    const wordSettings = settings[key as SettingsKey];
    for (const word of words) {
      // Replacer function so `$`-sequences in the styled output stay literal.
      query = query.replace(pattern(word), () => substitute(word, wordSettings));
    }
  }

  return query;
};

const valuePatterns: Record<'strings' | 'numbers', RegExp> = {
  strings: /('\w+')/gim,
  numbers: /(\s\b\d+\b)/gim,
};

const colorValues = (query: string, settings: Required<Settings>) => {
  for (const [key, regex] of Object.entries(valuePatterns)) {
    query = query.replace(regex, (match) =>
      substitute(match, settings[key as SettingsKey])
    );
  }

  return query;
};

export const prettify = (query: string, options: Options = {}): string => {
  const { format, noColors } = { ...defaultOptions, ...options };
  const settings: Required<Settings> = {
    ...defaultSettings,
    ...options.settings,
  };
  if (format) query = formatSql(query);
  if (noColors) return query;
  query = colorKeywords(query, settings);
  query = colorValues(query, settings);
  return query;
};

export default { prettify };
