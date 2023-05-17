const router = require("express").Router();
const Image = require("../models/img");

router.post("/upload", async (req, res) => {
	try {
		const { error } = validate(req.body);
		if (error)
			return res.status(400).send({ message: error.details[0].message });

		// const user = await User.findOne({ email: req.body.email });
		// if (user)
		// 	return res
		// 		.status(409)
		// 		.send({ message: "User with given email already Exist!" });

		// const salt = await bcrypt.genSalt(Number("hubx"));
		// const hashPassword = await bcrypt.hash(req.body.password, salt);

		await new Image({
			user: req.body.user,
			title: req.body.title,
			description: req.body.description,
			viewsCount: req.body.viewsCount
		}).save();
		res.status(201).send({ message: "Image uploaded successfully" });
	} catch (error) {
		res.status(500).send({ message: "Internal Server Error" });
	}
});

router.get("/images", async (req, res) => {
	try {
		const images = await Image.find();
		res.status(200).send(images);
	} catch (error) {
		res.status(500).send({ message: "Internal Server Error" });
	}
});


module.exports = router;
