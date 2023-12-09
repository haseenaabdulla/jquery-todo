import multer from 'multer';

// Define the storage and file naming configuration
const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'uploads/images'); // Destination directory for uploaded files
  },
  filename(req, file, cb) {
    const uniqueSuffix = `${Date.now()} - ${Math.round(Math.random() * 1e9)}`;
    cb(null, `${uniqueSuffix}-${file.originalname}`); // Unique file name
  },
});

// Define file filter options (e.g., allow only image files)
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Invalid file format'), false);
  }
};

// Create the multer upload instance
const upload = multer({ storage, fileFilter });

export default upload;
