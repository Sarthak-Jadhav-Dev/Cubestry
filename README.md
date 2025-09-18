# Cubestry

Cubestry is the official repository of the Cubestry Service: a web application built with **Next.js** + **TypeScript**. It provides server-side rendering, routing, and full frontend functionality.  

---

## Table of Contents

- [Features](#features)  
- [Tech Stack](#tech-stack)  
- [Prerequisites](#prerequisites)  
- [Installation](#installation)  
- [Usage & Development](#usage--development)  
- [Project Structure](#project-structure)  
- [Deployment](#deployment)  
- [Configuration](#configuration)  
- [Contributing](#contributing)  
- [License](#license)  
- [Contact](#contact)  

---

## Features

Here are some of the things this project provides (or aims to provide):

- Built with **Next.js** using TypeScript for type safety.  
- CSS styling (or utility styles) for layout and design.  
- Optimization: using built-in tools such as `next/font` for font optimizations.  
- Hot-reload / live updates while developing.  
- Eslint configuration for code quality.  

You may want to list additional features like authentication, API endpoints, user dashboards, etc. if they exist.

---

## Tech Stack

- **Framework**: Next.js (React)  
- **Language**: TypeScript  
- **Styling**: CSS (or specific CSS framework if used)  
- **Linting/Formatting**: ESLint  
- **Configs**: `next.config.ts`, `tsconfig.json`, `postcss.config.mjs`, etc.  

---

## Prerequisites

Make sure you have these installed before running locally:

- Node.js (preferably a recent LTS version, e.g. 18.x or above)  
- npm, yarn, or pnpm (based on which package manager you prefer)  

---

## Installation

Clone the repo:

```bash
git clone https://github.com/Sarthak-Jadhav-Dev/Cubestry.git
cd Cubestry
```

Install dependencies:

```bash
npm install
# or
yarn
# or
pnpm install
```

---

## Usage & Development

To run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Then open `http://localhost:3000` in your browser. The page will auto-reload as you make edits (especially in files like `app/page.tsx`).

---

## Project Structure

Here’s a rough overview of how the project is organized:

```
Cubestry/
├── public/                # Static assets (images, fonts, etc.)
├── src/                   # Source code (components, pages, etc.)
├── .gitignore
├── package.json
├── tsconfig.json
├── next.config.ts
├── postcss.config.mjs
├── eslint.config.mjs
└── README.md
```

You can expand this to include more folders (for example, `components/`, `hooks/`, `utils/`, etc.) depending on your actual structure.

---

## Deployment

You can deploy this Next.js app via platforms such as Vercel, Netlify, or any Node.js capable hosting. If using Vercel (recommended), you can connect the GitHub repo and deploy directly.

Some notes:

- Make sure environment variables are configured (if any).  

Build command is typically:

```bash
npm run build
# or
yarn build
```

Start command is:

```bash
npm run start
# or
yarn start
```

---

## Configuration

If your project uses environment variables or custom settings, mention them here. For example:

| Variable | Description | Example |
|----------|-------------|---------|
| NEXT_PUBLIC_API_URL | The base URL for your backend API | https://api.cubestry.com |
| NODE_ENV | Environment (development, production) | development or production |

Include `.env.local` sample or `.env.example` if you maintain one.

---

## Contributing

Contributions are very welcome! Here’s how you can help:

1. Fork the repo  
2. Create your feature branch: `git checkout -b feature/YourFeature`  
3. Commit your changes: `git commit -m "Add some feature"`  
4. Push to the branch: `git push origin feature/YourFeature`  
5. Open a Pull Request describing your changes.

Please make sure your code follows existing linting rules and formats.


## Contact

If you have any questions or want to reach out:

- **Author**: Sarthak Jadhav  
- **GitHub**: [Sarthak-Jadhav-Dev](https://github.com/Sarthak-Jadhav-Dev)  
  

---

Thank you for using **Cubestry**!
