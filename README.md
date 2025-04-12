# Slotter

A powerful template editor that helps you create and manage content with ease, using Figma designs as a foundation.

## Features

- Import Figma frames and convert them into editable templates
- Edit text and image content while preserving design layout
- Export templates as PNG images
- Share templates via unique URLs

## Prerequisites

- Node.js 18.0.0 or higher
- npm 7.0.0 or higher
- A Figma account and access token

## Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/slotter.git
   cd slotter
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   ```bash
   cp .env.example .env
   ```
   Then edit `.env` and add your Figma access token.

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:5173](http://localhost:5173) in your browser.

## Development

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier

## Deployment

The project is configured for deployment on Vercel. Simply:

1. Push your code to GitHub
2. Import the repository in Vercel
3. Configure environment variables
4. Deploy!

## Tech Stack

- React 18
- TypeScript
- Vite
- Tailwind CSS
- Shadcn UI
- Zustand
- React Router

## License

MIT