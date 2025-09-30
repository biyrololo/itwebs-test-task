# Next.js Rendering Methods Demo

This project demonstrates the four primary rendering methods available in Next.js 15, along with modern React patterns and best practices.

## Overview

This application showcases different Next.js rendering techniques by implementing the same "Posts" functionality using:

- **SSR (Server-Side Rendering)** - Dynamic rendering on each request
- **SSG (Static Site Generation)** - Pre-rendered pages at build time
- **ISR (Incremental Static Regeneration)** - Statically generated pages with revalidation
- **CSR (Client-Side Rendering)** - Browser-based data fetching

## Features

### Rendering Methods
- `/posts` - Server-Side Rendering (SSR)
- `/posts/[id]` - Static Site Generation (SSG)
- `/posts/isr` - Incremental Static Regeneration (ISR)
- `/posts/csr` - Client-Side Rendering (CSR)

### Core Functionality
- **Form Handling**: Robust form validation using React Hook Form and Zod
- **File Uploads**: Support for multipart form data submissions
- **Modal Components**: Reusable, accessible modal dialogs
- **Real-time Simulation**: WebSocket-like communication demo
- **Toast Notifications**: User feedback system
- **Responsive Design**: Mobile-first approach with Tailwind CSS

### Technical Implementation
- **TypeScript**: Strict type checking throughout
- **Modern React**: Hooks, Suspense, and concurrent features
- **Component Architecture**: Reusable, well-structured components
- **API Integration**: Axios for HTTP requests
- **State Management**: React Context and local component state
- **Error Handling**: Comprehensive error boundaries and user feedback

## Project Structure

```
src/
├── app/                    # Next.js app directory
│   ├── posts/             # Posts feature routes
│   │   ├── [id]/          # SSG dynamic route
│   │   ├── create/        # CSR form page
│   │   ├── csr/           # Client-side rendering demo
│   │   ├── isr/           # Incremental static regeneration
│   │   ├── page.tsx       # SSR posts page
│   │   └── client-page.tsx # Client component for SSR page
│   ├── layout.tsx         # Root layout with navigation
│   └── page.tsx           # Homepage
├── components/            # Reusable UI components
│   ├── ui/                # Primitive UI components
│   ├── post-modal-form.tsx # Modal form component
│   └── websocket-demo.tsx # WebSocket simulation
├── entities/              # Business logic entities
│   └── post/             # Post entity with model
├── lib/                  # Utility functions and hooks
│   ├── hooks/            # Custom React hooks
│   └── utils.ts          # Helper functions
└── shared/               # Shared resources
    └── api/              # API client configuration
```

## Getting Started

### Prerequisites
- Node.js 18+
- npm, yarn, or pnpm

### Installation
```bash
# Clone the repository
git clone <repository-url>

# Install dependencies
npm install

# Run development server
npm run dev
```

### Available Scripts
- `npm run dev` - Start development server
- `npm run build` - Create production build
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## Architecture Decisions

### Rendering Strategy
Each rendering method serves a specific purpose:
- **SSR**: For dynamic content that changes frequently
- **SSG**: For static content known at build time
- **ISR**: For content that needs periodic updates
- **CSR**: For highly interactive client-side features

### Component Design
- **Separation of Concerns**: Server and client components clearly delineated
- **Reusability**: Components designed for multiple use cases
- **Accessibility**: Proper ARIA attributes and keyboard navigation
- **Performance**: Optimized bundle sizes and lazy loading

### State Management
- **Local State**: useState and useReducer for component-level state
- **Global State**: Context API for cross-component state
- **Form State**: React Hook Form for complex form handling

### Error Handling
- **Boundary Components**: Error boundaries for graceful degradation
- **User Feedback**: Toast notifications for success/error states
- **Validation**: Zod schema validation for data integrity

## API Integration

The application integrates with JSONPlaceholder API to demonstrate:
- RESTful API consumption
- Error handling in async operations
- Loading states and user feedback
- Form submission with file uploads

## Styling

- **Tailwind CSS**: Utility-first CSS framework
- **Responsive Design**: Mobile-first approach
- **Dark Mode**: Automatic theme switching
- **Component Variants**: Consistent design system

## Deployment

This application is ready for deployment on Vercel with zero configuration. For other platforms, ensure Node.js 18+ is available.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a pull request

## License

This project is licensed under the MIT License.

## Author

Senior Frontend Developer