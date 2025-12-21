# 🚀 Quick Setup Guide - Admin Dashboard

## ⚠️ IMPORTANT: First Step - Setup Database

आपको पहले Supabase में database schema run करना होगा!

### Step 1: Supabase में Schema Run करें

1. **Supabase Dashboard खोलें**: https://supabase.com/dashboard
2. **अपना project select करें**
3. **Left sidebar में "SQL Editor" पर click करें**
4. **"New Query" button पर click करें**
5. **`schema.sql` file को खोलें और उसका पूरा content copy करें**
6. **SQL Editor में paste करें**
7. **"Run" button दबाएं (या Ctrl/Cmd + Enter)**

### Step 2: Verify Tables Created

1. **Left sidebar में "Table Editor" पर click करें**
2. **आपको दो tables दिखनी चाहिए:**
   - ✅ `users` table
   - ✅ `admins` table

### Step 3: Verify Admin User

1. **`admins` table पर click करें**
2. **आपको एक row दिखनी चाहिए:**
   - username: `admin`
   - password_hash: (long hash string)
   - created_at: (timestamp)

### Step 4: Login करें

1. **Browser में जाएं**: `http://localhost:3000/admin/login`
2. **Login credentials:**
   - Username: `admin`
   - Password: `admin123`

## 🔧 Troubleshooting

### Error: 401 Unauthorized

**क्या करें:**
- ✅ Check करें कि आपने `schema.sql` Supabase में run किया है
- ✅ Verify करें कि `admins` table exists करती है
- ✅ Check करें कि admin user table में है

### Error: "admins table does not exist"

**Solution:**
```sql
-- Supabase SQL Editor में यह run करें:
CREATE TABLE IF NOT EXISTS admins (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    username TEXT NOT NULL UNIQUE,
    password_hash TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_admins_username ON admins(username);

INSERT INTO admins (username, password_hash)
VALUES ('admin', '$2a$10$pbG2.dpCC0Ze5UK4C7d8AO3wusOGbrnS37nNdpd9cWavtXdmuKE8O')
ON CONFLICT (username) DO NOTHING;
```

### Error: "Invalid username or password"

**Possible reasons:**
1. Admin user table में नहीं है - schema.sql run करें
2. Password गलत है - Default password `admin123` है
3. Username गलत है - Default username `admin` है

## 📋 Checklist

Before trying to login, make sure:

- [ ] Supabase project created
- [ ] Environment variables set in `.env.local`:
  - `NEXT_PUBLIC_SUPABASE_URL`
  - `SUPABASE_SERVICE_ROLE_KEY`
- [ ] `schema.sql` run in Supabase SQL Editor
- [ ] `admins` table exists in Supabase
- [ ] Admin user exists in `admins` table
- [ ] `npm install bcryptjs` done (already done ✅)

## 🎯 After Setup

Once everything is set up, you can:
- ✅ Login at `/admin/login`
- ✅ View all registered students
- ✅ See statistics (today, weekly, monthly, yearly)
- ✅ See course-wise enrollment
- ✅ Edit/Delete students

## 🔐 Security Note

**Important:** After first login, change the default password:

1. Generate new password hash:
```bash
node -e "const bcrypt = require('bcryptjs'); bcrypt.hash('YOUR_NEW_PASSWORD', 10).then(hash => console.log(hash));"
```

2. Update in Supabase SQL Editor:
```sql
UPDATE admins SET password_hash = 'YOUR_GENERATED_HASH' WHERE username = 'admin';
```

---

**Need Help?** Check `ADMIN_SETUP.md` for detailed instructions.

