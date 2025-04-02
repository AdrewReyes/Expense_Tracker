# Expense Tracker Application

## Overview
The Expense Tracker Application is a web application that allows users to track their income and expenses. Users can register, log in, and manage their financial data efficiently. The application provides features to add, retrieve, and delete income and expense records, as well as download reports in Excel format.

## Technologies Used
- Node.js
- Express.js
- PostgreSQL
- Sequelize (ORM for PostgreSQL)
- JWT (JSON Web Tokens) for authentication
- Multer for file uploads
- ExcelJS for generating Excel files

## Project Structure
```
expense_tracker_app
└── expense_tracker_app
    ├── Server
    │   ├── db
    │   │   └── schema.sql
    │   ├── src
    │   │   ├── config
    │   │   │   └── db.js
    │   │   ├── controllers
    │   │   │   ├── authController.js
    │   │   │   ├── dashboardController.js
    │   │   │   ├── expenseController.js
    │   │   │   └── incomeController.js
    │   │   ├── middleware
    │   │   │   ├── authMiddleware.js
    │   │   │   └── uploadMiddleware.js
    │   │   ├── models
    │   │   │   ├── Expense.js
    │   │   │   ├── Income.js
    │   │   │   ├── User.js
    │   │   │   └── index.js
    │   │   └── routes
    │   │       ├── authRoutes.js
    │   │       ├── dashboardRoutes.js
    │   │       ├── expenseRoutes.js
    │   │       └── incomeRoutes.js
    │   ├── .env
    │   ├── package.json
    │   ├── server.js
    │   └── README.md
    └── README.md
```

## Setup Instructions
1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd expense_tracker_app/backend
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure environment variables**:
   Create a `.env` file in the `backend` directory and add the following:
   ```
   DATABASE_URL=your_postgres_database_url
   JWT_SECRET=your_jwt_secret
   ```

4. **Run the application**:
   ```bash
   npm run dev
   ```

## API Endpoints
- **Authentication**
  - `POST /api/v1/auth/register`: Register a new user
  - `POST /api/v1/auth/login`: Log in a user
  - `GET /api/v1/auth/getUser`: Get user information (protected)

- **Income Management**
  - `POST /api/v1/income/add`: Add new income (protected)
  - `GET /api/v1/income/get`: Get all income records (protected)
  - `DELETE /api/v1/income/:id`: Delete an income record (protected)
  - `GET /api/v1/income/downloadexcel`: Download income records as Excel (protected)

- **Expense Management**
  - `POST /api/v1/expense/add`: Add new expense (protected)
  - `GET /api/v1/expense/get`: Get all expense records (protected)
  - `DELETE /api/v1/expense/:id`: Delete an expense record (protected)
  - `GET /api/v1/expense/downloadexcel`: Download expense records as Excel (protected)

- **Dashboard**
  - `GET /api/v1/dashboard`: Get dashboard data (protected)

## Contributing
Contributions are welcome! Please open an issue or submit a pull request for any improvements or bug fixes.

## License
This project is licensed under the MIT License.
