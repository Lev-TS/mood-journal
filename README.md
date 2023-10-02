# CLERK

The app uses `Clerk` for auth.

- Create account
- Add `.env.local` file
- Add the following variables to `.env.local`:

```Console
CLERK_SECRET_KEY=<your-private-key>
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=<your-public-key>
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/journal
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/new-user
```

# Database

## PlanetScale

I use `PlanetScale` MySQL cloud database.

- Create account
- Install CLI

```Console
brew install planetscale/tap/pscale
```

- authenticate CLI

```Console
pscale auth login
```

- switch to your organization

```Console
pscale org switch <your-org-name>
```

- create development branch on your database

```Console
pscale branch create <your-database-name> <dev-branch-name>
```

- connect to the branch locally. I used default MySQL port (3309) but you can set any port.

```Console
pscale connect <your-database-name> <your-branch-name> --port 3309
```

## Prisma

- Initiate Prisma

```Console
npx prisma init
```
