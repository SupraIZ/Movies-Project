import path from "path"; // For handling file paths
import express from "express"; // For creating the router
import multer from "multer"; // For handling file uploads

const router = express.Router(); // Create an Express router

// Configure storage for uploaded files
const storage = multer.diskStorage({
  // Set the destination folder for uploaded files
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Files will be stored in the "uploads/" directory
  },

  // Set the filename for uploaded files
  filename: (req, file, cb) => {
    const extname = path.extname(file.originalname); // Extract the file extension
    cb(null, `${file.fieldname}-${Date.now()}${extname}`); // Generate a unique filename
  },
});

// File filter to validate uploaded files
const fileFilter = (req, file, cb) => {
  const filetypes = /jpe?g|png|webp/; // Allowed file extensions
  const mimetypes = /image\/jpe?g|image\/png|image\/webp/; // Allowed MIME types

  const extname = path.extname(file.originalname); // Get the file extension
  const mimetype = file.mimetype; // Get the MIME type

  // Check if the file extension and MIME type are valid
  if (filetypes.test(extname) && mimetypes.test(mimetype)) {
    cb(null, true); // Accept the file
  } else {
    cb(new Error("Images only"), false); // Reject the file with an error
  }
};

// Configure multer with storage and file filter
const upload = multer({ storage, fileFilter });

// Middleware to handle single image uploads
const uploadSingleImage = upload.single("image"); // Expect a single file with the field name "image"

// Route to handle image uploads
router.post("/", (req, res) => {
  uploadSingleImage(req, res, (err) => {
    if (err) {
      // Handle errors during file upload
      res.status(400).send({ message: err.message });
    } else if (req.file) {
      // File uploaded successfully
      res.status(200).send({
        message: "Image uploaded successfully",
        image: `/${req.file.path}`, // Return the file path
      });
    } else {
      // No file provided
      res.status(400).send({ message: "No image file provided" });
    }
  });
});

// Export the router for use in other parts of the application
export default router;