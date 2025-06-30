# Vercel Deployment Guide for ApiFlexy

## Prerequisites

1. **Vercel Account**: Sign up at [vercel.com](https://vercel.com)
2. **Vercel CLI**: Install globally with `npm install -g vercel`
3. **Built Frontend**: The frontend should be pre-built (already done)

## Deployment Steps

### 1. Login to Vercel
```bash
vercel login
```
Follow the prompts to authenticate with your GitHub account.

### 2. Deploy to Production
```bash
vercel --prod
```

### 3. Configuration
- The project is configured with `vercel.json`
- Frontend build is in `frontend/build/`
- Backend API routes are handled by `backend/app.py`
- All API calls go to `/api/*` routes

## Project Structure for Vercel

```
apiflexy/
├── vercel.json                 # Vercel configuration
├── requirements.txt            # Python dependencies
├── frontend/
│   └── build/                 # Pre-built React app
└── backend/
    └── app.py                 # Flask API (serverless function)
```

## Environment Variables

Set these in Vercel dashboard:
- `FLASK_ENV=production`

## Custom Domain (Optional)

After deployment, you can add a custom domain in the Vercel dashboard.

## Troubleshooting

1. **Build Issues**: Ensure `frontend/build/` exists
2. **API Issues**: Check that `backend/app.py` is compatible with serverless
3. **Dependencies**: Verify `requirements.txt` has all needed packages

## Post-Deployment

1. Test all API endpoints
2. Verify frontend loads correctly
3. Check that database operations work (if using external DB)
4. Update README.md with the live demo link 