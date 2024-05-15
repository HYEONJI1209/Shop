const path = require("path");
const multer = require("multer");
const database = require("../../Model");
const RegisDB = database.RegisDB;

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

const upload = multer({ storage: storage }).fields([
    { name: 'file', maxCount: 1 },
    { name: 'file2', maxCount: 1 },
    { name: 'file3', maxCount: 1 },
    { name: 'file4', maxCount: 1 },
]);

const RegisterController = async (req, res) => {
    try {
        upload(req, res, async function (err) { // multer를 미들웨어로 사용하여 파일을 업로드합니다.
            if (err) {
                return res.status(500).json({ message: "파일 업로드에 실패했습니다." });
            }

            const {
                size,
                fileName,
                fileName2,
                fileName3,
                fileName4,
                price,
                // explanation,
                productName,
                position,
                option
            } = req.body;

            if (!req.files || !req.files['file'] || !req.files['file2'] || !req.files['file3'] || !req.files['file4']) {
                return res.status(400).json({ message: "파일이 전송되지 않았습니다." });
            }

            const generateImgChartURL = (filename) => {
                return `/uploads/${filename}`;
            };

            const createChartImageURL = generateImgChartURL(fileName);
            const createChartImageURL2 = generateImgChartURL(fileName2);
            const createChartImageURL3 = generateImgChartURL(fileName3);
            const createChartImageURL4 = generateImgChartURL(fileName4);

            const RegisData = {
                fileurl: createChartImageURL,
                fileurl2: createChartImageURL2,
                fileurl3: createChartImageURL3,
                fileurl4: createChartImageURL4,
                fileName: fileName,
                fileName2: fileName2,
                fileName3: fileName3,
                fileName4: fileName4,
                size: size,
                price: price,
                // explanation: explanation,
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
