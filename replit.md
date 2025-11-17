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

**Static Frontend with Google Apps Script Backend**
- Frontend is a static React application deployed separately
- Backend functionality handled by Google Apps Script Web App
- RESTful API design with two primary endpoints:
  - `POST ?method=register` - Team registration with automatic certificate generation
  - `GET ?method=certificate&email={email}` - Certificate retrieval by email

**Google Apps Script Backend**
- Handles team registration and stores data in Google Sheets
- Generates PDF certificates from Google Docs templates
- Sends certificates via email using MailApp service
- Provides CORS-enabled JSON API endpoints for frontend integration

**Data Storage**
- **Google Sheets** - Stores registration data with columns:
  - Registration ID, Team Name, Project Title, Member Name, Member Email, Certificate URL, Timestamp, Team ID
- **Google Drive** - Stores generated PDF certificates in designated folder
- Certificate generation uses Google Docs template with placeholders

**API Integration**
- Frontend makes direct HTTP requests to Google Apps Script Web App URL
- Apps Script URL: `https://script.google.com/macros/s/[SCRIPT_ID]/exec`
- Supports both GET and POST methods with method parameter for routing
- Returns JSON responses with success status and data

### Authentication and Authorization

Currently, the application does not implement authentication or authorization. All endpoints are publicly accessible. Certificate retrieval is based solely on email lookup without verification.

**Security Considerations for Future Implementation:**
- Email verification before certificate download
- Rate limiting on registration and certificate endpoints
- CAPTCHA integration to prevent automated abuse

### External Dependencies

**Third-Party Services**
- **Google Apps Script** - Backend API and business logic
- **Google Sheets** - Data storage for registrations
- **Google Drive** - Storage for generated PDF certificates
- **Google Docs** - Certificate template
- **Gmail/MailApp** - Email delivery for certificates
- **Google Fonts API** - Web fonts (Inter, Poppins, JetBrains Mono)

**Certificate Generation**
- Google Apps Script generates certificates from Google Docs template
- PDF files are created and stored in Google Drive
- Each certificate has a unique URL for download
- Certificates are automatically emailed to team members upon registration

**Core NPM Packages**
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
- `@replit/vite-plugin-*` - Replit development environment integration

**Deployment**
- Static site deployment to Vercel or Render
- Build output directory: `dist`
- Build command: `vite build`
- No server runtime required