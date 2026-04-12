const mongoose = require ("mongoose")

const conncetDB = async()=>{
	try{
		const conn = await mongoose.connect(process.env.MONGO_URI)
		console.log("mongoDB connceted ")
	}catch(error){
		console.log("DB Error ", error.message);
		process.exit(1);
	}
}

module.exports =conncetDB;