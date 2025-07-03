# PawPal - Pet Care Management System

## Overview

PawPal is a modern full-stack web application for pet care management. It provides pet owners with comprehensive tools to track, manage, and care for their beloved pets with an ultra-modern, AI-powered platform designed for the modern pet parent.

## System Architecture

The application follows a modern full-stack architecture with clear separation between frontend and backend components:

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter for lightweight client-side routing
- **Styling**: Tailwind CSS with custom design system
- **UI Components**: Shadcn/ui component library with Radix UI primitives
- **State Management**: TanStack Query (React Query) for server state
- **Form Handling**: React Hook Form with Zod validation
- **Build Tool**: Vite for fast development and optimized builds

### Backend Architecture
- **Runtime**: Node.js with Express.js server
- **Language**: TypeScript with ES modules
- **Database**: PostgreSQL with Drizzle ORM
- **Database Provider**: Neon serverless PostgreSQL
- **File Upload**: Multer for image handling
- **Session Management**: Connect-pg-simple for PostgreSQL sessions

## Key Components

### Database Schema
The application uses a well-structured relational database with four main entities:

1. **Pets Table**: Core pet information including name, species, breed, age, weight, health status, and photos
2. **Care Activities Table**: Scheduled and completed care tasks (feeding, exercise, grooming, medical)
3. **Health Records Table**: Medical history including checkups, vaccinations, and treatments
4. **Daily Stats Table**: Activity tracking with steps, exercise minutes, sleep hours, and meals

### Core Features
- **Pet Management**: Add, view, edit, and delete pet profiles with photo support
- **Care Activity Tracking**: Schedule and track various care activities
- **Health Record Management**: Maintain comprehensive medical histories
- **Daily Statistics**: Monitor pet activity and health metrics
- **Dashboard Analytics**: Overview of all pets and their care status

### UI Design System
- **Color Palette**: Custom branded colors (primary-blue: #1d4ed8, primary-green: #059669, primary-orange: #ea580c)
- **Typography**: Inter and Poppins font families for modern aesthetics
- **Components**: Consistent design language with hover effects, animations, and responsive layouts
- **Theme**: Light/dark mode support with CSS custom properties

## Data Flow

1. **Client Requests**: React components make API calls using TanStack Query
2. **Server Processing**: Express routes handle HTTP requests and validate data
3. **Database Operations**: Drizzle ORM manages PostgreSQL interactions
4. **Response Handling**: Server returns JSON responses to client
5. **State Updates**: TanStack Query manages cache invalidation and UI updates

## External Dependencies

### Database
- **Neon PostgreSQL**: Serverless PostgreSQL database for production
- **Connection**: Environment variable `DATABASE_URL` required

### UI Libraries
- **Radix UI**: Accessible component primitives
- **Lucide React**: Modern icon library
- **Tailwind CSS**: Utility-first CSS framework

### Development Tools
- **Vite**: Fast build tool with HMR
- **TypeScript**: Type safety across the stack
- **ESBuild**: Fast JavaScript bundler for production

## Deployment Strategy

### Development Environment
- **Runtime**: Replit with Node.js 20
- **Database**: PostgreSQL 16 module
- **Build Process**: `npm run dev` for development server
- **Hot Reload**: Vite HMR for fast development iteration

### Production Build
- **Build Command**: `npm run build` (Vite build + ESBuild for server)
- **Start Command**: `npm run start` (runs compiled JavaScript)
- **Deployment Target**: Autoscale deployment on Replit
- **Port Configuration**: Internal port 5000, external port 80

### File Structure
```
├── client/          # Frontend React application
├── server/          # Backend Express server
├── shared/          # Shared TypeScript types and schemas
├── migrations/      # Database migration files
└── dist/           # Production build output
```

## Changelog
```
Changelog:
- June 25, 2025. Initial setup with React frontend and Express backend
- June 25, 2025. Added PostgreSQL database with Drizzle ORM
- June 25, 2025. Migrated from in-memory storage to persistent database
- June 25, 2025. Enhanced UI with professional gradient logo and complete website
```

## User Preferences

Preferred communication style: Simple, everyday language.