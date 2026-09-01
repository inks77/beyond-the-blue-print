# beyond-the-blue-print

This is a [Next.js](https://nextjs.org) project bootstrapped with [v0](https://v0.app).

## Built with v0

This repository is linked to a [v0](https://v0.app) project. You can continue developing by visiting the link below -- start new chats to make changes, and v0 will push commits directly to this repo. Every merge to `main` will automatically deploy.

[Continue working on v0 →](https://v0.app/chat/projects/prj_qWGQ52CopORumxkqfDYgwITEvN2Z)

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

## Images

Every picture and video on the site is declared once in `lib/images.ts` -- the
image database. Components ask for it by id and never type a path:

```tsx
<SiteImage id="panel-dr-ian-clarke" className="h-auto w-full" sizes="33vw" />
```

The id is a TypeScript union, so a name that is not in the database will not
compile. To add a picture:

1. Put the file in `public/`.
2. Add an entry to `lib/images.ts` with its alt text and its real pixel size.
3. Render it with `<SiteImage id="..." />`.

`pnpm check:images` -- which `pnpm build` runs first, so it also guards every
Vercel deploy -- then checks the database against `public/` and **fails the
build** if an image is referenced but missing, or if the declared width and
height do not match the file. That is what stops a picture from shipping as a
broken frame: the deploy stops instead.

If the entry has to go in before the file does, mark it `status: 'pending'` and
say what is missing in `awaiting`. The build stays green, the page draws a
labelled placeholder at the right aspect ratio rather than a broken image, and
`check:images` prints the file that is still outstanding on every run -- then
tells you to flip the status the moment the file appears in `public/`.

**Currently pending:** `public/panel-dr-ian-clarke.jpg` (the Dr Ian Clarke stage
photograph, 1333x2000). Add the file and change that entry's `status` to
`'ready'` and the placeholder in the "Why we exist" section becomes the photo.

## Registration

Every "register / propose / partner / book / pitch / join" button on the site
opens `/register` with a capacity in the query string (`/register?as=speaker`),
so the form arrives with that capacity already chosen. The capacities, their
copy, and the `registerHref()` helper every button uses live in
`lib/registration.ts` -- add a way in there and the picker, the links, and the
confirmation copy all follow.

Submissions are handled by the server action in `app/register/actions.ts`. Set
one environment variable to say where they should go:

| Variable | Purpose |
| --- | --- |
| `REGISTRATION_WEBHOOK_URL` | Any endpoint that accepts a JSON `POST` -- a form service (Formspree, Basin), an automation (Zapier, Make), or a spreadsheet webhook. Each registration is delivered there as JSON. |

Set it in the Vercel project settings (Settings -> Environment Variables) and
redeploy. **With nothing set, the form still works and still accepts
registrations, but they are only written to the server log** (`vercel logs`)
rather than delivered anywhere -- so configure the variable before pointing
people at the form.

The delivered payload:

```json
{
  "receivedAt": "2026-01-01T00:00:00.000Z",
  "capacity": "speaker",
  "capacityTitle": "Take the stage",
  "name": "...",
  "email": "...",
  "phone": null,
  "organisation": null,
  "detail": "...",
  "wantsUpdates": true
}
```

If the endpoint is unreachable or returns an error, the visitor is told the
submission failed rather than shown a confirmation, and the full entry is
written to the server log so nothing is lost.

## Learn More

To learn more, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.
- [v0 Documentation](https://v0.app/docs) - learn about v0 and how to use it.
