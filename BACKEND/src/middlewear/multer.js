import multer from "multer";

// Memory storage (useful for quick in-memory file handling)
const uploadMemory = multer({ storage: multer.memoryStorage() });

// Disk storage (saves files to ./public/temp with original name)
const uploadDisk = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => cb(null, "./public/temp"),
    filename: (req, file, cb) => cb(null, file.originalname),
  }),
});

export { uploadMemory, uploadDisk };
