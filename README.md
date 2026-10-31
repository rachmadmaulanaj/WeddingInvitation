# React Starter Kit

A modern, opinionated React + Vite + Tailwind CSS starter kit for rapid web development.

## Features

- ⚡️ Vite for fast development and build
- ⚛️ React 19 with functional components
- 🎨 Tailwind CSS v3 for utility-first styling
- 🔥 React Hot Toast for notifications
- 📅 Day.js for date utilities
- 🔗 React Router DOM v7 for routing
- 🛠️ ESLint for code linting
- 📦 Alias `@` to `src` for cleaner imports
- 🗂️ Organized folder structure (components, hooks, pages, services, utils)

## Getting Started

### 1. Clone the repository
```bash
git clone <repo-url> your-app
cd your-app
```

### 2. Install dependencies
```bash
pnpm install
# or
yarn install
# or
npm install
```

### 3. Start the development server
```bash
pnpm dev
# or
yarn dev
# or
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) to view the app.

## Project Structure

```
├── public/                # Static assets
├── src/
│   ├── App.jsx            # Main App component
│   ├── main.jsx           # Entry point
│   ├── assets/            # Images, icons, etc
│   ├── components/        # Reusable components
│   ├── hooks/             # Custom React hooks
│   ├── pages/             # Page components (Home, Login, NotFound)
│   ├── services/          # API and service logic
│   ├── styles/            # Global styles (Tailwind)
│   └── utils/             # Utility functions
├── index.html
├── package.json
├── tailwind.config.js
├── vite.config.js
└── README.md
```

## API Service Example

Axios instance is set up in `src/services/api.js`:
```js
import api from '@/services/api';

// Example: GET users
const getUsers = async () => {
  const data = await api.get('/users');
  return data;
};
```

## Customization
- Update `tailwind.config.js` and `postcss.config.js` for styling needs.
- Set your API base URL in `.env` as `VITE_API_BASE_URL`.
- Add more pages/components as needed.

## Linting
```bash
pnpm lint
```

## Build
```bash
pnpm build
```

## License
MIT
