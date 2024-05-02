import React, { useState, useEffect } from "react";
import { DetailMenuServices } from "../../services/Detail/MenuDetailServices";

interface DetailProps {
    HeaderOptionClick: string;
}

const ProductDetail: React.FC<DetailProps> = ({ HeaderOptionClick }) => {
    const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

    // HeaderOptionClick이 변경될 때마다 실행되는 useEffect
    useEffect(() => {
        sendDataToBackend(selectedOptions);
    }, [HeaderOptionClick]); // HeaderOptionClick 값이 변경될 때만 실행

    // 선택된 옵션이 변경될 때마다 실행되는 useEffect
    useEffect(() => {
        sendDataToBackend(selectedOptions);
    }, [selectedOptions]); // selectedOptions 값이 변경될 때만 실행

    let options: string[] = [];

    switch (HeaderOptionClick) {
        case "TOP":
            options = ["Small", "Medium", "Large"];
            break;
        case "BOTTOM":
            options = ["가", "나", "다"];
            break;
        case "OUTER":
            options = ["A", "B", "C"];
            break;
        default:
            break;
    }

    const handleCheckboxChange = (option: string) => {
        const updatedOptions = selectedOptions.includes(option)
            ? selectedOptions.filter((item) => item !== option)
            : [...selectedOptions, option];
        setSelectedOptions(updatedOptions);
    };

    const sendDataToBackend = (data: string[]) => {
        // 체크박스가 클릭될 때마다 백엔드로 데이터 전송
        DetailMenuServices({ selectedOptions: data, HeaderOptionClick })
            .then((response) => {
                // 성공적으로 서버에 데이터를 보냈을 때의 처리
            })
            .catch((error) => {
                // 오류 발생 시 처리
            });
    };

    return (
        <div>
            {options.map((option, index) => (
                <div key={index}>
                    <input
                        type="checkbox"
                        id={`option-${index}`}
                        value={option}
                        checked={selectedOptions.includes(option)}
                        onChange={() => handleCheckboxChange(option)}
                    />
                    <label htmlFor={`option-${index}`}>{option}</label><br />
                </div>
            ))}
        </div>
    );
};

export default ProductDetail;
