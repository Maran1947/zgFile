## Prerequisites
- Node.js version 20 or higher installed on your machine.
- MongoDB URI

# ⚙ Installation

Follow these steps to set up locally:

1. Install the required dependencies:

```
For Backend:
    cd backend
    npm install

For Frontend:
    cd frontend
    npm install
```

2. Set up the configuration file:
- Update the necessary environment variables in the `.env` file, such as database credentials and token secrets.
```
For Backend:
    PORT=8000
    MONGODB_URI=mongodb+srv://<DB_USERNAME>:<DB_PASSWORD>@cluster0.bftbu.mongodb.net/zgfiledb?retryWrites=true&w=majority
    TOKEN_KEY=qpr@290_0^6ty
    JWT_EXPIRES=1h

For Frontend: 
    NEXT_PUBLIC_BASE_URL=http://localhost:8000/api/v1

```

3. Start the server:
```
For Backend: 
    npm run dev
For Frontend:
    npm run dev 
```

4. Access server in your web browser at
```
For Backend:
     http://localhost:8000
For Frontend:
    http://localhost:3000
```