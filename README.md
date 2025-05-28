# MeetAI - AI-Powered Meeting Platform

![CodeRabbit Pull Request Reviews](https://img.shields.io/coderabbit/prs/github/lucaspedroabreu/meetai?utm_source=oss&utm_medium=github&utm_campaign=lucaspedroabreu%2Fmeetai&labelColor=171717&color=FF570A&link=https%3A%2F%2Fcoderabbit.ai&label=CodeRabbit+Reviews)
[![Next.js](https://img.shields.io/badge/Next.js-15-black?logo=next.js)](https://nextjs.org)
[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?logo=typescript)](https://www.typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-v4-38B2AC?logo=tailwind-css)](https://tailwindcss.com)

MeetAI is a next-generation video conferencing platform that integrates AI assistants directly into your meetings. Schedule calls with customizable AI personas and receive comprehensive meeting artifacts including summaries, transcripts, and actionable insights.

## ✨ Key Features

### 🤖 Core Meeting Experience

- **AI-powered video calls** - Real-time AI assistants participate in your meetings
- **Custom real-time agents** - Configure AI personas tailored to your meeting needs
- **Stream Video SDK** - Enterprise-grade video infrastructure
- **Stream Chat SDK** - Integrated chat functionality during meetings

### 📝 Meeting Intelligence

- **Summaries, transcripts, recordings** - Automatic documentation of every meeting
- **Meeting history & statuses** - Track all your past and upcoming meetings
- **Transcript search** - Find any conversation across all your meetings
- **Video playback** - Review recordings with synchronized transcripts
- **AI meeting Q&A** - Ask questions about past meetings and get instant answers

### 🛠 Technical Stack

- **OpenAI integration** - Powers the AI assistants and meeting intelligence
- **Polar subscriptions** - Seamless payment processing
- **Better Auth login** - Secure authentication system
- **Mobile responsive** - Full functionality on all devices
- **Next.js 15 + React 19** - Latest framework features
- **Tailwind v4 + Shadcn/ui** - Modern, accessible UI components
- **Inngest background jobs** - Reliable async processing
- **CodeRabbit PR reviews** - Automated code quality checks

### 💾 Backend Infrastructure

- **TanStack Query** - Powerful data synchronization
- **Drizzle ORM** - Type-safe database queries
- **NeonDB** - Serverless PostgreSQL
- **tRPC** - End-to-end typesafe APIs
- **Polar** - Payment processing and subscription management

## 🚀 Getting Started

### Prerequisites

- Node.js 20+
- npm 10+
- PostgreSQL database (or NeonDB account)
- Stream account for video/chat
- OpenAI API key
- Polar account for payments

### Installation

1. Clone the repository:

```bash
git clone https://github.com/lucaspedroabreu/meetai.git
cd meetai
```

2. Install dependencies:

```bash
npm install
```

3. Set up environment variables:

```bash
cp .env.example .env.local
```

4. Configure your environment variables:

```env
# Database
DATABASE_URL="postgresql://..."

# Stream
NEXT_PUBLIC_STREAM_API_KEY="..."
STREAM_SECRET="..."

# OpenAI
OPENAI_API_KEY="..."

# Auth
BETTER_AUTH_SECRET="..."
BETTER_AUTH_URL="http://localhost:3000"

# Polar
POLAR_API_KEY="..."
NEXT_PUBLIC_POLAR_ORGANIZATION_ID="..."

# Inngest
INNGEST_SIGNING_KEY="..."
INNGEST_EVENT_KEY="..."
```

5. Run database migrations:

```bash
npm run db:generate
npm run db:migrate
```

6. Start the development server:

```bash
npm run dev
```

## 📁 Project Structure

```
meetai/
├── app/                    # Next.js 15 app directory
│   ├── (auth)/            # Authentication pages
│   ├── (dashboard)/       # Main application
│   ├── api/              # API routes
│   └── meeting/[id]/     # Meeting room
├── components/            # React components
│   ├── ui/               # Shadcn/ui components
│   ├── meeting/          # Meeting-specific components
│   └── ai/               # AI assistant components
├── lib/                   # Utility functions
│   ├── db/               # Database schema & queries
│   ├── ai/               # AI integration
│   └── stream/           # Stream SDK setup
├── hooks/                 # Custom React hooks
├── server/               # Server-side code
│   ├── api/              # tRPC routers
│   └── inngest/          # Background jobs
└── styles/               # Global styles
```

## 🎨 Design System

MeetAI uses a custom theme built on Tailwind CSS v4 with Shadcn/ui components. The design system includes:

### Button Variants

- `call` - Green gradient for starting/joining calls
- `leave` - Orange-to-red gradient for exiting meetings
- `calendar` - Purple gradient for scheduling actions
- `ai` - Translucent gradient for AI features
- `destructive` - Solid red for permanent deletions
- `info` - Blue for informational actions
- `warning` - Yellow-amber for alerts

### Theme Colors

- **Primary**: Modern purple for innovation
- **Accent**: Teal for energy and approachability
- **Background**: Subtle gradients for depth
- **Dark Mode**: Full dark mode support

## 🔧 Development

### Commands

```bash
# Development
npm run dev          # Start dev server with Turbopack
npm run build        # Build for production
npm run start        # Start production server

# Database
npm run db:generate  # Generate migrations
npm run db:migrate   # Generate and apply migrations
npm run db:pull      # Pull schema from database
npm run db:studio    # Open Drizzle Studio

# Linting
npm run lint         # Run ESLint
```

### Code Quality

- **TypeScript** - Full type safety across the stack
- **ESLint** - Consistent code style
- **Prettier** - Code formatting
- **CodeRabbit** - Automated PR reviews

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Stream](https://getstream.io) for video/chat infrastructure
- [OpenAI](https://openai.com) for AI capabilities
- [Vercel](https://vercel.com) for hosting
- [Shadcn](https://ui.shadcn.com) for UI components
- [Polar](https://polar.sh) for payment processing

## 📞 Support

- **Documentation**: [docs.meetai.com](https://docs.meetai.com) //TODO

---

Built with ❤️ by the MeetAI team
