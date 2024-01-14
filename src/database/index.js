import mongoose from "mongoose"

// const configOptions = {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
// }

const connectToDb = async () => {
    const connectionUrl = 'mongodb+srv://ubaidrazabawany13:jxeChP4sr0iZmuiu@cluster0.sii5yv4.mongodb.net/';

    mongoose.connect(connectionUrl).then(() => console.log("Ecommmerce Database connected Successfully!")).catch((err) => console.log(`Getting error from Db Connection ${err.message}`))
}

export default connectToDb;