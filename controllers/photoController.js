const Photo = require("../models/Photo");
const photoController = {
  uploadPhoto: async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ message: "No file uploaded" });
      }

      // Create file URL
      const fileUrl = `/uploads/${req.file.filename}`;
      console.log(fileUrl);
      const photo = new Photo({
        userId: req.user.userId,
        imageUrl: fileUrl,
        description: req.body.description || "",
      });

      await photo.save();
      res.status(201).json(photo);
    } catch (error) {
      res.status(500).json({ message: "Server error", error: error.message });
    }
  },

  getPhotos: async (req, res) => {
    try {
      const photos = await Photo.find({ userId: req.user.userId }).sort(
        "-createdAt"
      );
      res.json(photos);
    } catch (error) {
      res.status(500).json({ message: "Server error", error: error.message });
    }
  },
};

module.exports = photoController;