# Birthday Countdown App

A modern web application that creates personalized birthday countdown timers. Built with Next.js 14, TypeScript, Tailwind CSS, and Supabase.

## Features

- Multi-step form for creating birthday countdowns
- Real-time countdown display
- Responsive design for all devices
- Automatic celebration message when countdown reaches zero

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Database:** Supabase
- **Deployment:** Vercel

## Getting Started

1. Clone the repository:

```bash
git clone https://github.com/kuralayusha/birthday-gift-app.git
cd birthday-gift-app
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env.local` file in the root directory with your Supabase credentials:

```js
SUPABASE_URL = your_supabase_project_url;
SUPABASE_ANON_KEY = your_SUPABASE_ANON_KEY;
```

4. Set up the database schema:

- Create a new Supabase project
- Run the SQL commands from `schema.sql` in the SQL editor

5. Run the development server:

```bash
npm run dev
```

6. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```bash
birthday-gift-app/
├── app/ # Next.js app directory
│ ├── api/ # API routes
│ ├── countdown/ # Dynamic countdown pages
│ └── page.tsx # Home page
├── components/ # React components
│ ├── BirthdayForm.tsx # Form component
│ └── CountdownDisplay.tsx # Countdown component
└── public/ # Static files
```

## Contributing

Feel free to contribute to this project. Open an issue or submit a pull request.

## License

MIT License - feel free to use this project for your own purposes.
