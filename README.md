<!--
<p align="center" >
    <img width="200" src="https://github.com/Maran1947/zgFile/assets/69248165/e08c612b-5200-4199-9750-67d3b5229c31" alt="zgFile logo" /> 
</p>
-->

# <img width="100" src="https://github.com/Maran1947/zgFile/assets/69248165/e08c612b-5200-4199-9750-67d3b5229c31" alt="zgFile logo" /> zgFile 
zgFile is a user-friendly file sharing web application that allows users to easily upload, store, and share files with others. With a simple and intuitive interface, zgFile makes it effortless to manage your files and collaborate with colleagues or friends. Whether you're sharing documents, images, or videos, zgFile ensures secure and seamless file sharing for all your needs.

# 🧐 Screenshots
![Sign up](https://github.com/Maran1947/zgFile/assets/69248165/759fa200-8f3b-4610-a500-c9e45cc122b0)
![Sign in](https://github.com/Maran1947/zgFile/assets/69248165/5d6f4dcc-a00d-4597-9c1e-5f9475c40751)
![Create Share](https://github.com/Maran1947/zgFile/assets/69248165/7bd6c8ea-ac8e-44cd-89ed-2c39e34bbbd4)
![Browse Files](https://github.com/Maran1947/zgFile/assets/69248165/9129935e-b2f7-4c0b-a953-986ec9e8b4e4)
![After Browser Files](https://github.com/Maran1947/zgFile/assets/69248165/f249d619-d385-4bf6-bd9a-f08f1eec86bf)
![Your Share](https://github.com/Maran1947/zgFile/assets/69248165/d530c24a-2415-47b3-a381-2a1847a6f245)
![Access Shareable Files](https://github.com/Maran1947/zgFile/assets/69248165/e768dad7-7f53-429f-aa8d-80a2e648ab91)
![Password Protected Shareable Files](https://github.com/Maran1947/zgFile/assets/69248165/b31bdc8a-867a-4f82-b3c2-3c1812e595b6)
![Profile](https://github.com/Maran1947/zgFile/assets/69248165/00b1a088-d929-44e9-86d6-4c0001fe00c8)







# 😅 Prerequisites
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
