import React, { useState, useEffect } from "react";
import { DetailMenuServices } from "../../services/Detail/MenuDetailServices";
import { useNavigate } from "react-router-dom";

interface DetailProps {
    setHeaderOptionClick: React.Dispatch<React.SetStateAction<string>>;
    HeaderOptionClick: string;
}

interface Product {
    productName: string;
    position: string;
    fileName: string;
    option: string;
    price: number;
}

const ProductDetail: React.FC<DetailProps> = ({ HeaderOptionClick, setHeaderOptionClick }) => {
    const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
    const [products, setProducts] = useState<Product[]>([]);
    const [optionClick, setOptionClick] = useState(false);
    const [sortOption, setSortOption] = useState<string>('정렬기준');
    const [clickedItem, setClickedItem] = useState<string>('');

    const navigate = useNavigate();

    useEffect(() => {
        // 컴포넌트가 마운트될 때 로컬 스토리지에서 저장된 값 로드
        const lastClickedHeaderOption = localStorage.getItem('lastClickedHeaderOption');
        if (lastClickedHeaderOption) {
            // 로드된 값이 있다면 HeaderOptionClick 상태 업데이트
            setHeaderOptionClick(lastClickedHeaderOption);
        }
    }, []);

    // HeaderOptionClick이 변경될 때마다 실행되는 useEffect
    useEffect(() => {
        // 변경된 HeaderOptionClick 값을 로컬 스토리지에 저장
        localStorage.setItem('lastClickedHeaderOption', HeaderOptionClick);
        sendDataToBackend(selectedOptions);
    }, [HeaderOptionClick]);

    useEffect(() => {
        // 변경된 clickedItem 값을 로컬 스토리지에 저장
        localStorage.setItem('clickedProduct', clickedItem)
    }, [clickedItem]);

    // 선택된 옵션이 변경될 때마다 실행되는 useEffect
    useEffect(() => {
        sendDataToBackend(selectedOptions);
    }, [selectedOptions]);

    useEffect(() => {
        sortProducts(sortOption);
    }, [sortOption]);

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

    const OpenOption = () => {
        setOptionClick(!optionClick);
    }

    const sortProducts = (option: string) => {
        const sortedProducts = [...products];
        switch (option) {
            case '이름 AZ':
                sortedProducts.sort((a, b) => a.productName.localeCompare(b.productName));
                break;
            case '이름 ZA':
                sortedProducts.sort((a, b) => b.productName.localeCompare(a.productName));
                break;
            case '가격 낮은 순':
                sortedProducts.sort((a, b) => a.price - b.price);
                break;
            case '가격 높은 순':
                sortedProducts.sort((a, b) => b.price - a.price);
                break;
            default:
                break;
        }
        setProducts(sortedProducts);
    };

    const handleSortOptionChange = (option: string) => {
        setSortOption(option);
    };

    const handleProductClick = (product: Product) => {
        setClickedItem(product.productName);
        localStorage.setItem('clickedProduct', product.productName);
        navigate('/eachproduct');
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
                        <label htmlFor={`option-${index}`}>{option}</label>
                    </div>
                ))}
            </div>
            <div className="ProductMain">
                <div className="Top">
                    <div>
                        {products.slice(0, 1).map((product, index) => (
                            <div key={index}>
                                Home / {product.position} / {product.option}
                            </div>
                        ))}
                    </div>
                    <div className="optionBox">
                        <div className="productoption" onClick={OpenOption}>
                            {sortOption}
                        </div>
                        {optionClick ? (
                            <div className="optionList">
                                <div onClick={() => handleSortOptionChange('이름 AZ')}>이름 AZ</div>
                                <div onClick={() => handleSortOptionChange('이름 ZA')}>이름 ZA</div>
                                <div onClick={() => handleSortOptionChange('가격 낮은 순')}>가격 낮은 순</div>
                                <div onClick={() => handleSortOptionChange('가격 높은 순')}>가격 높은 순</div>
                            </div>
                        )
                            :
                            (<div></div>)}
                    </div>
                </div>
                <div className="productList">
                    {products.map((product, index) => (
                        <div className="image-container" key={`product-${index}`} onClick={() => handleProductClick(product)}>
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
