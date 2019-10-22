const sqlQueryExample = `
  SELECT i.relname AS name, ix.indisprimary AS primary, ix.indisunique AS unique, ix.indkey AS indkey, array_agg(a.attnum) as column_indexes, array_agg(a.attname) AS column_names, pg_get_indexdef(ix.indexrelid) AS definition 
  FROM pg_class t, pg_class i, pg_index ix, pg_attribute a 
  WHERE t.oid = ix.indrelid AND i.oid = ix.indexrelid AND a.attrelid = 20 AND t.relkind = 'r' and t.relname = 'sequelize_meta' 
  GROUP BY i.relname, ix.indexrelid, ix.indisprimary, ix.indisunique, ix.indkey ORDER BY i.relname;
`;

module.exports = {
  sqlQueryExample
};
