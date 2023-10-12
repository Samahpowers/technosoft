import multer from "multer";

const storage = multer.memoryStorage(); // Use memory storage to handle file data in memory

const upload = multer({ storage });

export default upload;






































/* multer from "multer";
import { GridFsStorage } from "multer-gridfs-storage";

const storage = new GridFsStorage({
    url: process.env.CONNECTION_STRING,
    options: { useNewUrlParser: true, useUnifiedTopology: true },
    file: (req, file) => {
        const match = ["application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"];

        if (match.indexOf(file.mimetype) === -1) {
            const filename = `${Date.now()}-any-name${file.originalname}`;
            return filename;
        }

        return {
            bucketName: "exam", // Change this to the correct bucket name
            file: `${Date.now()}-any-name${file.originalname}`
        };
    }
});

const upload = multer({ storage });

export default upload;
*/