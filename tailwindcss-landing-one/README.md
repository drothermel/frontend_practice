# Basic Tailwindcss Landing Page

**Main focus:** reactive page layout & interactive components.

From [this youtube video](https://www.youtube.com/watch?v=W-LDhPyv478), using:
- vite
- html
- tailwindcss
(no javascript or frameworks)

**Final Result:**
![Screenshot 2024-11-14 at 10 25 39 PM](https://github.com/user-attachments/assets/cd3e480c-abfe-47cc-afcc-5f2525b0c290)

---

# Details

## Setup the Project
Setup the proj and install deps:
```
# Create the project, 'Vanilla', 'Javascript'
npm create vite@latest tailwindcss-landing-one
cd tailwindcss-landing-one

# Install deps and init project
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p

# Add the following to tailwind.config.js content section:
content: [ 
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
]

# Remove everything in style.css and then add tailwind directives
@tailwind base;
@tailwind components;
@tailwind utilities;

# Delete unneeded files
rm counter.js
rm main.js
rm index.html; touch index.html

# Then run the project!
npm run dev
```

## Update the UI with Tailwind

**Text Attributes:**
- Update text size and color: `<body class="text-sm text-[#3929ff]">`
- Make text reactive to window size: `<h2 class="text-2xl sm:text-4xl md:text-5xl lg:text-6xl">`

**Header Appearance:**
- Attach to top, control width: `<header class="sticky top-0 w-full max-w-[1000px]">`
- Set auto margins, specified padding: `<header class="... mx-auto p-4 sm:p-8">`

**Header Layout:**
- Setup flex (row) layout: `<header class="...flex items-center">`
- Setup content spacing: `<header class="... justify-between gap-4 sm:gap-8">`

**Button Format:**
- Location and shape: `<button class="px-6 py-3 rounded-full">`
- Color and text: `<button class="... bg-white font-medium">`
- Interaction (with custom style attributes, see <style>): `<button class="... lightShadow cursor-pointer blueShadow">`

**Main Layout:**
- Using flex (col) layout: `<main class="min-h-screen flex flex-col">`
- Use grid layout with reactive num cols: `<div class="grid grid-cols-1 sm:grid-cols-2">`
- - Setting a class to `min-h-screen`
    - *In Tailwind CSS, the min-h-screen class sets an element's minimum height to 100% of the viewport height (100vh). This ensures that the element occupies at least the full height of the browser window, regardless of its content. - ChatGPT + Search*
