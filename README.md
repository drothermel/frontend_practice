# frontend_practice

Basically all of these will require a node.js setup and will benefit from using VSCode. (TODO: add info).

## TailwindCSS

### First Project: Basic Landing Page

From [this youtube video](https://www.youtube.com/watch?v=W-LDhPyv478), using:
- vite
- html
- (no javascript or frameworks)

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
