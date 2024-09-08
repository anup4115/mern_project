import mongoose from "mongoose";

// Use environment variables for sensitive data.
const mongoURI = process.env.MONGO_URI || "mongodb+srv://fooddelivery:PASSWORD@cluster0.qwycm.mongodb.net/fooddelivery?retryWrites=true&w=majority&appName=Cluster0";

const connectDB = async () => {
    try {
        await mongoose.connect(mongoURI);
        console.log("Successfully Connected to MongoDB...");

        // Accessing the collections
        const fetched_data = mongoose.connection.db.collection("fooditems");
        const foodCategory = mongoose.connection.db.collection("foodcategory");

        // Fetching the data using promises with async/await
        const foodItemsData = await fetched_data.find({}).toArray();
        const foodCategoryData = await foodCategory.find({}).toArray();

        global.fooditems = foodItemsData;
        global.foodcategory = foodCategoryData;

        console.log("Data fetched and global variables set.");

    } catch (err) {
        console.error("Error connecting to MongoDB:", err);
        process.exit(1);
    }
};

export default connectDB;
