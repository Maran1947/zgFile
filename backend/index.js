import express from 'express'
import { config } from 'dotenv'
import connectDB from './src/db/dbconn.js'
import routes from './src/api/routes/routes.js'
import cors from 'cors'
import path from 'path'
import cookieParser from 'cookie-parser'
import { fileURLToPath } from 'url'
import session from 'express-session'

config()
connectDB();

const port = process.env.PORT || 8000;

const corsOptions = {
    origin: [process.env.FRONTEND_URL],
    credentials: true
}

const app = express()

app.use(cors(corsOptions))
app.use(session({
    secret: process.env.TOKEN_KEY,
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        secure: true,
        sameSite: 'none',
        maxAge: 24 * 60 * 60 * 1000,
        partitioned: true,
    }
}))
app.use(cookieParser());
app.use(express.json())

app.get('/', (req, res) => {
    res.send("Welcome to Image Uploading APIs!")
});
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const directory = path.join(__dirname, '/uploads');
app.use('/uploads', express.static(directory));

app.use('/api/v1', routes)

app.get('*', (req, res) => {
    res.status(404).send({
        message: "Not found",
        path: req.path
    })
})

app.listen(port, () => console.log(`[server] is running at ${port}`))

export default app