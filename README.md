# Projects Hub

A small gallery of my projects with a search box and a tech filter. I built it to practice React with TypeScript.

Live: https://projects-hub-woad.vercel.app

## How it works

- The projects are a typed list in `frontend/src/data/projects.ts`.
- `App.tsx` filters that list by the search text and the selected tech.
- The tech dropdown is built from the data, so adding a project with a new tech adds a new option.
- Each project is shown with `ProjectCard.tsx`.

## Run it

```bash
cd frontend
npm install
npm run dev
```

`npm run build` type-checks and builds, `npm run lint` runs ESLint.

## Adding a project

Add an object to the list in `frontend/src/data/projects.ts`:

```ts
{
  id: "my-project",
  title: "My Project",
  description: "One sentence about it.",
  tech: ["React", "TypeScript"],
  repo: "https://github.com/...",
  live: "https://...", // optional
}
```

## Note

The repo started from a course starter template, which is why the `starter/` folder and the first commits are not mine. The React app in `frontend/` is.
