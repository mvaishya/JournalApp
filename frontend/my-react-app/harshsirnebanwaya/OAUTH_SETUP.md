# OAuth Configuration for Docker

## Issue Fixed: Cross-Origin-Opener-Policy Error

The original issue was caused by browser security policies blocking OAuth popups when running in Docker containers. Here's what was fixed:

### Changes Made:

1. **Updated nginx.conf**: Added proper CORS headers and Cross-Origin-Opener-Policy settings
2. **Modified LoginPage.js**: Added fallback OAuth flow and better error handling
3. **Updated index.html**: Added security meta tags for OAuth
4. **Environment Variables**: Made Google Client ID configurable

### Google Console Configuration Required:

For OAuth to work properly, you need to configure your Google OAuth application:

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Navigate to "APIs & Credentials" > "Credentials"
3. Edit your OAuth 2.0 Client ID
4. Add these Authorized JavaScript origins:
   - `http://localhost:3000` (for development)
   - `http://localhost` (for Docker)
   - `http://localhost:80` (for Docker with explicit port)
   - Your production domain when deploying

5. Add these Authorized redirect URIs:
   - `http://localhost:3000` (for development)
   - `http://localhost` (for Docker)
   - `http://localhost:80` (for Docker with explicit port)
   - Your production domain when deploying

### Building and Running:

```bash
# Build the Docker image
docker build -t my-react-app .

# Run the container (mapping to port 3000)
docker run -p 3000:80 my-react-app

# Or run on port 80
docker run -p 80:80 my-react-app
```

### Testing:

1. Access your app at `http://localhost:3000` (or `http://localhost`)
2. Click "Sign in with Google (Secure)" - this uses the authorization code flow
3. If that fails, click "Sign in (Fallback)" - this uses the implicit flow
4. Check browser console for any remaining issues

### Security Notes:

- The auth-code flow is more secure but requires backend integration in production
- The implicit flow is less secure but works for client-side apps
- Never expose client secrets in frontend code (this is just for demo)
- In production, handle OAuth token exchange on your backend server

### Troubleshooting:

If you still see OAuth errors:
1. Check that your Google Console settings match your domain/port
2. Clear browser cache and cookies
3. Make sure you're accessing via the exact URL configured in Google Console
4. Check browser console for specific error messages
