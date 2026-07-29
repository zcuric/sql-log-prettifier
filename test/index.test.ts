import { describe, expect, it } from 'vitest';
import { prettify } from '../src/index.js';

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
        color: '#33cc33',
      },
    };
    const coloredQuery = prettify(sampleQuery, { settings });
    expect(JSON.stringify(coloredQuery)).toContain('\\u001b[38;2;255;0;0m');
    expect(JSON.stringify(coloredQuery)).toContain('\\u001b[38;2;51;204;51m');
  });

  it('should color SQL and add bold modifier', () => {
    const settings = {
      keywords: {
        color: '#FF0000',
        modifiers: ['bold'],
      },
    };
    const coloredQuery = prettify(sampleQuery, { settings });
    expect(JSON.stringify(coloredQuery)).toContain(
      '\\u001b[38;2;255;0;0m\\u001b[1m'
    );
  });

  it('should ignore unknown modifiers instead of throwing', () => {
    const coloredQuery = prettify(sampleQuery, {
      settings: { keywords: { color: '#FF0000', modifiers: ['nope'] } },
    });
    expect(JSON.stringify(coloredQuery)).toContain('\\u001b[38;2;255;0;0m');
  });
});
