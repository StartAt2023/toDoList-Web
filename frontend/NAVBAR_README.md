# NavBar Component Usage and Logic

## Overview
The `NavBar` component is now fully self-contained and responsible for displaying the current user's information (such as the avatar initials) across all pages. You no longer need to pass the username or user-related props from each page. This ensures a consistent user experience and reduces code duplication.

## Key Features
- **Self-managed user info**: NavBar fetches the current user's profile on its own using the `/api/users/profile` endpoint.
- **Consistent avatar**: The avatar always displays the correct initials for the logged-in user, regardless of which page is rendered.
- **Fallback logic**: If the API call fails, NavBar will attempt to extract the username from the JWT token in localStorage. If that also fails, it defaults to 'User'.
- **Logout handling**: NavBar provides a default logout handler, but you can still pass a custom `onLogout` prop if needed.
- **No more userName prop**: All pages should simply import and use `<NavBar />` (optionally with `onLogout`), without passing any user info.

## How It Works
1. **User Info Fetching**
   - On mount, NavBar calls the `getUserProfile()` API.
   - If successful, it sets the username for avatar display.
   - If the API fails, it tries to decode the JWT token for the username.
   - If all else fails, it uses 'User' as a fallback.

2. **Avatar Initials**
   - The initials are computed from the first two English letters of the username (uppercased).
   - If the username is missing or invalid, 'U' is shown.

3. **Logout**
   - By default, NavBar clears the token and user info from localStorage and redirects to `/login`.
   - You can override this by passing an `onLogout` prop.

## Example Usage
```tsx
import NavBar from '../components/NavBar';

const MyPage = () => (
  <>
    <NavBar onLogout={() => {/* custom logout logic */}} />
    {/* ...rest of your page... */}
  </>
);
```

## Migration Guide
- **Remove all `userName` props** from NavBar usage in your pages.
- Do **not** fetch or manage user info in each page; let NavBar handle it.
- If you need to customize logout, pass an `onLogout` function; otherwise, the default will be used.

## Benefits
- **Consistency**: The avatar and user info are always correct and up-to-date.
- **Simplicity**: Pages are cleaner and easier to maintain.
- **Single source of truth**: All user info logic is centralized in NavBar.

## Troubleshooting
- If the avatar shows 'U' or 'US', check that the user is logged in and the `/api/users/profile` endpoint is working.
- Make sure the JWT secret is consistent across your backend.
- If you change the user info structure, update the logic in NavBar accordingly.

---

**Now, just use `<NavBar />` everywhere and enjoy a unified navigation experience!** 