const { RegisDB } = require("../../Model");

const MenuController = async (req, res) => {
    try {
        const { selectedOptions, HeaderOptionClick } = req.body;
        let whereClause = { position: HeaderOptionClick };

        // selectedOptions 값이 존재하거나 빈 배열이 아닌 경우 where 절에 추가
        if (selectedOptions && selectedOptions.length > 0) {
            whereClause.option = selectedOptions;
        }

        // 데이터베이스에서 해당 position 및 선택된 옵션을 가진 아이템을 조회
        const items = await RegisDB.findAll({
            where: whereClause
        });

        // 프론트엔드로 결과 반환
        res.status(200).json(items);
    } catch (error) {
        console.error('MenuController에서 오류 발생:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = { MenuController };
