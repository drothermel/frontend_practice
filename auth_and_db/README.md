# Authentication + Using a DB

Followed the tutorial from Joy of Code exactly: [SvelteKit Authentication Using Cookies](https://joyofcode.xyz/sveltekit-authentication-using-cookies)

- [PR 1: Add Basic Auth Following Joy of Code](https://github.com/drothermel/frontend_practice/pull/16)
- [PR 2: Update UI Using Flowbite & DaisyUI](https://github.com/drothermel/frontend_practice/pull/18)

**Used:**
- [Prisma](https://www.prisma.io/): for DB, with local sqlite db
    - `pnpx prisma init --datasource-provider sqlite`
    - `pnpm add @prisma/client`
    - `pnpx prisma db push`: create the db after we define a seed file, see joy of code tutorial for more info
    - `pnpx prisma studio`: gui for updating and vieweing dbs
- [DaisyUI](https://daisyui.com/docs/colors/): for theme colors
    - `pnpm add -D daisyui@latest`
    - Added the plugin to `tailwind.config.ts`
    - Added selected theme to `app.html`
- [Svelte-Flowbite](https://flowbite-svelte.com/docs/forms/input-field): for login/registration components
    - `pnpm i -D flowbite-svelte flowbite`
    - Updated `tailwind.config.ts`

**Notes:**
- The toast for registration doesn't have the popup logic implemented
- If we use the flowbite components we can't do things like make them autofocus

## Current State

<img width="1370" alt="Screenshot 2024-12-22 at 7 42 07 PM" src="https://github.com/user-attachments/assets/f2184e6b-6033-4718-8078-4fdcbfe7add1" />

<img width="1368" alt="Screenshot 2024-12-22 at 7 41 49 PM" src="https://github.com/user-attachments/assets/c95f5c8f-de49-4c35-8702-0549fd9b952e" />

<img width="1365" alt="Screenshot 2024-12-22 at 7 42 30 PM" src="https://github.com/user-attachments/assets/22ff4847-7ce0-4f79-add6-1001e85f1156" />

<img width="1368" alt="Screenshot 2024-12-22 at 7 42 40 PM" src="https://github.com/user-attachments/assets/3e183c4c-e199-4ea0-a697-1112be255ef8" />

<img width="1374" alt="Screenshot 2024-12-22 at 7 42 48 PM" src="https://github.com/user-attachments/assets/fe474a43-ea2c-4fbd-ae5b-2dd6ca934fde" />

