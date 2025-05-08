# Bun API Template

This project is a template for building scalable and maintainable APIs using [Bun](https://bun.sh/), a fast JavaScript runtime. It includes a structured folder layout, middleware support, logging, error handling, and environment configuration.

## Features

- **Fast Runtime**: Powered by Bun for high performance.
- **Modular Structure**: Organized folder structure for scalability.
- **Middleware Support**: Pre-configured middlewares for logging, error handling, and response formatting.
- **Environment Configuration**: Centralized `.env` support for managing environment variables.
- **Logging**: Integrated logging using `winston` and `Logtail`.
- **Error Handling**: Centralized error handling with custom error classes.
- **Testing**: Jest configuration for unit testing.
- **Linting and Formatting**: Pre-configured ESLint and Prettier for code quality.
- **Husky Hooks**: Pre-commit hooks for linting and formatting.

## Folder Structure

```
.
├── .husky/                # Git hooks
├── logs/                  # Log files
├── src/                   # Source code
│   ├── api/               # API routes
│   ├── config/            # Configuration files
│   ├── constants/         # Constants
│   ├── helpers/           # Utility functions
│   ├── middlewares/       # Middleware functions
│   ├── tests/             # Unit tests
│   ├── utils/             # General utilities
│   └── app.ts             # Main application setup
├── tools/                 # Utility scripts
├── .env.local             # Environment variables
├── package.json           # Project metadata and dependencies
├── tsconfig.json          # TypeScript configuration
├── jest.config.js         # Jest configuration
├── eslint.config.js       # ESLint configuration
└── README.md              # Project documentation
```

## Getting Started

### Prerequisites

- [Bun](https://bun.sh/) installed on your system.
- Node.js (optional for some dependencies).

### Installation

1. Clone the repository:

   ```sh
   git clone <repository-url>
   cd bun-api-template
   ```

2. Install dependencies:

   ```sh
   bun install
   ```

3. Set up environment variables:
   - Copy `.env.local` and update the values as needed.

### Running the Application

- **Development**:

  ```sh
  bun run dev
  ```

- **Staging**:

  ```sh
  bun run staging
  ```

- **Production**:
  ```sh
  bun run start
  ```

### Testing

Run tests using Jest:

```sh
bun run test
```

### Linting and Formatting

- Lint code:

  ```sh
  bun run lint
  ```

- Fix lint issues:

  ```sh
  bun run lint:fix
  ```

- Format code:
  ```sh
  bun run prettier
  ```

## API Endpoints

### Health Check

- **GET** `/api/health`
  - Returns the health status of the application.

### Versioned API

- **GET** `/api/v1.0`
  - Provides version-specific API information.

## Environment Variables

The application uses the following environment variables (defined in `.env.local`):

- **App Configuration**:

  - `NODE_ENV`, `APP_PORT`, `APP_HOST`

- **Database**:

  - `DB_HOST`, `DB_NAME`, `DB_ADMIN_USER`, `DB_ADMIN_PASSWORD`, etc.

- **Redis**:

  - `REDIS_HOST`, `REDIS_PORT`, `REDIS_PASSWORD`

- **Kafka**:

  - `KAFKA_HOST`, `KAFKA_PORT`, `KAFKA_CLIENT_ID`, etc.

- **AWS**:

  - `ACCESS_KEY_ID`, `SECRET_ACCESS_KEY`, `S3_BUCKET_NAME`, etc.

- **Email**:
  - `EMAIL_HOST`, `EMAIL_PORT`, `EMAIL_USER`, `EMAIL_PASSWORD`

## Logging

Logs are stored in the `logs/` directory:

- `error.log`: Logs errors.
- `combined.log`: Logs all activities.

## Contributing

1. Fork the repository.
2. Create a new branch:
   ```sh
   git checkout -b feature/your-feature
   ```
3. Commit your changes:
   ```sh
   git commit -m "Add your message"
   ```
4. Push to the branch:
   ```sh
   git push origin feature/your-feature
   ```
5. Open a pull request.

## License

This project is licensed under the MIT License.

```

```
