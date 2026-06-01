const express = require('express');
const cors = require('cors');

const errorMiddleware = require('./middlewares/error.middleware');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'SchoolOne backend is running',
  });
});

app.use('/api/auth', require('./routes/auth.routes'));
app.use('/api/teacher-staff', require('./routes/teacherStaff.routes'));
app.use('/api/students', require('./routes/student.routes'));
app.use('/api/drivers', require('./routes/driver.routes'));

app.use(errorMiddleware);

module.exports = app;