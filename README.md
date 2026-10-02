# Adlac Realty

A premium, responsive real-estate website for a Mumbai-focused property brand. It includes public discovery pages, property and agent profiles, account tools, and a MongoDB-backed operations API.

## Features

- Editorial home page, property search, Buy and Rent views, filters, sorting, comparison, and a neighbourhood map illustration.
- Property detail pages with photo gallery, saved homes, enquiry forms, and visit requests.
- Projects, agents, about, contact, insights, article, privacy, and terms pages.
- Email/password registration and sign-in, signed HTTP-only sessions, password reset, favourites, recently viewed homes, account dashboard, and listing submission wizard.
- Admin workspace for properties, owner submissions, enquiries, visits, and the demo agent directory.
- Responsive light, dark, and system themes; accessible controls; metadata, sitemap, robots rules, and structured data.
- MongoDB models and validated API routes for users, properties, favourites, inquiries, visits, submissions, newsletter subscribers, and password resets.

## Run locally

Requires Node.js 20.9 or newer.

```powershell
npm install
Copy-Item .env.example .env.local
npm run dev
```

Open <http://localhost:3000>. The public catalogue works without a database using the bundled sample inventory. For a clickable local portfolio preview, set `NEXT_PUBLIC_DEMO_MODE=true` in `.env.local` and restart the dev server. Demo-mode sign-in is available only in development:

| Role | Email | Password |
| --- | --- | --- |
| Admin preview | `admin@aldacrealty.com` | `AldacAdmin2026!` |
| Advisor preview | `advisor@aldacrealty.com` | `AldacAdvisor2026!` |

Demo accounts are browser-only and cannot access protected server records. Demo-created listings, submissions, and admin edits stay in that browser. Turn demo mode off for deployment.

## Environment

Copy `.env.example` to `.env.local` and configure:

| Variable | Required | Purpose |
| --- | --- | --- |
| `MONGODB_URI` | For persistent accounts and operations | MongoDB Atlas or another MongoDB connection string. |
| `AUTH_SECRET` | For server sign-in | Random secret of at least 32 characters; keep it private. |
| `NEXT_PUBLIC_SITE_URL` | In production | Canonical site origin and password-reset links. |
| `NEXT_PUBLIC_DEMO_MODE` | No | Set to `true` only for a development portfolio preview. |
| `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASSWORD`, `SMTP_FROM` | For password-reset email | SMTP transport used to deliver one-time reset links. |

Example secret generation:

```powershell
node -e "console.log(require('node:crypto').randomBytes(32).toString('base64url'))"
```

For production, configure MongoDB network access and credentials, set a new `AUTH_SECRET`, set the canonical HTTPS `NEXT_PUBLIC_SITE_URL`, and add working SMTP credentials. Create the first administrator by registering a normal account, then change that account's `role` to `ADMIN` in the `aldacusers` collection through a trusted database administration process. The public registration route only creates `USER` accounts.

## Deploy on Vercel

This app uses Next.js server routes, so deploy it as a Next.js application rather than a static export.

1. Push the project to a GitHub repository. Do not upload `.env.local` or any secrets.
2. In Vercel, choose **Add New → Project**, import the repository, and deploy with the detected Next.js settings.
3. In the Vercel project settings, add these Production environment variables:

   - `MONGODB_URI`: your MongoDB Atlas connection string.
   - `AUTH_SECRET`: a new random secret (generate one with the command above).
   - `NEXT_PUBLIC_SITE_URL`: the HTTPS domain you own and will connect to this project.
   - `NEXT_PUBLIC_DEMO_MODE`: `false`.
   - Add the `SMTP_*` variables if you want password-reset emails.

4. Configure Atlas network access for the app's deployment environment and use a database user with only the access this app needs. Do not use the browser demo accounts for production.
5. Redeploy after saving the environment variables. In Vercel **Settings → Domains**, add your purchased domain and copy the DNS records Vercel shows into your domain registrar. Wait for Vercel to verify it, then set `NEXT_PUBLIC_SITE_URL` to that exact HTTPS URL and redeploy.
6. Test registration, sign-in, property enquiries, and password reset on the live domain. Promote the first real admin account using the trusted database process described above.

The website name can be changed independently of the domain. The old `aldacrealty.com` address and demo email logins remain in this project until you own a replacement domain/email and deliberately update those credentials and settings.

## Scripts

```powershell
npm run dev       # Local development
npm run lint      # ESLint
npm run typecheck # TypeScript checks
npm run build     # Production build
npm start         # Serve the production build
```

## Main routes

| Route | Purpose |
| --- | --- |
| `/` | Brand home page and property discovery |
| `/properties` | Search, filter, sort, map, and compare homes |
| `/properties/[slug]` | Property details, inquiry, and visit scheduling |
| `/buy`, `/rent`, `/projects`, `/agents` | Browse by intent, projects, and advisors |
| `/contact`, `/about`, `/insights`, `/privacy`, `/terms` | Brand and editorial pages |
| `/login`, `/register`, `/forgot-password`, `/reset-password` | Account and recovery flows |
| `/dashboard`, `/saved`, `/recently-viewed`, `/inquiries`, `/visits` | Signed-in workspace |
| `/list-property`, `/compare`, `/calculator`, `/admin` | Owner intake, comparison, EMI estimate, and team workspace |

## Data and service notes

- The bundled catalogue and agent directory are editorial sample content. Database properties are merged into the public catalogue when MongoDB is configured.
- Accounts use bcrypt password hashes. Sessions are signed JWT cookies with `HttpOnly`, `SameSite=Lax`, and `Secure` in production. Password-reset tokens are stored as hashes and expire after 30 minutes.
- Favourites, inquiries, visits, property submissions, and newsletter subscriptions persist in MongoDB when configured. Browser demo mode keeps preview workflows local.
- SMTP is used for password reset. Newsletter subscriptions are stored, but this project does not include a campaign-sending provider.
- The map and neighbourhood panels are branded illustrations and do not reveal a property's exact address.
- Photography uses externally hosted Unsplash images. Replace sample content and confirm image licensing before a public launch.
- Property search and account APIs validate inputs on the server. Protected admin operations require an actual server-side `ADMIN` session; browser demo roles are not accepted by API routes.

## Project structure

```text
app/                 Next.js app shell, routes, metadata, and API handlers
components/          Shared site chrome and page experiences
components/pages/    Marketing, property, account, and workspace pages
data/demo.ts         Sample properties, projects, advisors, and locations
lib/                 MongoDB, session, and email helpers
models/              Mongoose schemas
types/               Shared TypeScript types
```
