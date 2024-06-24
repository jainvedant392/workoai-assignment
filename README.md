# Backend API assignment

This API is built with Express.js, MongoDB and Jest, using MVC architecture.

## Table of Contents

- [Getting Started](#getting-started)
- [API Endpoints](#api-endpoints)
- [Environment Variables](#environment-variables)
- [Running Tests](#running-tests)
- [License](#license)

## Getting Started

### Prerequisites

- Node.js (latest version preferably)
- MongoDB (latest version preferably)

### Installation

1. Fork the repository.

2. Clone the forked repository:
    ```bash
    git clone https://github.com/yourusername/workoai-assignment.git
    cd workoai-assignment
    ```

3. Install dependencies:
    ```bash
    npm install
    ```

4. Create a `.env` file in the root directory with the following content:
    ```plaintext
    JWT_SECRET=your-jwt-secret
    MONGO_URI=your-mongodb-connection-string
    PORT=3000
    ```

5. Start the server:
    ```bash
    npm run server
    ```

The server should now be running on `http://localhost:3000`.

## API Endpoints

### Auth Endpoints

- **POST /api/auth/register** - Register or Create User, providing name, email, password, age, city, zipCode, role (user/admin)
- **POST /api/auth/login** - Login User with email and password
- **POST /api/auth/logout** - Logout User

### User Endpoints*

- **GET /api/worko/users** - List all users (can only be accessed by an user with admin role)
- **GET /api/worko/user/:userId** - Get user details
- **PUT /api/worko/user/:userId** - Update a user
- **PATCH /api/worko/user/:userId** - Partially update a user
- **DELETE /api/worko/user/:userId** - Soft delete a user
#### *All above user endpoints are protected, user needs to login first.

## Environment Variables

- `MONGO_URI`: URI for connecting to MongoDB.
- `JWT_SECRET`: JWT Secret string.
- `PORT`: Port for the server to listen on.

## Running Tests

To run unit tests with coverage:

```bash
npm test
```
