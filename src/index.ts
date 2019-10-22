import chalk from "chalk";
import sqlFormatter from "sql-formatter";
import keywords from './keywords';

type Options = {
  format: boolean,
  settings: {
    topLevelWords?: Object
    newLineWords?: Object
    otherWords?: Object
    strings?: Object
    numbers?: Object
  }
}

const defaultOptions:Options = {
  format: true,
  settings: {
    topLevelWords: {
      color: '#fcba03',
      modifiers: ['bold', 'italic', 'dim', 'bgBlue'],
    },
    newLineWords: {
      color: '#42b8ac',
      modifiers: ['bold'],
    },
    otherWords: {
      color: '#612d75',
      modifiers: ['bold'],
    },
    strings: {
      color: "#943934", 
      modifiers: []
    },
    numbers: {
      color: "#3ba86a",
      modifiers: []
    }
  }
}

const substitute = (word:string, { color, modifiers }:any = {}):string => {
  // @ts-ignore
  chalk.customColor = chalk.hex(color);
  const chalkModifiers = ['customColor', ...modifiers].join('.');
  return chalk`{${chalkModifiers} ${word}}`
};


const colorKeywords =(query:string, words:Object, settings:Options['settings']) => {
  const pattern = (word:string) => new RegExp(`\\b${word}\\b`, 'gmi');

  Object.keys(words).forEach((key:string) => {
    words[key].forEach((word:string) => {
      query = query.replace(pattern(word), substitute(word, settings[key]));
    })
  })

  return query;
}

const colorValues = (query:string, settings:Options['settings']) => {
  const regexes = {
    strings: /('\w+')/gmi,
    numbers: /(\s\b\d+\b)/gmi,
  };

  Object.keys(regexes).forEach((reg:string) => {
    query = query.replace(regexes[reg], substitute('$1', settings[reg]))
  });

  return query;
}

export const highlightWords = (query:string, options:Options = defaultOptions) => {
  const { format, settings } = options;
  if (format) query = sqlFormatter.format(query);
  query = colorKeywords(query, keywords, settings);
  query = colorValues(query, settings);
  return query;
};
