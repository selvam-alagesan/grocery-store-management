const express =require ('express');
const dotenv = require('dotenv');
const cors = require('cors');
const cookieParser =require('cookie-parser');
dotenv.config();
const app = express();

const connectDatabase = require('./config/db');
connectDatabase();


const allowedOrigins = [
    "http://localhost:5173",
    process.env.FRONTEND_URL
];

app.use(cors({
    origin: function(origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error("Not allowed by CORS"));
        }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.json());
app.use(cookieParser());

app.use('/api/admin',require('./routes/adminRoutes'))
app.use('/api/employee',require('./routes/employeeRoutes'));
app.use('/api/supervisor',require('./routes/supervisorRoutes'));
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
