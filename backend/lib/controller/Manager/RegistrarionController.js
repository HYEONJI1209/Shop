const multer = require('multer');

// Multer 설정
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, '../../uploads'); // 파일이 저장될 경로 설정
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname); // 파일명 설정
    }
});

const upload = multer({ storage: storage }).single('file');

const RegisterUser = async (req, res) => {
    try {
        // 파일 업로드 처리
        upload(req, res, async function (err) {
            if (err) {
                return res.status(500).json({ message: "Failed to upload file." });
            }
            // 파일 업로드 성공 시 데이터베이스에 저장할 데이터 구성
            const { size, price, explanation, productName, position, option } = req.body;
            const file = req.file.path; // 업로드된 파일의 경로

            const RegisData = {
                file: file,
                size: size,
                price: price,
                explanation: explanation,
                productName: productName,
                position: position,
                option: option
            };

            // 데이터베이스에 데이터 추가
            const registration = await Registration.create(RegisData);

            // 저장된 데이터 응답
            if (registration) {
                res.status(201).json({ data: registration, message: "Data successfully saved." });
            } else {
                res.status(500).json({ message: "Failed to save data." });
            }
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { RegisterUser };
