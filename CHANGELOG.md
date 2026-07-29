# Changelog

All notable changes to this project are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.2.0] - 2026-07-29

### Added

- Dual ESM and CommonJS builds behind an `exports` map, each with its own type
  declarations.
- `typecheck` and `dev` npm scripts, and a `pre-commit` hook that runs lint,
  type check and tests.
- `Options`, `Settings`, `OutputSettings` and `SettingsKey` are exported from the
  package entry point.

### Changed

- **Breaking:** the package is now ESM-first (`"type": "module"`). CommonJS
  consumers keep working through the `require` export condition.
- **Breaking:** Node.js 20 or newer is required.
- Replaced the unmaintained `tsdx` with `tsup` for builds and `vitest` for tests.
- Upgraded `sql-formatter` from 2.x to 15.x.
- Replaced `chalk` with `ansis`. Chalk 5 is ESM-only and removed the tagged
  template syntax this package relied on; `ansis` keeps CommonJS working and has
  no dependencies.
- Upgraded TypeScript to 5.9, ESLint to 10 with flat config, and husky to 9.
- Compile target raised from ES5 to ES2022.
- Replaced the ambient `src/types` declaration file with a real module, and
  typed `Settings` as a keyed record instead of `Object`.

### Fixed

- Unknown style modifiers no longer throw; they are ignored instead.
- Keyword patterns are regex-escaped, so `NOW()` no longer compiles to a pattern
  containing a live capture group.
- `$`-sequences in styled output are no longer re-interpreted as replacement
  patterns.
- The default `strings` color was an invalid five-digit hex value (`#FFFFF`) and
  is now `#FFFFFF`.

### Security

- Resolved all reported advisories. Removing `tsdx` dropped the vulnerable
  transitive dependency tree, and `esbuild` is pinned to `^0.28.1` via
  `overrides` for [GHSA-g7r4-m6w7-qqqr](https://github.com/advisories/GHSA-g7r4-m6w7-qqqr).

## [0.1.2] - 2020-10-11

### Changed

- Updated dependencies.

## [0.1.1] - 2020-10-11

### Fixed

- Use `new chalk.Instance()` instead of the removed constructor call form.

## [0.1.0] - 2020-10-11

### Changed

- Reworked the settings structure and expanded the keyword list.

## [0.0.3] - 2020-10-10

### Fixed

- Give the `settings` argument a default value.

## [0.0.2] - 2020-10-10

### Fixed

- Force color level 3 so colors survive being written to a non-TTY.

## [0.0.1] - 2020-10-10

- Initial release.

[0.2.0]: https://github.com/zcuric/sql-log-prettifier/compare/v0.1.2...v0.2.0
[0.1.2]: https://github.com/zcuric/sql-log-prettifier/compare/v0.1.1...v0.1.2
[0.1.1]: https://github.com/zcuric/sql-log-prettifier/compare/v0.1.0...v0.1.1
[0.1.0]: https://github.com/zcuric/sql-log-prettifier/compare/v0.0.3...v0.1.0
[0.0.3]: https://github.com/zcuric/sql-log-prettifier/compare/v0.0.2...v0.0.3
[0.0.2]: https://github.com/zcuric/sql-log-prettifier/compare/v0.0.1...v0.0.2
[0.0.1]: https://github.com/zcuric/sql-log-prettifier/releases/tag/v0.0.1
