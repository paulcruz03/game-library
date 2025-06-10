# Game Library

A web application that allows users to track and compile video games across different platforms.			

Sharing this for those who want to upskill also. Setup:
1. Install NPM. Checkout their [installation guide](https://nodejs.org/en/download/current)
2. Clone this project
3. Install the packages
- You could use this for package update
```
npm i
```
4. Setup `.env` file for the Google's Gemini Key
```
NEXT_PUBLIC_SUPABASE_URL=<SUPABASE URL>
NEXT_PUBLIC_SUPABASE_ANON_KEY=<SUPABASE KEY>
NEXT_PUBLIC_RAWG_API=https://api.rawg.io/api
NEXT_PUBLIC_RAWG_API_KEY=<RAWG API KEY>
REVALIDATE_KEY=<YOUR GENERATED REVALIDATE KEY>
NEXT_PUBLIC_SITE_URL=http://localhost:3000/
```
5. Run the app
```
npm run dev
```

### To do
- AI Game suggestion base on answered question for the user