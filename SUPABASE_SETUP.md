# Supabase Database Setup Instructions

## Step 1: Access Supabase SQL Editor

1. Go to your Supabase Dashboard: https://supabase.com/dashboard
2. Select your project
3. Navigate to **SQL Editor** in the left sidebar
4. Click **New Query**

## Step 2: Run the Schema SQL

Copy and paste the entire contents of `schema.sql` file into the SQL Editor and click **Run** (or press Ctrl/Cmd + Enter).

## Step 3: Verify the Table

1. Go to **Table Editor** in the left sidebar
2. You should see a `users` table with the following columns:
   - `id` (uuid, primary key)
   - `full_name` (text)
   - `mobile_number` (text)
   - `email` (text, unique)
   - `preferred_language` (text)
   - `applied_for` (text, nullable)
   - `created_at` (timestamptz)

## Alternative: Create Table via Table Editor (GUI)

If you prefer using the GUI:

1. Go to **Table Editor** → **New Table**
2. Name: `users`
3. Add the following columns:

| Column Name | Type | Default Value | Nullable | Unique |
|------------|------|---------------|----------|--------|
| id | uuid | gen_random_uuid() | No | Yes (Primary Key) |
| full_name | text | - | No | No |
| mobile_number | text | - | No | No |
| email | text | - | No | Yes |
| preferred_language | text | - | No | No |
| applied_for | text | - | Yes | No |
| created_at | timestamptz | now() | No | No |

4. Save the table

## Required Columns

Your project code expects these columns in the `users` table:

- **full_name** (required) - Student's full name
- **mobile_number** (required) - Mobile/phone number
- **email** (required, unique) - Email address
- **preferred_language** (required) - Language preference (English/Hindi/Other)
- **applied_for** (optional) - Course name (IoT Technology/Robotics Technology)
- **created_at** (auto-generated) - Registration timestamp

## Testing

After setting up the table, test the registration form on your website. It should now successfully save user registrations to the database.

## Troubleshooting

- If you get column errors, make sure the column names match exactly (use snake_case: `full_name`, not `fullName`)
- Make sure the table name is `users` (lowercase)
- Check that your Supabase environment variables are correctly set in `.env.local`

