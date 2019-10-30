# SQL log prettifier

SQL query prettifier for your favorite logger

## Usage 

```sh
npm install sql-log-prettifier
# or
yarn add sql-log-prettifier
```

In your project require or import `sql-log-prettifier`
```js
const { prettify } = require('sql-log-prettifier');
// import { prettify } from 'sql-log-prettifier';

const unformattedAndUglySql = `SELECT * FROM custom_table WHERE id = 1 AND name = 'Test'`;
console.log(prettify(unformattedAndUglySql));
```
Output will look something like this: 

<img src="./carbon.png"></img>

## Settings 

`prettify` function accepts `settings` as the second argument.

Default settings are: 
```js
const defaultSettings = {
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
```

### TODO: 
- Add examples for popular loggers (`pino`, `winston`)
- Update README.md 
- Anything else that needs to be done :construction_worker:


## Development

`sql-log-prettifer` is built with [`tsdx`](https://github.com/jaredpalmer/tsdx).

```
# Running examples
npm run start

# Running tests
npm run test

# Running build
npm run build
```

## Contributing

All contributions are welcome.

## License

MIT @ Zdravko Ćurić [(zcuric)](https://github.com/zcuric)