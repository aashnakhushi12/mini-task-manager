import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import connectDB from './config/db.js';


//configure env
dotenv.config();

// database connection
connectDB(); 
//rest object
const app = express();

//rest api
app.get('/', (req, res) => {
    res.send('Hello World!');
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
}); 