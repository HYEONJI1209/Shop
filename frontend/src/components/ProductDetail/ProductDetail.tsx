import React, { useState, useEffect } from "react";
import { DetailMenuServices } from "../../services/Detail/MenuDetailServices";

interface DetailProps {
    HeaderOptionClick: string;
}

interface Product {
    productName: string;
    position: string;
    fileName: string;
    option: string;
    price: number;
}

const ProductDetail: React.FC<DetailProps> = ({ HeaderOptionClick }) => {
    const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
    const [products, setProducts] = useState<Product[]>([]);

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
            options = ["Knit", "T-Shirts", "Shirts"];
            break;
        case "BOTTOM":
            options = ["Denimopaint", "Trousers", "Short pants"];
            break;
        case "OUTER":
            options = ["Jacket", "Coat", "Padding"];
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
        DetailMenuServices({ selectedOptions: data, HeaderOptionClick })
            .then((response) => {
                if (response.data.length > 0) {
                    setProducts(response.data);
                }
            })
            .catch((error) => {
                // 오류 발생 시 처리
            });
    };

    return (
        <div className="DetailProduct">
            <div className="DetailSelectOption">
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
            <div className="ProductMain">
                {products.slice(0, 1).map((product, index) => (
                    <div>
                        Home / {product.position} / {product.option}
                    </div>
                ))}
                <div className="productList">
                    {products.map((product, index) => (
                        <div className="image-container" key={`product-${index}`} >
                            <img className="Image" src={`http://localhost:3001/uploads/${product.fileName}`} alt={product.fileName} />
                            <div className="image-text">
                                <div className="ImageMenuText">{product.position}&nbsp; &gt; &nbsp;{product.option}</div>
                                <div className="ImageText">{product.productName}</div>
                                <div className="ImagePointText">{product.price}&nbsp;point</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;
