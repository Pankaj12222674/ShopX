
import multer from 'multer';
import { v2 as cloudinary } from 'cloudinary';
import path from 'path';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});
// Store uploaded files temporarily in memory
const storage = multer.memoryStorage();

const upload = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // Maximum 5 MB
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = [
      'image/jpeg',
      'image/png',
      'image/webp',
    ];

    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Only JPEG, PNG, and WebP images are allowed'));
    }
  },
});

// Upload the image buffer directly to Cloudinary
const uploadImage = async (req, folder = 'shopx/products') => {
  if (!req.file) {
    throw new Error('No image file provided');
  }

  return cloudinary.uploader.upload(
    `data:${req.file.mimetype};base64,${req.file.buffer.toString('base64')}`,
    {
      folder,
    }
  );
};

export { upload, uploadImage };
