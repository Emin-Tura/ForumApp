import mongoose from "mongoose";

// process.env.MONGO_URI
const startServer = async () => {
  const connect = await mongoose.connect("mongodb://0.0.0.0:27017", {
    dbName: process.env.DB_NAME,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  console.log(`MongoDB connected: ${connect.connection.host}`);
};
export default startServer;
