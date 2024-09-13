const express = require('express');
const app = express();
const cors = require("cors");
const bodyParser = require('body-parser');
const employeeRoutes = require('./routes/employeeRoutes');
const directsRoutes = require('./routes/directsRoutes');
const companyRoutes = require('./routes/companyRoutes');
const leaveRoutes = require('./routes/leaveRoutes');
const goalRoutes = require('./routes/goalRoutes');
const reviewRoutes = require('./routes/reviewRoutes');
const expenseRoutes = require('./routes/expenseRoutes');
const requestsRoutes = require('./routes/requestsRoutes');
const authRoutes = require('./routes/authRoutes');

const verifyIdToken = require('./middlewares/verifyToken');

// Middleware
app.use(bodyParser.json());

app.use(cors());

// Routes
app.use('/api/employees', verifyIdToken, employeeRoutes);
app.use('/api/directs', verifyIdToken, directsRoutes);
app.use('/api/companies', verifyIdToken, companyRoutes);
app.use('/api/leaves', verifyIdToken, leaveRoutes);
app.use('/api/reviews', verifyIdToken, reviewRoutes);
app.use('/api/expenses', verifyIdToken, expenseRoutes);
app.use('/api/goals', verifyIdToken, goalRoutes);
app.use('/api/requests', verifyIdToken, requestsRoutes);
app.use('/api/auth', authRoutes);

module.exports = app;
