const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./src/config/db');
const taskRoutes = require('./src/routes/taskRoutes');
const auth = require('./src/routes/auth');
dotenv.config();

connectDB();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api' , taskRoutes);
app.use('/api/auth', auth );
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
