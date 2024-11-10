const express= require("express");
const bodyParser= require("body-parser")
const mongoose= require("mongoose")
const path = require('path');
require("dotenv").config()
const applyRoute= require("./route/route")
const port= process.env.port||8000
const mongo=process.env.mongoUri
const app= express();
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static('public'));
const authMiddleware = require("./middleware/authMiddleware");
const { checkDatabaseRecords } = require('./controller/checkData');
const adminController= require("./controller/adminController") 
mongoose.connect(mongo, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Connected to MongoDB');

        // Check for records in the database
        checkDatabaseRecords(); // Call the function to check records

        // Start the server
        const PORT = process.env.PORT || 3000;
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch(err => {
        console.error('MongoDB connection error:', err);
    });
app.get('/', (req, res) => {
    res.render('index', { title: 'Home Page' });
  });
  app.get('/register', (req, res) => {
    res.render('register', { title: 'Registration Page' });
  });
  app.get('/about', (req, res) => {
    res.render('about', { title: 'About Page' });
  });
  app.get('/privacypolicy', (req, res) => {
    res.render('privacypolicy', { title: 'Privacy-policy Page' });
  });
  app.get('/admin/login', (req, res) => {
    res.render('admin', { title: 'Admin Login' });
  });
  app.get('/admin/dashboard',  adminController.getDashboardData);
  app.get('/admin/dashboard', (req, res) => {
    res.render('dashboard', { title: 'Admin Dashboard' });
  });

app.use("/", applyRoute)