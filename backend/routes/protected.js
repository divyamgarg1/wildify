// const express = require("express");
// const { authenticateUser } = require("../middleware/authMiddleware");
// const { authorizeRole } = require("../middleware/roleMiddleware");

// const router = express.Router();

// router.post(
//   "/upload",
//   authenticateUser,
//   authorizeRole(["admin", "researcher"]),
//   (req, res) => {
//     res.json({ message: "File uploaded successfully" });
//   }
// );

// router.get(
//   "/analytics",
//   authenticateUser,
//   authorizeRole(["admin", "researcher", "viewer"]),
//   (req, res) => {
//     res.json({ message: "Analytics data" });
//   }
// );

// module.exports = router;


// backend/routes/protected.js
// backend/routes/protected.js
// backend/routes/protected.js
// backend/routes/protected.js
// backend/routes/protected.js
// backend/routes/protected.js
// backend/routes/protected.js
// backend/routes/protected.js
// backend/routes/protected.js
const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const { authenticateToken, authorizeRole } = require("../middleware/authMiddleware");
const File = require("../models/File");
const User = require("../models/User");
const fs = require("fs");

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`),
});

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    const filetypes = /csv|pdf|png|jpg|jpeg/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);
    if (extname && mimetype) return cb(null, true);
    cb(new Error("Unsupported file type"));
  },
  limits: { fileSize: 5 * 1024 * 1024 },
});

// Upload a file (researcher/admin)
router.post(
  "/upload",
  authenticateToken,
  authorizeRole(["admin", "researcher"]),
  upload.single("file"),
  async (req, res) => {
    try {
      console.log("Upload request received:", { user: req.user, file: req.file });
      if (!req.file) {
        return res.status(400).json({ error: "No file uploaded" });
      }

      const fileRecord = await File.create({
        filename: req.file.filename,
        fileUrl: `/uploads/${req.file.filename}`,
        uploadedBy: req.user.id,
      });
      console.log("File record created in database:", fileRecord.toJSON());

      res.status(201).json({ message: "File uploaded successfully", file: fileRecord });
    } catch (error) {
      console.error("Upload error:", error);
      res.status(500).json({ error: "Upload failed", details: error.message });
    }
  }
);

// Fetch files (admin can filter by email, others see their own)
router.get("/files", authenticateToken, async (req, res) => {
  try {
    let files;
    if (req.user.role === "admin" && req.query.email) {
      const researcher = await User.findOne({ where: { email: req.query.email } });
      if (!researcher) {
        return res.status(404).json({ error: "Researcher not found" });
      }
      files = await File.findAll({ where: { uploadedBy: researcher.id } });
    } else {
      files = await File.findAll({ where: { uploadedBy: req.user.id } });
    }
    console.log("Fetched files for user:", req.user.id, files);
    res.json({ files });
  } catch (error) {
    console.error("Fetch files error:", error);
    res.status(500).json({ error: "Failed to fetch files" });
  }
});

// Edit a file (researcher only)
router.put(
  "/files/:id",
  authenticateToken,
  authorizeRole(["researcher"]),
  upload.single("file"),
  async (req, res) => {
    try {
      const file = await File.findByPk(req.params.id);
      if (!file) {
        return res.status(404).json({ error: "File not found" });
      }
      if (file.uploadedBy !== req.user.id) {
        return res.status(403).json({ error: "You can only edit your own files" });
      }

      if (req.file) {
        // Delete old file from uploads directory
        const oldFilePath = path.join(__dirname, "../uploads", file.filename);
        if (fs.existsSync(oldFilePath)) {
          fs.unlinkSync(oldFilePath);
        } else {
          console.warn("Old file not found on disk:", oldFilePath);
        }
        // Update with new file
        file.filename = req.file.filename;
        file.fileUrl = `/uploads/${req.file.filename}`;
      }

      await file.save();
      res.json({ message: "File updated successfully", file });
    } catch (error) {
      console.error("Edit file error:", error);
      res.status(500).json({ error: "Failed to edit file", details: error.message });
    }
  }
);

// Delete a file (researcher only)
router.delete(
  "/files/:id",
  authenticateToken,
  authorizeRole(["researcher"]),
  async (req, res) => {
    try {
      const file = await File.findByPk(req.params.id);
      if (!file) {
        return res.status(404).json({ error: "File not found in database" });
      }
      if (file.uploadedBy !== req.user.id) {
        return res.status(403).json({ error: "You can only delete your own files" });
      }

      const filePath = path.join(__dirname, "../uploads", file.filename);
      console.log("Attempting to delete file:", filePath);

      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
        console.log("File deleted from disk:", filePath);
      } else {
        console.warn("File not found on disk:", filePath);
      }

      await file.destroy();
      console.log("File deleted from database:", file.id);
      res.json({ message: "File deleted successfully" });
    } catch (error) {
      console.error("Delete file error:", error);
      res.status(500).json({ error: "Failed to delete file", details: error.message });
    }
  }
);

router.get("/analytics", authenticateToken, async (req, res) => {
  res.json({ message: "Analytics data placeholder" });
});

module.exports = router;