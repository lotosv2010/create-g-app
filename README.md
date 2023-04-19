# create-g-app

Create apps with one command

## Scaffolding Your First Project

> **Compatibility Note:**
> Project requires [Node.js](https://nodejs.org/en/) version 14.18+, 16+. However, some templates require a higher Node.js version to work, please upgrade if your package manager warns about it.

With NPM:

```bash
npm create g-app
```

With Yarn:

```bash
yarn create g-app
```

With PNPM:

```bash
pnpm create g-app
```

Then follow the prompts!

You can also directly specify the project name and the template you want to use via additional command line options. For example, to scaffold a Vite project, run:

```bash
# npm 6.x
npm create g-app my-vue-app --template vite

# npm 7+, extra double-dash is needed:
npm create g-app my-vue-app -- --template vite

# yarn
yarn create g-app my-vue-app --template vite

# pnpm
pnpm create g-app my-vue-app --template vite
```

Currently supported template presets include:

- `vite`
- `react`
- `react-ts`
- `next`
- `remix`
- `gatsby`
- `expo`
- `admin-vue`
- `admin-react`
- `mobile-vue`
