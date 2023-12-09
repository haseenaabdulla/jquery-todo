import multer from 'multer';

const storage = multer.diskStorage({
  destination(_, __, cb) {
    cb(null, 'uploads/pdfs/'); // Destination directory for PDF uploads
  },
  filename() {
    // Unique file naming logic for PDFs
    // ...
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'application/pdf') {
    cb(null, true);
  } else {
    cb(new Error('Invalid file format'), false);
  }
};

const pdfUpload = multer({ storage, fileFilter });

export default pdfUpload;
