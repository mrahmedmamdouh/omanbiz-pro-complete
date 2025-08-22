<<<<<<< HEAD
# omanbiz-pro-complete
=======
# OmanBiz Pro - Complete Business Management System

A comprehensive business management solution designed specifically for Omani businesses, featuring a modern React frontend and scalable Node.js microservices backend.

## 🌟 Features

### Business Management
- **Customer Management** - Complete customer database with contact info, transaction history
- **Product Catalog** - Product information, inventory tracking, pricing management
- **Invoice System** - Professional invoice creation, payment tracking, automated calculations
- **Dashboard Analytics** - Real-time business insights, charts, and KPIs
- **Financial Reporting** - Sales reports, profit/loss analysis, cash flow tracking

### Technical Features
- **Multi-tenant Architecture** - Support multiple businesses on single platform
- **Role-based Access Control** - Different permission levels for team members
- **Real-time Updates** - Live data synchronization across the platform
- **Mobile Responsive** - Optimized for desktop, tablet, and mobile devices
- **Secure Authentication** - JWT-based auth with refresh tokens
- **File Management** - Upload and manage business documents and images
- **API Integration** - RESTful APIs for third-party integrations

### Compliance & Localization
- **Oman VAT Support** - Built-in VAT calculations and reporting
- **Multi-currency Support** - Handle OMR and international currencies
- **Arabic Language Support** - RTL layout and Arabic text support
- **Local Business Types** - Support for LLC, Corporation, Partnership, etc.

## 🏗 Architecture

### Backend (Microservices)
- **API Gateway** (Port 3000) - Request routing and load balancing
- **Auth Service** (Port 3001) - User authentication and authorization
- **Business Service** (Port 3002) - Core business logic and data management
- **Financial Service** (Port 3003) - Financial analytics and reporting
- **Compliance Service** (Port 3004) - VAT and regulatory compliance
- **Marketing Service** (Port 3005) - Customer communication and campaigns
- **Admin Service** (Port 3006) - System administration and monitoring

### Frontend (React SPA)
- Modern React 18 application
- Responsive design with Tailwind CSS
- Real-time dashboard with interactive charts
- Complete CRUD operations for all business entities
- Advanced form handling and validation

### Database
- MongoDB with optimized schemas
- Multi-tenant data isolation
- Comprehensive indexing for performance
- Automated backups and data integrity

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ 
- MongoDB 5+
- npm or yarn

### Installation

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd omanbiz-pro-complete
   ```

2. **Setup Backend:**
   ```bash
   cd backend
   npm install
   cp .env.example .env
   # Edit .env with your MongoDB URI and JWT secrets
   npm run dev
   ```

3. **Setup Frontend:**
   ```bash
   cd frontend
   npm install
   cp .env.example .env
   # Edit .env with your API URL
   npm run dev
   ```

4. **Access the Application:**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:3000

### First Login
1. Go to http://localhost:5173/register
2. Create your business account
3. Complete the setup process
4. Start managing your business!

## 📱 Screenshots

### Dashboard
![Dashboard with real-time analytics and business insights]

### Customer Management
![Complete customer database with contact information]

### Invoice System
![Professional invoice creation and management]

### Mobile Responsive
![Optimized mobile interface for on-the-go management]

## 🔧 Configuration

### Backend Environment Variables
```bash
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/omanbiz_pro
JWT_SECRET=your-super-secret-key
JWT_REFRESH_SECRET=your-refresh-secret
CORS_ORIGIN=http://localhost:5173
```

### Frontend Environment Variables
```bash
VITE_API_BASE_URL=http://localhost:3000/api
VITE_APP_NAME=OmanBiz Pro
VITE_CURRENCY=OMR
```

## 📚 API Documentation

### Authentication
```bash
POST /api/auth/register - Register new user
POST /api/auth/login - User login
GET /api/auth/profile - Get user profile
```

### Business Management
```bash
GET /api/customers - List customers
POST /api/customers - Create customer
GET /api/products - List products
POST /api/invoices - Create invoice
```

### Dashboard
```bash
GET /api/dashboard/stats - Get business statistics
GET /api/dashboard/charts/revenue - Revenue chart data
```

[Full API documentation available in `/backend/README.md`]

## 🛡 Security

- JWT-based authentication with refresh tokens
- Password hashing using bcrypt (12 rounds)
- Rate limiting on sensitive endpoints
- CORS protection
- Input validation and sanitization
- SQL injection prevention
- XSS protection
- Multi-tenant data isolation

## 📈 Performance

- Optimized MongoDB queries with proper indexing
- Efficient React rendering with hooks and context
- Code splitting and lazy loading
- Image optimization and compression
- CDN-ready static assets
- Microservices for horizontal scaling

## 🌍 Localization

- English and Arabic language support
- RTL (Right-to-Left) layout support
- Local currency formatting (OMR)
- Oman-specific business types and regulations
- Local time zone support (Asia/Muscat)

## 🔄 Data Flow

```
Frontend (React) 
    ↕ HTTP/HTTPS
API Gateway (Express)
    ↕ Internal Network
Microservices (Auth, Business, Financial, etc.)
    ↕ MongoDB Driver
Database (MongoDB)
```

## 📊 Monitoring & Logging

- Structured logging with Winston
- Request/response logging
- Error tracking and monitoring
- Performance metrics
- Health check endpoints
- Database connection monitoring

## 🧪 Testing

```bash
# Backend tests
cd backend
npm test

# Frontend tests
cd frontend
npm test

# Integration tests
npm run test:integration
```

## 📦 Deployment

### Docker Deployment
```bash
# Build and run with Docker Compose
docker-compose up -d
```

### Traditional Deployment
```bash
# Backend
cd backend
npm run build
pm2 start ecosystem.config.js

# Frontend
cd frontend
npm run build
# Serve dist/ folder with nginx or similar
```

### Cloud Deployment
- **AWS**: Use ECS for containers, RDS for MongoDB
- **Azure**: Use App Service and CosmosDB
- **Google Cloud**: Use App Engine and Cloud MongoDB

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

For support and questions:
- 📧 Email: support@omanbizpro.com
- 📖 Documentation: [docs.omanbizpro.com](https://docs.omanbizpro.com)
- 🐛 Bug Reports: Create an issue on GitHub
- 💬 Community: Join our Discord server

## 🗺 Roadmap

### Version 1.1 (Next Release)
- [ ] Advanced reporting and analytics
- [ ] Email invoice sending
- [ ] Multi-language invoices
- [ ] Inventory management
- [ ] Payment gateway integration

### Version 1.2
- [ ] Mobile app (React Native)
- [ ] Advanced user roles
- [ ] API for third-party integrations
- [ ] Automated backups
- [ ] Advanced search and filters

### Version 2.0
- [ ] AI-powered business insights
- [ ] Integration with Omani banks
- [ ] Government reporting automation
- [ ] Advanced tax calculations
- [ ] CRM functionality

## 🙏 Acknowledgments

- Built for the vibrant business community of Oman
- Inspired by modern business management needs
- Thanks to all contributors and beta testers

---

**Made with ❤️ for Omani businesses**

*Empowering entrepreneurs and businesses across the Sultanate of Oman with modern, efficient, and comprehensive business management solutions.*
>>>>>>> initial commit
