import { prettify } from '../src';

const sampleQuery = `SELECT * FROM custom_table WHERE id = 1 AND name = 'Test'`;
const resultQuery = `SELECT
  *
FROM
  custom_table
WHERE
  id = 1
  AND name = 'Test'`;

describe('sql prettify', () => {
  it('should not format SQL', () => {
    const notFormatedQuery = prettify(sampleQuery, {
      format: false,
      noColors: true,
    });
    expect(notFormatedQuery).toEqual(sampleQuery);
  });

  it('should format SQL', () => {
    const formatedQuery = prettify(sampleQuery, {
      format: true,
      noColors: true,
    });
    expect(formatedQuery).toEqual(resultQuery);
  });

  it('should not color SQL', () => {
    const settings = {
      keywords: {
        color: '#FF0000',
      },
    };
    const coloredQuery = prettify(sampleQuery, { noColors: true, settings });
    expect(JSON.stringify(coloredQuery)).not.toContain('\\u001b[38;2;255;0;0m');
  });

  it('should color SQL', () => {
    const settings = {
      keywords: {
        color: '#FF0000',
      },
      numbers: {
        color: '#33cc33', // \u001b[38;2;51;204;51m
      },
    };
    const coloredQuery = prettify(sampleQuery, { settings });
    expect(JSON.stringify(coloredQuery)).toContain('\\u001b[38;2;255;0;0m');
    expect(JSON.stringify(coloredQuery)).toContain('\\u001b[38;2;51;204;51m');
  });

  it('should color SQL and add bold modifier', () => {
    const settings = {
      keywords: {
        color: '#FF0000', // \u001b[38;2;255;0;0m
        modifiers: ['bold'], // \u001b[1m
      },
    };
    const coloredQuery = prettify(sampleQuery, { settings });
    expect(JSON.stringify(coloredQuery)).toContain(
      '\\u001b[38;2;255;0;0m\\u001b[1m'
    );
  });
});
