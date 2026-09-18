# Deployment

The site is a static Next.js export. GitHub Actions builds `out/`, validates the required routes, uploads the result to a release directory, and atomically switches the `current` symlink.

## ECS layout

```text
/var/www/web-beta/
  releases/
    <commit-sha>/
  current -> /var/www/web-beta/releases/<commit-sha>
```

Configure Nginx to serve `/var/www/web-beta/current`. The deploy user must be able to create directories and update the `current` symlink under `/var/www/web-beta`.

The test Nginx server listens on port `8080`, so the test URL is `http://<ECS-public-IP>:8080/`.

## Required GitHub secrets

- `SSH_HOST`
- `SSH_USER`
- `SSH_PRIVATE_KEY`

The workflow connects on port `22222`; change the workflow if the ECS SSH port differs.

## Rollback

List releases on the server, then point `current` at a known-good release:

```bash
cd /var/www/web-beta
ln -sfn releases/<known-good-sha> current.new
mv -Tf current.new current
```

The deploy workflow keeps the five newest release directories.

## Security headers

Apply the headers in `deploy/nginx.conf.example` at the site server. Because this project uses `output: "export"`, Next.js cannot attach runtime headers itself after export.

## Local verification

```bash
npm ci
npm run check
```

The check command runs linting, TypeScript, content validation, the production build, and static export validation.
