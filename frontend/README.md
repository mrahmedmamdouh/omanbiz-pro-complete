# OmanBiz Pro - Frontend

Modern React-based frontend for the complete business management system.

## Features

- **Modern React 18**: Hooks, Context API, and functional components
- **React Router**: Client-side routing with protected routes
- **Tailwind CSS**: Utility-first CSS framework for styling
- **Responsive Design**: Mobile-first responsive design
- **Authentication**: Complete auth flow with JWT tokens
- **Dashboard**: Real-time analytics and business insights
- **Forms**: React Hook Form with Yup validation
- **Charts**: Interactive charts using Recharts
- **Notifications**: Toast notifications for user feedback
- **Error Handling**: Comprehensive error boundaries and handling
- **API Integration**: Axios-based API client with interceptors
- **Loading States**: Smooth loading indicators throughout the app

## Tech Stack

- **React 18** - UI library
- **React Router 6** - Routing
- **Tailwind CSS** - Styling
- **Axios** - HTTP client
- **React Hook Form** - Form handling
- **Yup** - Form validation
- **React Hot Toast** - Notifications
- **Recharts** - Charts and graphs
- **Heroicons** - Icon library
- **Date-fns** - Date manipulation
- **Vite** - Build tool

## Installation

1. **Install Dependencies:**
   ```bash
   npm install
   ```

2. **Setup Environment:**
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

3. **Start Development Server:**
   ```bash
   npm run dev
   ```

4. **Build for Production:**
   ```bash
   npm run build
   ```

## Environment Variables

```bash
VITE_API_BASE_URL=http://localhost:3000/api
VITE_APP_NAME=OmanBiz Pro
VITE_APP_VERSION=1.0.0
VITE_CURRENCY=OMR
VITE_TIMEZONE=Asia/Muscat
VITE_LANGUAGE=en
```

## Project Structure

```
src/
├── components/          # Reusable components
│   ├── Layout.jsx      # Main layout with sidebar
│   └── ProtectedRoute.jsx # Route protection
├── contexts/           # React contexts
│   └── AuthContext.jsx # Authentication context
├── pages/              # Page components
│   ├── Login.jsx       # Login page
│   ├── Register.jsx    # Registration page
│   ├── Dashboard.jsx   # Dashboard with stats
│   ├── Customers.jsx   # Customer management
│   ├── Products.jsx    # Product management
│   ├── Invoices.jsx    # Invoice management
│   ├── Reports.jsx     # Business reports
│   ├── Settings.jsx    # App settings
│   └── Profile.jsx     # User profile
├── services/           # API services
│   └── api.js         # Axios configuration and API methods
├── hooks/              # Custom hooks
├── utils/              # Utility functions
└── assets/             # Static assets
```

## Key Components

### Authentication
- JWT-based authentication
- Automatic token refresh
- Protected routes
- Role-based access control

### Dashboard
- Real-time business statistics
- Interactive charts and graphs
- Recent activity feed
- Key performance indicators

### Customer Management
- Customer database
- Contact information
- Transaction history
- Search and filtering

### Product Catalog
- Product information
- Inventory tracking
- Categories and pricing
- Image management

### Invoice System
- Invoice creation and management
- Payment tracking
- Customer communication
- PDF generation

### Reporting
- Sales reports
- Financial analytics
- Business insights
- Data visualization

## API Integration

The frontend communicates with the backend through a centralized API service:

```javascript
// API Service Structure
export const authAPI = {
  login: (credentials) => api.post('/auth/login', credentials),
  register: (userData) => api.post('/auth/register', userData),
  // ... more auth methods
};

export const customersAPI = {
  getAll: (params) => api.get('/customers', { params }),
  create: (data) => api.post('/customers', data),
  // ... more customer methods
};
```

## Authentication Flow

1. User enters credentials
2. Frontend sends request to `/auth/login`
3. Backend validates and returns JWT tokens
4. Frontend stores tokens in localStorage
5. All subsequent requests include Authorization header
6. Automatic token refresh when needed
7. Logout clears tokens and redirects to login

## Responsive Design

- Mobile-first approach
- Collapsible sidebar navigation
- Responsive tables and forms
- Touch-friendly interface
- Optimized for tablets and phones

## State Management

- React Context for global state (authentication)
- Local component state for UI state
- Custom hooks for reusable logic
- Form state managed by React Hook Form

## Error Handling

- API error interceptors
- User-friendly error messages
- Toast notifications for feedback
- Error boundaries for crash protection
- Loading states and skeletons

## Performance Optimizations

- Code splitting with React.lazy
- Image optimization
- Bundle optimization with Vite
- Memoization where appropriate
- Efficient re-rendering patterns

## Development

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint
```

## Building and Deployment

```bash
# Build for production
npm run build

# The build files will be in the 'dist' directory
# Serve these files with any static file server
```

### Deployment Options

1. **Netlify**: Drag and drop the `dist` folder
2. **Vercel**: Connect your Git repository
3. **GitHub Pages**: Use `gh-pages` package
4. **Traditional hosting**: Upload `dist` contents to web server

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers

## Contributing

1. Follow the existing code style
2. Use TypeScript types where possible
3. Add proper error handling
4. Include loading states
5. Test on mobile devices
6. Update documentation

## Troubleshooting

### Common Issues

1. **API connection errors:**
   - Check `VITE_API_BASE_URL` in .env
   - Ensure backend is running
   - Check CORS configuration

2. **Authentication issues:**
   - Clear localStorage tokens
   - Check token expiration
   - Verify JWT secrets match backend

3. **Build errors:**
   - Clear node_modules and reinstall
   - Check for TypeScript errors
   - Verify all imports are correct

4. **Styling issues:**
   - Check Tailwind CSS classes
   - Verify PostCSS configuration
   - Clear browser cache

Built with ❤️ for modern businesses
