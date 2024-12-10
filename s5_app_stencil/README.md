# Basic SvelteKit App Stencil

Includes steps from setting up with the SvelteKit CLI, adding in shadcn-svelte, and adding a basic navigation bar with a single additional page route.

## Setup with the CLI

`pnpx sv create <app-name>`
- typescript
- tailwindcss
- typography
- defaults for everything else

## Add shadcn-svelte and formatting

`pnpm dlx shadcn-svelte@next init`
- New York, Slate
`pnpm add postcss`

Then add styles from shadcn
- Copy the font Geist files in
- Add the typography, scrollbar and font styles to `app.css`
- Update `app.html` and `+layout.svelte` to have padding etc from shadcn

## Add Basic Nav Bar

- Create a new route
- Add a nav bar including that route to `+layout.svelte`
- Update the styling so text on a default page looks reasonable