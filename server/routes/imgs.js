const router = require("express").Router();
const Image = require("../models/img");
const jwt = require("jsonwebtoken")

router.post("/upload", async (req, res) => {
	try {
		const { token } = req.body.user;
		// Verify and decode the JWT token
		const decodedToken = jwt.verify(token, 'hubx');
		const userId = decodedToken.userId;

		await new Image({
			user: userId,
			title: req.body.title,
			description: req.body.description,
			cloudinaryUrl: req.body.cloudinaryUrl,
			viewsCount: req.body.viewsCount
		}).save();

		res.status(201).send({ message: "Image uploaded successfully" });
	} catch (error) {
		res.status(500).send({ message: "Internal Server Error: " + error.message });
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