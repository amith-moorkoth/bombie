# Contributing to Bombie

Thanks for taking the time to look at the code.

## Dev loop

```bash
cp .env.example .env       # one-time
npm install
npm start                  # http://localhost:8080/
```

On Windows you can also use the [run.bat](run.bat) wrapper:

```bat
run.bat              :: install (if needed) + dev server
run.bat build        :: production bundle to dist/
run.bat test         :: jest
run.bat lint         :: eslint
run.bat analyze      :: bundle analyzer report
run.bat clean        :: nuke node_modules and dist
```

## Conventions

- **Formatting:** Prettier is the source of truth ([.prettierrc](.prettierrc)).
  Run `npm run format` or let the pre-commit hook do it.
- **Lint:** `npm run lint`. CI fails on warnings — keep the working tree clean
  before pushing.
- **Tests:** Co-locate under `__tests__/` next to the code. Jest config lives
  at [jest.config.js](jest.config.js). Coverage floor is enforced.
- **Imports:** Use the `src/...` alias from [jsconfig.json](jsconfig.json) and
  [config/webpack.common.js](config/webpack.common.js) rather than long
  relative paths.
- **Env vars:** Add to [.env.example](.env.example) and expose via
  `webpack.DefinePlugin` in [config/webpack.common.js](config/webpack.common.js).
  Never commit real values to `.env`.

## Architecture quick-reference

The builder state is a recursive JSON tree of nodes:

```ts
{ id: uuid, info: { tag, name, type, accept[] }, props: {...}, child: [...] }
```

- [src/Lib/Utils/json-handler.js](src/Lib/Utils/json-handler.js) — pure tree
  mutation helpers (`updater`, `remove`, `get`, `removeANDupdate`).
- [src/Lib/Utils/js-dom-controller.js](src/Lib/Utils/js-dom-controller.js) —
  nested object read/write by dot path.
- [src/Lib/ComponentGenerator/bombie-context.js](src/Lib/ComponentGenerator/bombie-context.js)
  — shared `[data, setdata, effect, seteffect]` tuple via Context API.
- [src/Lib/ComponentGenerator/Container/element-recursion.js](src/Lib/ComponentGenerator/Container/element-recursion.js)
  — renders the tree.
- [src/Lib/ComponentGenerator/Container/UI/](src/Lib/ComponentGenerator/Container/UI/)
  — one file per supported MUI component (TextField, Autocomplete, etc.).

## Adding a new draggable component

1. Add the type to [src/Lib/ComponentGenerator/Data/element-type.js](src/Lib/ComponentGenerator/Data/element-type.js).
2. Add the catalog entry to [src/Lib/ComponentGenerator/Data/elements.js](src/Lib/ComponentGenerator/Data/elements.js)
   (label, icon, default props, allowed `accept` children).
3. Create the UI under [src/Lib/ComponentGenerator/Container/UI/](src/Lib/ComponentGenerator/Container/UI/).
   Copy an existing one (e.g. `text-field.js`) and edit.
4. Wire it into [src/Lib/ComponentGenerator/Container/element-render.js](src/Lib/ComponentGenerator/Container/element-render.js).
5. Add a test under `__tests__/` covering the props panel.

## Commits and PRs

- One logical change per commit. Squash WIP commits before opening the PR.
- Reference the issue if there is one.
- Run `npm run lint && npm test && npm run build` before pushing — CI runs
  the same on PRs.

## Lockfiles

The repo has both `package-lock.json` and `yarn.lock` from earlier history.
Pick one (`npm` is what scripts assume) and delete the other to prevent drift.
