# Admin Dashboard Setup Instructions

## Step 1: Install Dependencies

First, install the required package for password hashing:

```bash
npm install bcryptjs
```

## Step 2: Setup Database Schema

Run the `schema.sql` file in your Supabase SQL Editor. This will create:
- `users` table for student registrations
- `admins` table for admin authentication

## Step 3: Generate Admin Password Hash

The default admin credentials are:
- **Username:** `admin`
- **Password:** `admin123`

However, you need to generate a proper bcrypt hash for the password. You can do this by:

### Option 1: Using Node.js (Recommended)

Create a temporary file `generate-password.js`:

```javascript
const bcrypt = require('bcryptjs');

async function generateHash() {
  const password = 'admin123'; // Change this to your desired password
  const hash = await bcrypt.hash(password, 10);
  console.log('Password hash:', hash);
  console.log('\nSQL to update admin password:');
  console.log(`UPDATE admins SET password_hash = '${hash}' WHERE username = 'admin';`);
}

generateHash();
```

Run it:
```bash
node generate-password.js
```

Then run the SQL output in Supabase to update the password.

### Option 2: Online Tool

1. Go to https://bcrypt-generator.com/
2. Enter your password (e.g., `admin123`)
3. Set rounds to 10
4. Copy the generated hash
5. Run this SQL in Supabase:
```sql
UPDATE admins SET password_hash = 'YOUR_GENERATED_HASH_HERE' WHERE username = 'admin';
```

## Step 4: Access Admin Dashboard

1. Navigate to: `http://localhost:3000/admin/login` (or your domain)
2. Login with:
   - Username: `admin`
   - Password: `admin123` (or the password you set)

## Step 5: Change Default Password (Important!)

After first login, you should change the default password:

1. Go to Supabase SQL Editor
2. Generate a new hash for your desired password (using steps in Step 3)
3. Run:
```sql
UPDATE admins SET password_hash = 'YOUR_NEW_HASH_HERE' WHERE username = 'admin';
```

## Admin Dashboard Features

Once logged in, you can:
- ✅ View all registered users
- ✅ Edit user information (name, email, mobile, language, course)
- ✅ Delete users
- ✅ Paginate through users (20 per page)

## API Endpoints

All user management endpoints require admin authentication:

- `GET /api/users` - Get all users (paginated)
- `GET /api/users/[id]` - Get single user
- `PUT /api/users/[id]` - Update user
- `DELETE /api/users/[id]` - Delete user
- `POST /api/admin/login` - Admin login
- `POST /api/admin/logout` - Admin logout

## Security Notes

- Admin authentication uses httpOnly cookies for security
- All API routes check for valid admin token before processing
- Password hashing uses bcryptjs (bcrypt algorithm)
- Sessions last 7 days (can be adjusted in login route)


