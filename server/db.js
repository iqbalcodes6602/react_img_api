const mongoose = require("mongoose");

module.exports = () => {
	const connectionParams = {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	};
	try {
		// mongoose.connect('mongodb+srv://mohdabd6602:kyFGuzJ5S4v95gkZ@cluster0.sokktjd.mongodb.net/', connectionParams);
		// mongoose.connect('mongodb+srv://iqbal:qJiI1unxi6Ih9eql@cluster0.sp50fhr.mongodb.net/hubxdb?retryWrites=true&w=majority', connectionParams);
		
		mongoose.connect('mongodb://127.0.0.1:27017/hubx', connectionParams);
		console.log("Connected to database successfully");
	} catch (error) {
		console.log(error);
		console.log("Could not connect database!");
	}
};
