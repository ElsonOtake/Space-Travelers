# Space Travelers' Hub - Heroku Deployment Guide

This guide will help you deploy the Space Travelers' Hub React application to Heroku using Express server instead of the deprecated create-react-app-buildpack.

## Prerequisites

- Node.js 18.x
- npm 9.x
- Heroku CLI installed
- Git repository

## Deployment Setup

### 1. Files Added for Heroku Deployment

The following files have been added/modified to support Heroku deployment:

- **server.js**: Express server to serve the React build
- **static.json**: Configuration for Heroku's static buildpack (alternative option)
- **package.json**: Updated with Express dependency and Heroku scripts

### 2. Package.json Changes

The following changes were made to package.json:

- Added `express` dependency for serving the React app
- Modified `start` script to run the Express server (`node server.js`)
- Added `dev` script for local development (`react-scripts start`)
- Added `heroku-postbuild` script to build the React app after deployment

### 3. Express Server Configuration

The `server.js` file:

- Serves static files from the `build` directory
- Handles client-side routing by serving `index.html` for all routes
- Includes basic security headers
- Uses the PORT environment variable provided by Heroku

## Deployment Steps

### Option 1: Using Express Server (Recommended)

1. **Login to Heroku**
   ```bash
   heroku login
   ```

2. **Create a Heroku App**
   ```bash
   heroku create your-app-name
   ```

3. **Set Buildpack to Node.js**
   ```bash
   heroku buildpacks:set heroku/nodejs
   ```

4. **Deploy the Application**
   ```bash
   git add .
   git commit -m "Add Heroku deployment configuration"
   git push heroku main
   ```

### Option 2: Using Static Buildpack (Alternative)

If you prefer to use Heroku's static buildpack:

1. **Set Buildpack to Static**
   ```bash
   heroku buildpacks:set https://github.com/heroku/heroku-buildpack-static
   ```

2. **Deploy the Application**
   ```bash
   git add .
   git commit -m "Add static buildpack configuration"
   git push heroku main
   ```

## Local Development

For local development, use the `dev` script instead of `start`:

```bash
npm run dev
```

This will run the React development server with hot reloading.

## Environment Variables

If your application uses environment variables, set them in Heroku:

```bash
heroku config:set REACT_APP_API_URL=your-api-url
```

## Viewing Your Application

After deployment, open your application:

```bash
heroku open
```

## Troubleshooting

### Common Issues

1. **Build Failures**
   - Check that all dependencies are in `dependencies` (not `devDependencies`)
   - Ensure Node.js and npm versions match those specified in `engines`

2. **App Not Loading**
   - Check Heroku logs: `heroku logs --tail`
   - Verify the `start` script is correctly configured

3. **Routing Issues**
   - The Express server handles client-side routing automatically
   - All routes will serve the React app's `index.html`

### Useful Commands

- View logs: `heroku logs --tail`
- Restart app: `heroku restart`
- Check app info: `heroku info`
- Open app in browser: `heroku open`

## Migration from create-react-app-buildpack

This setup replaces the deprecated `create-react-app-buildpack` with a standard Node.js buildpack and Express server. The key advantages:

- **Future-proof**: Uses actively maintained buildpacks
- **Flexible**: Easy to add API routes or middleware
- **Standard**: Follows common Node.js deployment patterns
- **Reliable**: Better error handling and logging

## Additional Notes

- The Express server includes basic security headers
- Static assets are cached appropriately
- The app supports client-side routing for React Router
- HTTPS is enforced in production (via static.json configuration)

For any issues or questions, refer to the Heroku documentation or check the application logs.