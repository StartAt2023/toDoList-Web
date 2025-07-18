# Backend Deploy Guide

## 1. Environment Variables
- Copy `.env.example` to `.env` and fill in MongoDB connection, JWT secret, etc.

## 2. Recommended Platforms
- Render.com (free/paid), Railway, Heroku, VPS, cloud server

## 3. Start Command
```
node ./bin/www
```
or
```
npm start
```

## 4. CORS
- By default, all origins are allowed. To restrict, configure `cors()` in `app.js`.

## 5. MongoDB
- Recommended: MongoDB Atlas. Ensure your database is accessible from the internet.

## 6. Port
- Default is 5000. Platforms like Render may assign a port automatically; use `process.env.PORT`.

## 7. Other
- For logging, monitoring, and auto-restart, consider using pm2. 