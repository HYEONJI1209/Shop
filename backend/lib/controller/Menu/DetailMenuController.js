const { RegisDB } = require("../../Model");

const MenuController = async (req, res) => {
    try {
        const { selectedOptions, HeaderOptionClick } = req.body;

        // 데이터베이스에서 해당 옵션을 가진 아이템을 조회
        const items = await RegisDB.findAll({
            where: {
                position: HeaderOptionClick,
                option: selectedOptions
            }
        });

        // 프론트엔드로 결과 반환
        res.status(200).json(items);
    } catch (error) {
        console.error('MenuController에서 오류 발생:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = { MenuController };
