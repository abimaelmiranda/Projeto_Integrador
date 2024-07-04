import multer from "multer";
import { extname, resolve } from "path";

const rand = () => Math.floor(Math.random() * 10000 + 10000);

export default {
    storage: multer.diskStorage({
        fileFilter: (req, file, cb) => {
          if(file.mimetype !== "image/png" && file.mimetype !== "image/jpg" && file.mimetype !== "image/jpeg") {
            return cb(new multer.MulterError("Formato inválido"));
          } 
          return cb(null, true);
        },
        destination: (req, file, cb) => {
            cb(null, resolve(__dirname, "..", "..", "public", "uploads"));
        },
        filename: (req, file, cb) => {
            cb(null, `${Date.now()}_${rand()}${extname(file.originalname)}`);
        },
    }),
}