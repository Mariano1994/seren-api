# 🏋️ Seren API

Seren is an intelligent wellness platform designed to help people live with more balance and performance. By combining technology, design, and data-driven insights, Seren connects users to personalized experiences, habits, and content that strengthen both body and mind. Our mission is simple: to use technology to make well-being accessible, measurable, and continuous.

This API powers the backend infrastructure for a gym check-in management system, enabling users to discover nearby gyms, perform check-ins with location validation, and track their fitness journey through comprehensive metrics and history.

## ✨ Features

### 🔐 Authentication & Authorization
- **User Registration**: Secure user account creation with email validation
- **JWT Authentication**: Token-based authentication with refresh token support
- **Role-Based Access Control**: Support for `ADMIN` and `MEMBER` roles
- **Protected Routes**: Middleware-based route protection

### 🏋️ Gym Management
- **Create Gyms**: Admin-only endpoint to register new gym locations
- **Search Gyms**: Full-text search functionality to find gyms by name
- **Nearby Gyms**: Location-based search to find gyms within proximity using GPS coordinates

### ✅ Check-In System
- **Smart Check-Ins**: Location-validated check-ins (users must be within 100m of the gym)
- **Daily Limit**: Prevents multiple check-ins on the same day
- **Check-In Validation**: Admin-only endpoint to validate user check-ins
- **Check-In History**: Retrieve paginated history of user check-ins
- **User Metrics**: Get comprehensive statistics about user check-ins

### 📊 User Management
- **User Profile**: Retrieve authenticated user profile information
- **Password Security**: Bcrypt-based password hashing
- **Session Management**: Secure token refresh mechanism

## 🛠️ Technologies

### Core Stack
- **Node.js**: JavaScript runtime environment
- **TypeScript**: Type-safe JavaScript development
- **Fastify**: High-performance web framework
- **Prisma**: Next-generation ORM for database management
- **PostgreSQL**: Robust relational database

### Authentication & Security
- **@fastify/jwt**: JWT token generation and validation
- **@fastify/cookie**: Secure cookie management for refresh tokens
- **bcryptjs**: Password hashing and verification
- **Zod**: Schema validation for runtime type checking

### Development Tools
- **Vitest**: Fast unit and E2E testing framework
- **@vitest/coverage-v8**: Code coverage reporting
- **Biome**: Fast formatter and linter
- **Docker Compose**: Local PostgreSQL database setup

### Utilities
- **dayjs**: Lightweight date manipulation library
- **dotenv**: Environment variable management

## 📁 Project Structure

```
seren-api/
├── src/
│   ├── http/                    # HTTP layer
│   │   ├── controllers/         # Route handlers
│   │   │   ├── users/          # User endpoints
│   │   │   ├── gyms/           # Gym endpoints
│   │   │   └── check-ins/      # Check-in endpoints
│   │   └── middlewares/        # Authentication & authorization
│   ├── use-cases/              # Business logic layer
│   │   ├── factories/          # Use case factories
│   │   └── erros/              # Custom error classes
│   ├── respositories/          # Data access layer
│   │   ├── prisma/             # Prisma implementations
│   │   └── in-memory-repository/ # In-memory for testing
│   ├── utils/                  # Utility functions
│   ├── lib/                    # Library configurations
│   └── generated/              # Generated Prisma client
├── prisma/
│   ├── schema.prisma           # Database schema
│   └── migrations/             # Database migrations
├── env/                        # Environment validation
└── coverage/                   # Test coverage reports
```

## 🏗️ Architecture

This project follows **Clean Architecture** principles with clear separation of concerns:

- **HTTP Layer**: Handles HTTP requests/responses, validation, and routing
- **Use Cases**: Contains business logic and application rules
- **Repositories**: Abstracts data access with interface-based design
- **Domain Models**: Prisma-generated models representing database entities

### Key Design Patterns
- **Repository Pattern**: Abstract data access for testability
- **Dependency Injection**: Loose coupling between layers
- **Factory Pattern**: Centralized use case instantiation
- **Strategy Pattern**: Multiple repository implementations (Prisma, In-Memory)

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- pnpm (or npm/yarn)
- Docker and Docker Compose
- PostgreSQL (via Docker Compose)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd seren-api
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Set up environment variables**
   Create a `.env` file in the root directory:
   ```env
   NODE_ENV=dev
   PORT=3333
   JWT_SECRET=your-super-secret-jwt-key-here
   DATABASE_URL=postgresql://docker:docker@localhost:5433/apiseren
   ```

4. **Start PostgreSQL database**
   ```bash
   docker-compose up -d
   ```

5. **Run database migrations**
   ```bash
   pnpm prisma migrate dev
   ```

6. **Generate Prisma Client**
   ```bash
   pnpm prisma generate
   ```

7. **Start the development server**
   ```bash
   pnpm dev
   ```

The API will be available at `http://localhost:3333`

## 📝 API Endpoints

### Authentication
- `POST /users` - Register a new user
- `POST /session` - Authenticate user (login)
- `PATCH /token/refresh` - Refresh access token
- `GET /me` - Get authenticated user profile

### Gyms
- `POST /gyms` - Create a new gym (Admin only)
- `GET /gyms/search?q={query}` - Search gyms by name
- `GET /gyms/nearby?latitude={lat}&longitude={lng}` - Find nearby gyms

### Check-Ins
- `POST /gyms/:gymId/check-ins` - Create a check-in
- `GET /check-ins/history` - Get check-in history (paginated)
- `GET /check-ins/metrics` - Get user check-in metrics
- `PATCH /check-ins/:checkInId/validate` - Validate a check-in (Admin only)

## 🧪 Testing

### Run all tests
```bash
pnpm test
```

### Run E2E tests
```bash
pnpm test:e2e
```

### Run tests with coverage
```bash
pnpm test:coverage
```

### Run tests with UI
```bash
pnpm test:ui
```

## 🔧 Development Scripts

- `pnpm dev` - Start development server with hot reload
- `pnpm test` - Run unit tests
- `pnpm test:e2e` - Run end-to-end tests
- `pnpm test:coverage` - Generate test coverage report
- `pnpm test:ui` - Open Vitest UI
- `pnpm formatter` - Format and lint code with Biome

## 🗄️ Database Schema

### User
- `id` (UUID)
- `name` (String)
- `email` (String, unique)
- `role` (Enum: ADMIN | MEMBER)
- `password_hash` (String)
- `created_at` (DateTime)

### Gym
- `id` (UUID)
- `title` (String)
- `description` (String, optional)
- `phone` (String, optional)
- `latitude` (Decimal)
- `longitude` (Decimal)

### CheckIn
- `id` (UUID)
- `user_id` (UUID, foreign key)
- `gym_id` (UUID, foreign key)
- `created_at` (DateTime)
- `validated_at` (DateTime, optional)

## 🔒 Security Features

- **Password Hashing**: Bcrypt with salt rounds
- **JWT Tokens**: Secure token-based authentication
- **Refresh Tokens**: Stored in HTTP-only cookies
- **Input Validation**: Zod schema validation on all endpoints
- **Role-Based Access**: Middleware-based authorization
- **Environment Variables**: Secure configuration management

## 📦 Key Business Rules

1. **Check-In Distance**: Users must be within 100 meters of the gym to check in
2. **Daily Check-In Limit**: Users can only check in once per day
3. **Check-In Validation**: Only admins can validate check-ins
4. **Gym Creation**: Only admins can create new gyms
5. **Token Expiration**: Access tokens expire in 10 minutes

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

ISC

## 👨‍💻 Author

Mariano Capiliku

---

**Note**: This is a backend API project. Make sure to configure CORS appropriately if integrating with a frontend application.
