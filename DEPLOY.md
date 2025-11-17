# Deployment Guide

## Deploy to Vercel

1. Push your code to GitHub
2. Go to https://vercel.com and import your repository
3. Vercel will auto-detect the Vite framework
4. Click Deploy

The application will be built using `npm run build` and served from the `dist` directory.

## Deploy to Render

1. Create a new Static Site on Render
2. Connect your GitHub repository
3. Build Command: `npm run build`
4. Publish Directory: `dist`
5. Click Create Static Site

## Backend Configuration

The application uses Google Apps Script as the backend. Make sure your Google Apps Script is deployed and the URL in `client/src/utils/api.ts` is correct.

Current backend URL:
https://script.google.com/macros/s/AKfycbwKUOtlARMRSHI3heT14t9PJwITDidg9BxU0W_erXTQ4iY-d6supxH9d_shUdXijf0W4w/exec
