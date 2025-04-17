import mongoose from 'mongoose';

const databaseConnection = async () => {
  mongoose
    .connect(process.env.DB_URI)
    .then(conn => {
      console.log(`Database connected successfully : ${conn.connection.host}`);
    })
    .catch(err => {
      console.log(`Database Error : ${err}`);
    });
};

export default databaseConnection;
