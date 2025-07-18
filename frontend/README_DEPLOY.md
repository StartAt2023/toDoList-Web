# Frontend Deploy Guide (Vercel)

## 1. Environment Variables
- Edit `.env` and set `REACT_APP_API_BASE` to your backend's online address.

## 2. Push to GitHub/GitLab
- It is recommended to keep the `frontend` directory as a separate repository or subdirectory.

## 3. Vercel Configuration
- Root Directory: `frontend`
- Build Command: `npm run build`
- Output Directory: `build`
- Optional: `vercel.json` for API proxy support

## 4. Custom Domain (Optional)

## 5. Common Issues
- CORS: Backend must allow frontend domain in CORS settings.
- API Path: All axios requests should use `REACT_APP_API_BASE`. 