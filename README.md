# Next Supa Shad Boilerplate 🌐

NextJS, Supabase, & ShadCN boilerplate to set-up your projects faster.

## About 🧑‍💻

This boilerplate helps you launch modern web apps faster with:

- Next.js for frontend routing and rendering
- Supabase for auth and database
- ShadCN/UI for beautifully styled components

I personally use this setup for all my full-stack projects.

## Features 🌟

- Authentication (login, signup)
- Route protection
- A myriad of pre-installed components
- Theming
- Dashboard layout (with sidebar)

## Tech Stack 🛠️

- [Next.js](https://nextjs.org/) – React Framework
- [Supabase](https://supabase.com/) – Auth & DB
- [ShadCN/UI](https://ui.shadcn.dev/) – UI Components
- [Tailwind CSS](https://tailwindcss.com/) – Utility-first CSS
- [TypeScript](https://www.typescriptlang.org/) – Typed JS

## Setup & Getting Started 🚀

1. Clone the repository

```bash
git clone https://github.com/your-repo/next-supa-shad-boilerplate.git
```

2. Install dependencies

```bash
npm install
```

3. Create a `.env.local` file and add your environment variables

```bash
cp .env.example .env.local
```

4. Create a Supabase project and add your environment variables in the `.env.local` file

```bash
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
```

5. Create a public `users` table in Supabase, make the user's `id` column have a fkey pointing to the `auth.users` table (not public). This links the auth user to the public user (please do this otherwise auth will not work).

6. Generate your Supabase types directly from the dashboard (https://supabase.com/dashboard/project/_/api?page=tables-intro) _or_ use the Supabase CLI:

```bash
npx supabase gen types typescript --project-id your-project-id > src/lib/supabase/types.ts
```

7. Run the development server

```bash
npm run dev
```
