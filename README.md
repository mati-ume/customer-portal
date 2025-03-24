# Next Supa Shad Boilerplate 🌐

NextJS, Supabase, & ShadCN boilerplate to set-up your projects faster.

## About 🧑‍💻

This project is a boilerplate for NextJS, Supabase, and ShadCN. It is designed to help you get started with your projects faster. I use this boilerplate for all my projects.

## Features 🌟

- Supabase Auth (login & signup)
- Protected routes (with supabase auth in middleware)
- Dashboard layout

## Getting Started 🚀

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

4. Create a supabase project and add your environment variables in the `.env.local` file

```bash
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
```

5. Generate your supabase types (https://supabase.com/dashboard/project/_/api?page=tables-intro) and set them up in the `src/lib/supabase/types.ts` file

6. Run the development server

```bash
npm run dev
```
