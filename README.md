# Course Provider & Events Platform - Hackathon Project

## Problem Statement

Create a comprehensive platform that serves as both a course provider and event management system, enabling users to discover, enroll in, and participate in educational courses and community events.

## Project Structure

```
event-platform/
├── next/                     # Next.js related files
├── app/                      # Main application directory
│   ├── (main)/               # Main routes
│   ├── (auth)/               # Authentication routes
│   └── api/                  # API routes
├── components/               # Reusable UI components
│   ├── ui/                   # ShadCN UI components
│   ├── events/               # Event-related components
│   └── courses/              # Course-related components
├── hooks/                    # Custom React hooks
├── lib/                      # Utility functions and libraries
├── node_modules/             # Project dependencies
├── public/                   # Static assets
├── src/                      # Additional source files
├── styles/                   # Global styles
│   └── globals.css           # Main stylesheet
├── .gitignore                # Git ignore rules
├── app.jsx                   # Main App component
├── components.json           # Component configuration
├── index.css                 # Entry CSS file
├── index.html                # HTML template
├── index.jsx                 # Entry point
├── next-env.d.ts             # Next.js TypeScript declarations
├── next.config.mjs           # Next.js configuration
├── package.json              # Project dependencies and scripts
├── package-lock.json         # Lock file for npm
├── pnpm-lock.yaml            # Lock file for pnpm
├── postcss.config.js         # PostCSS configuration
├── tailwind.config.js        # Tailwind CSS configuration
├── tsconfig.json             # TypeScript configuration
└── vite.config.js            # Vite configuration
```

## Key Features

1. **Course Management**
   - Browse and filter courses by category, difficulty, and rating
   - Course enrollment and progress tracking
   - Instructor dashboards

2. **Event Management**
   - Upcoming event listings
   - Event registration system
   - Calendar integration

3. **User System**
   - Authentication (login/signup)
   - User profiles
   - Personalized recommendations

4. **Admin Panel**
   - Content management
   - User management
   - Analytics dashboard

## Technology Stack

- **Frontend**: Next.js, React, Tailwind CSS
- **Backend**: Next.js API routes
- **Database**: (To be determined)
- **Authentication**: NextAuth.js
- **UI Components**: ShadCN UI
- **Build Tools**: Vite

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   # or
   pnpm install
   ```
3. Set up environment variables
4. Run the development server:
   ```bash
   npm run dev
   # or
   pnpm dev
   ```

## Contribution Guidelines

1. Fork the repository
2. Create a new branch for your feature
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

