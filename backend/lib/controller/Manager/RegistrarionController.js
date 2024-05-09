const path = require("path");
const fs = require("fs");
const database = require("../../Model");
const RegisDB = database.RegisDB;
const multer = require("multer");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, "..", "..", "uploads")); // 파일 업로드 경로
    },
    filename: function (req, file, cb) {
        // 업로드된 파일의 새로운 이름 설정
        const originalFileName = file.originalname; // 원본 파일의 이름 사용
        cb(null, originalFileName);
    },
});
  
const upload = multer({ storage: storage }).single('file'); // single('file')을 사용하여 하나의 파일을 업로드합니다.

const RegisterController = async (req, res) => {
    try {
        upload(req, res, async function(err) { // multer를 미들웨어로 사용하여 파일을 업로드합니다.
            if (err) {
                return res.status(500).json({ message: "파일 업로드에 실패했습니다." });
            }

            if (!req.file) {
                return res.status(400).json({ message: "파일이 전송되지 않았습니다." });
            }
            
            const { size, price, explanation, productName, position, option } = req.body;

            // 업로드된 파일의 경로
            const filePath = req.file.path;

            const RegisData = {
                fileurl: filePath, // 'fileurl' 필드로 수정
                size: size,
                price: price,
                explanation: explanation,
                productName: productName,
                position: position,
                option: option
            };

            // 데이터베이스에 데이터 추가
            const registration = await RegisDB.create(RegisData);

            // 저장된 데이터 응답
            if (registration) {
                res.status(201).json({ data: registration, message: "데이터가 성공적으로 저장되었습니다." });
            } else {
                res.status(500).json({ message: "데이터 저장에 실패했습니다." });
            }
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { RegisterController };
