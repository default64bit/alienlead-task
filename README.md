This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## To Run Project Locally

* First, clone this repo, then run the `npm i` to install dependencies

* Create a postgress database in Supabase, and run `prisma generate` command

* Then create *.env* file using *.env.example* and fill in the required fields

Lastly, run the development server:

```bash
npm run dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

For a live demo click [here](https://alienlead-task.vercel.app)

## Project Details

Project containts 4 api routes:
* `/api/get-leads-list` -> listing of submited leads for admin to view
* `/api/get-salesmen-list` -> listing of salesmen for admin to select
* `/api/assign-salesman-to-lead` -> to assign salesmen to any submited leads
* `/api/save-user-inquiry` -> for saving users leads

There is also a seeder link `/seeder` to dummy fill salesmen table

Project uses **Shadcn** and **Tailwind** for styling and components

Connection to database is handled by **Prisma** to a **Supabase** postgress database