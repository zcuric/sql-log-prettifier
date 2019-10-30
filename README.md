# SQL log prettifier

SQL query prettifier for your favorite logger

### Usage 

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
<img
  src="blob:https://carbon.now.sh/2cab0d4c-ed13-4835-9261-171c049bd637"
  style="transform:scale(0.7); width:1024px; height:473px; border:0; overflow:hidden;"
  sandbox="allow-scripts allow-same-origin">
</img>

### TODO: 
- Add examples for popular loggers (`pino`, `winston`)
- Polish 
- Anything else that needs to be done :construction_worker:
