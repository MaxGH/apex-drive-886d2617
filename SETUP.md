# HYROXPRO Setup Guide

## 🚀 Quick Start

### 1. Supabase Project Setup

1. Go to [supabase.com](https://supabase.com) and create a new project
2. Wait for the project to finish setting up (this takes a few minutes)

### 2. Database Schema Setup

1. In your Supabase project, go to the **SQL Editor**
2. Create a new query
3. Copy and paste the entire contents of `supabase-schema.sql` from this project
4. Click **Run** to execute the schema
5. Verify tables were created in the **Table Editor**

### 3. Get Your Supabase Credentials

1. In your Supabase project, go to **Settings** → **API**
2. Find your **Project URL** and **anon public** key
3. Copy these values - you'll need them in the next step

### 4. Configure Environment Variables

1. Open the `.env.local` file in the project root
2. Replace the placeholder values with your actual Supabase credentials:

```env
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

### 5. Install Dependencies & Run

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

The app should now be running at `http://localhost:5173`

## 🔐 Creating Your First Admin User

By default, all new users are created with the "user" role. To make yourself an admin:

1. Sign up through the app
2. Go to your Supabase project → **Table Editor**
3. Open the `user_roles` table
4. Find your user entry
5. Change the `role` from `'user'` to `'admin'`
6. Refresh the app

You should now have access to the Admin Workouts page!

## 📦 Seeding Initial Workout Data

After creating your first admin user:

1. Log in to the app
2. Go to the Admin Workouts page (`/admin`)
3. Look for the "Seed Sample Workouts" button (if implemented)
4. OR manually create workouts using the "Create Workout" button

## 🧪 Testing the Auth Flow

1. **Sign Up**: Create a new account with email/password
2. **Sign In**: Log in with your credentials
3. **Protected Routes**: Try accessing `/` and `/admin` - you should be redirected to login if not authenticated
4. **Sign Out**: Use the sign out button in the top navigation

## 📝 Next Steps

After auth is working:

1. **Create a Race Goal**: Set up your first race/competition goal
2. **Generate Schedule**: The system will auto-generate your training schedule
3. **View Calendar**: See your scheduled workouts in the training calendar
4. **Drag & Drop**: Reschedule workouts by dragging them to different days

## 🐛 Troubleshooting

**"Missing Supabase environment variables" error:**
- Make sure `.env.local` exists and has correct values
- Restart the dev server after changing `.env.local`

**Can't log in:**
- Check that the database schema was executed successfully
- Verify your email/password are correct
- Check the browser console for errors

**RLS (Row Level Security) errors:**
- Make sure all policies were created in the SQL schema
- Check that the user_roles trigger is working (new users should get a role automatically)

**Can't access Admin page:**
- Verify your user has `role = 'admin'` in the `user_roles` table
- Try logging out and back in after changing the role

## 📚 Tech Stack

- **Frontend**: React 18 + TypeScript + Vite
- **Backend**: Supabase (PostgreSQL + Auth + RLS)
- **UI**: Tailwind CSS + Shadcn/ui + Radix UI
- **State**: React Query + Context API
- **Forms**: React Hook Form + Zod
- **Drag & Drop**: @dnd-kit

## 🔗 Useful Links

- [Supabase Documentation](https://supabase.com/docs)
- [React Query Documentation](https://tanstack.com/query/latest)
- [Shadcn/ui Components](https://ui.shadcn.com/)
