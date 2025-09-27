# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Space Travelers' Hub is a React/Redux application that provides commercial and scientific space travel booking services using the SpaceX API. The application consists of three main sections: Rockets, Missions, and My Profile.

## Development Commands

```bash
# Install dependencies
npm install

# Start development server (runs on port 3000)
npm start

# Run tests
npm test

# Run specific test file
npm test -- src/__tests__/Rockets.test.js

# Build for production
npm build

# Lint JavaScript/JSX files
npx eslint .

# Lint CSS/SCSS files
npx stylelint "**/*.{css,scss}"
```

## Architecture

### Redux Store Structure
- **missionsReducer**: Manages missions data from SpaceX API (v3)
- **missionsSliceReducer**: Redux Toolkit slice for missions state
- **rocketsReducer**: Manages rockets data and reservations
- Store configuration uses Redux Toolkit with redux-logger middleware

### Routing
- `/` - Rockets page (default)
- `/missions` - Missions page
- `/my_profile` - User profile with reservations

### API Integration
- SpaceX API v3 is used (https://api.spacexdata.com/v3/)
- Missions endpoint: `/v3/missions`
- API calls are centralized in `src/redux/api.js`
- Data is filtered/transformed before storing in Redux

### Component Structure
- Main components in `src/components/`: Header, Missions, Rockets, Rocket, MyProfile
- Tests located in `src/__tests__/` and `src/redux/__tests__/`
- Bootstrap and React Bootstrap used for styling

## Linting Configuration
- ESLint with Airbnb config for JavaScript
- Stylelint for CSS/SCSS
- GitHub Actions runs linters on pull requests
- React JSX allowed in `.js` files
- `no-shadow` rule disabled
- JSX props spreading allowed