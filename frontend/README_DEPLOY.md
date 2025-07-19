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

### 5.1 CORS Issues
- Backend must allow frontend domain in CORS settings.

### 5.2 API Path Issues
- All axios requests should use `REACT_APP_API_BASE`.

### 5.3 404 Errors on Direct Route Access
**Problem**: When users directly access routes like `/main`, `/daily-memo`, etc., they get 404 errors.

**Solution**: 
- The `vercel.json` file is configured to redirect all requests to `index.html`
- The `_redirects` file in `public/` directory handles the same for other hosting platforms
- This allows React Router to handle client-side routing properly

**Files to check**:
- `vercel.json`: Contains rewrite rules for Vercel deployment
- `public/_redirects`: Contains redirect rules for other hosting platforms
- `src/App.tsx`: Contains all route definitions

## 6. Testing Routes
After deployment, test these scenarios:
1. Direct access to `/login` - should work
2. Direct access to `/main` - should work (not 404)
3. Direct access to `/daily-memo` - should work (not 404)
4. Clicking navigation links - should work
5. Browser refresh on any page - should work (not 404)

## 7. Troubleshooting
If you still get 404 errors:
1. Check that `vercel.json` is in the root of your frontend directory
2. Verify the rewrite rule points to `/index.html`
3. Clear browser cache and try again
4. Check Vercel deployment logs for any build errors 