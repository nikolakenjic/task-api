const express = require('express');
const tasksRouter = require('./routes/tasks');
// const mongoose = require('mongoose');
const connectDB = require('./db/connect');
require('dotenv').config();
const notFound = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');

const app = express();

// Middlewere
app.use(express.static('./public'));
app.use(express.json());
/* If we do not use that we dont have have json in req.body */

// Routes
app.use('/api/v1/tasks', tasksRouter);

app.use(notFound);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () => {
      console.log(`Server runing on a port ${port}...`);
    });
  } catch (err) {
    console.log(err);
  }
};

start();

// mongoose
//   .connect(connectionString, {
//     useNewUrlParser: true,
//     useCreateIndex: true,
//     useFindAndModify: false,
//     useUnifiedTopology: true,
//   })
//   .then(() => {
//     console.log('Conected to DB...');
//     app.listen(port, () => {
//       console.log(`Server runing on a port ${port}...`);
//     });
//   })
//   .catch((err) => console.log(err));
