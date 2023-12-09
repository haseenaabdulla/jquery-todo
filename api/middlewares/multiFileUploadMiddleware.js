import multer from 'multer';

const storage = multer.diskStorage({
  destination: (_, __, cb) => {
    cb(null, 'uploads/multi/'); // Destination directory for multi-file uploads
  },
  filename: () => {
    // Unique file naming logic
    // ...
  },
});

const fileFilter = (req, file, cb) => {
  // example, check if file.mimetype is valid
  // ...

  cb(null, true);
};

const multiFileUpload = multer({ storage, fileFilter });

export default multiFileUpload;
