# Val_beta web beta v.02

This branch is the content-first rebuild of [valbeta.fun](https://valbeta.fun).

## Local development

```bash
npm ci
npm run dev
```

Quality checks and a production static export:

```bash
npm run check
```

The generated static site is written to `out/`. Content lives in `content/` and uses MDX with YAML frontmatter. Existing `.md` files remain supported during migration; new content should use `.mdx`. Add a file to `content/ideas`, `content/explore`, or `content/observe`, then run `npm run validate:content`.

## Architecture

- `app/` — App Router routes and page composition
- `components/` — reusable visual components
- `content/` — version-controlled publishing source
- `lib/content/` — typed loading, parsing, and validation
- `public/` — static assets

The site intentionally has no database, API, or runtime application server. GitHub Actions builds the static export and ECS serves `out/` through a web server.
