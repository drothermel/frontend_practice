import type { Config } from 'tailwindcss';
import typography from '@tailwindcss/typography';

const config: Config = {
  content: ["./src/**/*.{html,js,svelte,ts}"],
  plugins: [typography],
}

export default config;