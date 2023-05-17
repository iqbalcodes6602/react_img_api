const mongoose = require("mongoose");

module.exports = () => {
	const connectionParams = {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	};
	try {
		mongoose.connect('mongodb+srv://iqbal:IiCasop5x31BuEX2@cloudpix-cluster.r2r45sf.mongodb.net/?retryWrites=true&w=majority', connectionParams);
		// mongoose.connect('mongodb://127.0.0.1:27017/hubx', connectionParams);
		console.log("Connected to database successfully");
	} catch (error) {
		console.log(error);
		console.log("Could not connect database!");
	}
};
