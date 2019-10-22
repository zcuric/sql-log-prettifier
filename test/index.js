const { highlightWords } = require('../dist/index');
const { sqlQueryExample } = require('./fixtures');

console.log(highlightWords(sqlQueryExample));
