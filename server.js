import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import authRoutes from './routes/authRoute.js';
import categoryRoutes from './routes/categoryRoutes.js'
import productRoutes from './routes/productRoutes.js'
import cors from "cors"
import path from "path"
import { fileURLToPath } from 'url';
dotenv.config();

connectDB();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();

//middlewares
app.use(express.json({ limit: '10mb' }));
app.use(cors({
    origin: '*'
}));
app.use("/api/v1/product", (req, res, next) => {
    res.setHeader("Cache-Control", "no-store, max-age=0"); // Disable caching
    next();
  }, productRoutes);
  app.use(express.static(path.join(__dirname, './client/dist')))
 
  


//routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/category",categoryRoutes);
app.use("/api/v1/product",productRoutes);

app.use("*", function (req, res) {
    res.sendFile(path.join(__dirname, './client/dist/index.html'));
});


app.get('/', (req, res) => {
    res.send("<h1>WELCOME To Apple Doors</h1>")
});

const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log(`Server Running at PORT ${PORT}`);
})
