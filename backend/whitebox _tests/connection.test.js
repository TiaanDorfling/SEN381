const mongoose = require("mongoose");
require("dotenv").config();

describe("MongoDB Atlas Connection Test", () => {
  beforeAll(async () => {
    jest.setTimeout(10000); //  timeout  10s
  });

  it("should successfully connect to MongoDB Atlas", async () => {
    try {
      // Load connection string from .env
      const conn = await mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });

      //  connection is open
      expect(conn.connection.readyState).toBe(1);
      console.log("MongoDB Atlas connection successful");
      
      await mongoose.connection.close();
    } catch (error) {
      console.error("MongoDB Atlas connection failed:", error.message);
      throw error; // fails the test
    }
  });
});
