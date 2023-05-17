const router = require("express").Router();
const Image = require("../models/img");
const jwt = require("jsonwebtoken")

router.post("/upload", async (req, res) => {
	try {
		await new Image({
			user: req.body.user,
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