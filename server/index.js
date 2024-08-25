const express = require('express');
require('dotenv').config();
const { userRouter } = require('./routes/userRoute');
const { courseRouter } = require('./routes/coursesRoutes');
const cors = require('cors');

const port = process.env.PORT;
const app = express();

app.use(express.urlencoded({ extended:true }))
app.use(express.json());
app.use(cors({
    origin: 'http://localhost:3000',
}))

app.use('/users', userRouter);
app.use('/courses', courseRouter);

app.all('*', (req, res) => {
    res
      .status(500)
      .json({ message: 'Invalid endpoint' });
})

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
})