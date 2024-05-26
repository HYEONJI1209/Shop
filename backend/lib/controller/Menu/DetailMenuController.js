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

const EachItemController = async (req, res) => {
    try {
        const { clickedItem } = req.body;
        // 클라이언트에서 전달된 데이터를 clickedItem으로 받습니다.

        if (!clickedItem) {
            // 클라이언트로부터 clickedItem이 전달되지 않았을 경우 에러를 반환합니다.
            return res.status(400).json({ error: 'Clicked item is missing.' });
        }

        const items = await RegisDB.findAll({
            where: { productName: clickedItem }
        });

        res.status(200).json(items);
    } catch (error) {
        console.error('상품 정보를 가져오는 중 오류 발생:', error);
        res.status(500).json({ error: '내부 서버 오류' });
    }
};

const SimilarItemController = async (req, res) => {
    try {
        const { cliPosition } = req.body;

        if (!cliPosition) {
            return res.status(400).json({ error: 'Clicked item is missing.' });
        }

        const items = await RegisDB.findAll({
            where: { position: cliPosition }
        });

        res.status(200).json(items);
    } catch (error) {
        console.error('상품 정보를 가져오는 중 오류 발생:', error);
        res.status(500).json({ error: '내부 서버 오류' });
    }
};


module.exports = { MenuController, EachItemController, SimilarItemController };
