# Server Setup Instructions

## Environment Variables Setup

This application uses environment variables to keep sensitive information secure. Follow these steps to set up your local environment:

### 1. Create your `.env` file

A `.env` file already exists in the server directory. Make sure it contains all the necessary environment variables:

```bash
# Database
MONGODB_URI=your_mongodb_connection_string

# Stripe
STRIPE_PAYMENT_INTENT_SECRET=your_stripe_secret_key

# Google OAuth
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GOOGLE_CALLBACK_URL=http://localhost:3001/auth/google/callback

# Session
SESSION_SECRET=your_random_session_secret

# Twilio
TWILIO_ACCOUNT_SID=your_twilio_account_sid
TWILIO_AUTH_TOKEN=your_twilio_auth_token

# JWT
JWT_SECRET=your_jwt_secret

# Server
PORT=3001
```

### 2. Important Security Notes

- ⚠️ **NEVER** commit your `.env` file to Git
- The `.env` file is already in `.gitignore` to prevent accidental commits
- Use `.env.example` as a template for other developers
- Rotate your secrets regularly, especially if they were previously exposed

### 3. For Production Deployment

When deploying to a production environment (Heroku, Vercel, AWS, etc.), set these environment variables in your hosting platform's dashboard or CLI.

### 4. Previous Secret Exposure

**Important:** The following secrets were previously committed to the repository and should be rotated:
- Stripe API key
- Twilio credentials
- MongoDB connection string
- Session secret

Please:
1. Generate new credentials from respective service dashboards
2. Update your `.env` file with the new credentials
3. Update production environment variables if applicable

### 5. Running the Server

After setting up your `.env` file:

```bash
npm install
npm run dev
```

The server will start on the port specified in your `.env` file (default: 3001).
