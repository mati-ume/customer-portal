# Next Supa Shad Template 🌐

A modern, opinionated template for rapid web development.

## About 🧑‍💻

Are you a startup founder, developer, vibe coder, or hackathon participant looking to build a web app quickly? Want to skip the boilerplate and get right to building your app?

This template is for you!

This boilerplate helps you launch modern web apps faster with:

- Next.js for frontend routing and rendering
- Supabase for auth and database
- ShadCN/UI for beautifully styled components

And so much more!

## Features 🌟

- Authentication (login, signup)
- Route protection
- A myriad of pre-installed components (shadcn/ui)
- Built-in theming
- Dashboard layout (with sidebar)
- Unauthorized page with redirect to previous page pre-configured
- A 404 page
- Supabase email verification

If there's anything missing here that you think should be added, please open an issue!

## Tech Stack 🛠️

This tech stack is what I'm currently most comfortable with and what I've found to be the most useful. If I ever decide to change it, I'll make a new template.

- [Next.js](https://nextjs.org/) – React Framework
- [Supabase](https://supabase.com/) – Auth & DB
- [ShadCN/UI](https://ui.shadcn.dev/) – UI Components
- [Tailwind CSS](https://tailwindcss.com/) – Utility-first CSS
- [TypeScript](https://www.typescriptlang.org/) – Typed JS

## Setup & Getting Started 🚀

Note: Instead of cloning the repo, you can use this template by clicking the "Use this template" button above.

Cloning the repo works fine too, but you'll have to delete the `.git` folder and initialize a new one if you want to push to a new GitHub repo.

1. Clone the repository

```bash
git clone https://github.com/your-repo/next-supa-shad-boilerplate.git
```

2. Install dependencies

```bash
npm install --legacy-peer-deps
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

5. Create a public `users` table in Supabase, make the user's `id` column have a fkey pointing to the `auth.users` table (not public). This links the auth user to the public user (please do this otherwise auth will not work). You can create this by running the following SQL:

```psql
create table public.users (
  id uuid primary key,
  created_at timestamptz default now(),
  constraint fk_user_id foreign key (id) references auth.users(id) on delete cascade
);
```

6. Generate your Supabase types directly from the dashboard (https://supabase.com/dashboard/project/_/api?page=tables-intro) _or_ use the Supabase CLI:

```bash
npx supabase gen types typescript --project-id your-project-id > src/lib/supabase/types.ts
```

7. Run the development server

```bash
npm run dev
```
