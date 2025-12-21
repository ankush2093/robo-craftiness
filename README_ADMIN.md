# Admin Dashboard - Quick Start Guide

## ✅ What Has Been Created

### 1. Database Schema (`schema.sql`)
- `users` table - Stores student registrations
- `admins` table - Stores admin login credentials
- Default admin user created: `admin` / `admin123`

### 2. API Routes
- `POST /api/admin/login` - Admin login
- `POST /api/admin/logout` - Admin logout
- `GET /api/users` - Get all users (paginated, admin only)
- `GET /api/users/[id]` - Get single user (admin only)
- `PUT /api/users/[id]` - Update user (admin only)
- `DELETE /api/users/[id]` - Delete user (admin only)

### 3. Admin Pages
- `/admin/login` - Admin login page
- `/admin/dashboard` - Admin dashboard (protected)

### 4. Components
- `AdminDashboard` - Main dashboard component with user management

## 🚀 Quick Setup

1. **Install Dependencies** (Already done!)
   ```bash
   npm install bcryptjs
   ```

2. **Run Database Schema**
   - Go to Supabase Dashboard → SQL Editor
   - Copy and paste contents of `schema.sql`
   - Click "Run"

3. **Access Admin Dashboard**
   - Navigate to: `http://localhost:3000/admin/login`
   - Login with:
     - Username: `admin`
     - Password: `admin123`

## 📋 Features

### Admin Dashboard Features:
- ✅ View all registered users in a table
- ✅ Edit user information (inline editing)
- ✅ Delete users with confirmation
- ✅ Pagination (20 users per page)
- ✅ View total user count
- ✅ Logout functionality

### User Information Displayed:
- Full Name
- Email
- Mobile Number
- Preferred Language
- Applied For (Course)
- Registration Date

## 🔒 Security

- Admin authentication required for all user management operations
- Password hashing using bcryptjs
- HttpOnly cookies for session management
- All API routes verify admin token before processing

## 📝 Important Notes

1. **Change Default Password**: After first login, change the default admin password in Supabase:
   ```sql
   -- Generate new hash using: node -e "const bcrypt = require('bcryptjs'); bcrypt.hash('YOUR_NEW_PASSWORD', 10).then(hash => console.log(hash));"
   UPDATE admins SET password_hash = 'YOUR_NEW_HASH' WHERE username = 'admin';
   ```

2. **Database Requirements**: Make sure you've run the `schema.sql` in Supabase before trying to login.

3. **Environment Variables**: Ensure your `.env.local` has:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `SUPABASE_SERVICE_ROLE_KEY`

## 🛠️ Troubleshooting

- **Login fails**: Check if `admins` table exists and has the admin user
- **Can't see users**: Verify `users` table exists and has correct column names
- **Authentication errors**: Check browser cookies are enabled
- **API errors**: Check Supabase environment variables are set correctly

## 📚 Files Created

```
app/
  ├── api/
  │   ├── admin/
  │   │   ├── login/route.js
  │   │   └── logout/route.js
  │   └── users/
  │       ├── route.js (GET all users)
  │       └── [id]/route.js (GET, PUT, DELETE single user)
  ├── admin/
  │   ├── login/page.js
  │   └── dashboard/page.js
  └── components/
      └── dashboard/
          └── AdminDashboard.js

lib/
  ├── auth.js (Authentication utilities)
  └── password.js (Password hashing utilities)

schema.sql (Database schema)
ADMIN_SETUP.md (Detailed setup instructions)
```

Happy managing! 🎉

