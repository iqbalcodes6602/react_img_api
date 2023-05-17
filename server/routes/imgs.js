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

router.get("/images/:userId", async (req, res) => {
	try {
		const userId = req.params.userId;
		const images = await Image.find({ user: userId });
		res.status(200).send(images);
	} catch (error) {
		res.status(500).send({ message: "Internal Server Error" });
	}
});

router.post("/:id/view", async (req, res) => {
	try {
		const image = await Image.findById(req.params.id);
		if (!image) {
			return res.status(404).send({ message: "Image not found" });
		}

		image.viewsCount += 1;
		await image.save();

		res.status(200).send({ message: "Image view count updated" });
	} catch (error) {
		res.status(500).send({ message: "Internal Server Error" });
	}
});

module.exports = router;