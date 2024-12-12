# Basic SvelteKit App Stencil

Includes steps from setting up with the SvelteKit CLI, adding in shadcn-svelte, and adding a basic navigation bar with a single additional page route.

## Quickstart

Streamlined steps to initialize a new app stencil to build from.

```bash
export APP_NAME=<app_name>
export BRANCH_NAME=<branch_name>

pnpx sv create $APP_NAME
cd $APP_NAME
pnpm dlx shadcn-svelte@next init
pnpm add postcss
cp -r ../s5_app_stencil/src .
cp -r ../s5_app_stencil/static .
ga .
gc -m "setup s5_app_stencil"
git push -u origin $BRANCH
```

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

## Final Result

![Screenshot 2024-12-10 at 3 59 31 PM](https://github.com/user-attachments/assets/404efa09-fb6b-45af-96c8-dd547bdda3ed)

![Screenshot 2024-12-10 at 3 59 17 PM](https://github.com/user-attachments/assets/30260642-85b6-48c4-bf57-57ac70537b65)
