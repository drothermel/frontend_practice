import type { Config } from 'tailwindcss';
import typography from '@tailwindcss/typography';
import daisyui from 'daisyui';

const config: Config = {
  content: ["./src/**/*.{html,js,svelte,ts}"],
  plugins: [typography, daisyui],
  daisyui: {
    themes: ["emerald"],
    darkTheme: "emerald",
    base: true, // Include DaisyUI's base styles
    styled: true, // Include DaisyUI's component styling
    utils: true, // Enable DaisyUI's utilities
    logs: false, // Show logs in the console
    rtl: false, // Support for right-to-left layouts
    prefix:"", // DaisyUI class name prefix (if needed)
  },
}

export default config;