# InnovateX Registration & Certificate Portal

## Overview

InnovateX Registration & Certificate Portal is a full-stack web application for managing team registrations and certificate distribution for InnovateX events. The application features a modern, cyberpunk-inspired design with a black background and neon green accents. Users can register their teams (2-4 members) and retrieve participation certificates via email lookup. The system automatically generates certificates for all team members upon registration.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework & Build Tool**
- **React 18** with **TypeScript** for type-safe component development
- **Vite** as the build tool and development server for fast hot module replacement
- **Wouter** for lightweight client-side routing (3 main routes: Home, Register, Download)

**UI Component System**
- **shadcn/ui** component library built on **Radix UI** primitives for accessible, customizable components
- **TailwindCSS** for utility-first styling with custom theme configuration
- Mobile-first responsive design approach starting from 320px width
- Custom CSS variables for consistent theming (neon green `#00ff00` accent on black background)

**State Management**
- **React Hook Form** with **Zod** validation for form handling and validation
- **TanStack Query (React Query)** for server state management, API calls, and caching
- Form validation shared between client and server using Zod schemas from shared directory

**Design System**
- Card-based layouts with rounded corners and neon borders
- Glowing button effects using custom CSS classes (`neon-glow`, `neon-glow-strong`)
- Google Fonts integration (Inter, Poppins, JetBrains Mono)
- Consistent spacing using Tailwind spacing scale (p-4, p-6, p-8, m-12)

### Backend Architecture

**Server Framework**
- **Express.js** running on Node.js with TypeScript
- RESTful API design with two primary endpoints:
  - `POST /api/register` - Team registration with automatic certificate generation
  - `GET /api/certificate?email={email}` - Certificate retrieval by email

**Request/Response Flow**
- JSON body parsing with raw body capture for webhook support
- Request logging middleware with timing and response capture
- Centralized error handling with Zod validation error formatting

**Business Logic**
- In-memory storage implementation (`MemStorage`) for development/demo purposes
- Automatic certificate generation for all team members (2-4) upon team registration
- Email-based certificate lookup supporting multiple certificates per email

### Data Storage

**Database Configuration**
- **Drizzle ORM** configured for PostgreSQL with type-safe query building
- **Neon Database** serverless PostgreSQL (via `@neondatabase/serverless`)
- Schema-first design with migrations stored in `/migrations` directory

**Schema Design**
- **Teams Table**: Stores team information (teamName, projectTitle, 2-4 member names/emails)
- **Certificates Table**: Stores individual certificates linked to teams via foreign key
- UUID primary keys using `gen_random_uuid()`
- Optional member fields (member3, member4) to support flexible team sizes

**Data Layer Interface**
- Abstract `IStorage` interface allows swapping between in-memory and database implementations
- Current implementation uses in-memory storage for rapid development
- Database schema prepared for production deployment with Drizzle migrations

### Authentication and Authorization

Currently, the application does not implement authentication or authorization. All endpoints are publicly accessible. Certificate retrieval is based solely on email lookup without verification.

**Security Considerations for Future Implementation:**
- Email verification before certificate download
- Rate limiting on registration and certificate endpoints
- CAPTCHA integration to prevent automated abuse

### External Dependencies

**Third-Party Services**
- **Neon Database** - Serverless PostgreSQL database hosting
- **Google Fonts API** - Web fonts (Inter, Poppins, JetBrains Mono)

**Certificate Generation**
- Currently stores placeholder URLs (`https://certificates.example.com/{certificateId}`)
- Production implementation would integrate with certificate generation service or library

**Core NPM Packages**
- `express` - Web server framework
- `drizzle-orm` & `drizzle-kit` - Database ORM and migrations
- `@neondatabase/serverless` - Neon PostgreSQL driver
- `react` & `react-dom` - UI framework
- `@tanstack/react-query` - Server state management
- `react-hook-form` - Form handling
- `zod` - Schema validation
- `tailwindcss` - Utility-first CSS framework
- `@radix-ui/*` - Headless UI component primitives
- `wouter` - Client-side routing

**Development Tools**
- `vite` - Build tool and dev server
- `typescript` - Type checking
- `tsx` - TypeScript execution for Node.js
- `esbuild` - Production bundling for server code
- `@replit/vite-plugin-*` - Replit development environment integration