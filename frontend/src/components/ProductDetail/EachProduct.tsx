import React, { useEffect, useState } from "react";
import { FullStar, blankStar, Love, EachBag } from "../../assets/image/index";
import { EachServices, SimilarServices } from "../../services/Detail/MenuDetailServices";

interface Product {
    fileName: string;
    fileName2: string;
    fileName3: string;
    fileName4: string;
    size: string;
    productName: string;
    position: string;
    option: string;
    price: number;
}

const EachProduct = () => {
    const [clickedItem, setClickedItem] = useState<string>('');
    const [products, setProducts] = useState<Product[]>([]);
    const [cliPosition, setCliPosition] = useState<string>('');
    const [similarProducts, setSimilarProducts] = useState<Product[]>([]);
    const [mainImage, setMainImage] = useState<string>('');
    const [activeTab, setActiveTab] = useState<string>('Description');
    const [sizeClick, setSizeClick] = useState<string>('');
    const [numberPlus, setNumberPlus] = useState(1);
    const min = 1;
    const max = 10;

    useEffect(() => {
        const clickProduct = localStorage.getItem('clickedProduct');
        if (clickProduct) {
            setClickedItem(clickProduct);
        }
    }, []);

    useEffect(() => {
        const positions = localStorage.getItem('lastClickedHeaderOption');
        if (positions) {
            setCliPosition(positions);
        }
    }, []);

    useEffect(() => {
        if (clickedItem) {
            sendEachItems();
        }
    }, [clickedItem]);

    useEffect(() => {
        if (cliPosition) {
            sendSimilarItems();
        }
    }, [cliPosition]);

    const sendEachItems = () => {
        const requestData = { clickedItem: clickedItem };

        EachServices(requestData)
            .then((response) => {
                if (response.data.length > 0) {
                    setProducts(response.data);
                }
            })
            .catch((error) => {
                // 오류 발생 시 처리
                console.error("Error fetching product details:", error);
            });
    }

    const sendSimilarItems = () => {
        const requestData = { cliPosition: cliPosition };

        SimilarServices(requestData)
            .then((response) => {
                if (response.data.length > 0) {
                    setSimilarProducts(response.data);
                }
            })
            .catch((error) => {
                // 오류 발생 시 처리
                console.error("Error fetching product details:", error);
            });
    }

    const ClickSize = (size: string) => {
        setSizeClick(size);
    }

    const renderSizes = (sizeString: string) => {
        const sizes = sizeString.split(",");
        return sizes.map((size, index) => (
            <div
                key={index}
                onClick={() => ClickSize(size)}
                className={sizeClick === size ? "clickSize" : ""}
            >
                {size.trim().toUpperCase()}
            </div>
        ));
    }

    const handleImageClick = (imageFileName: string) => {
        setMainImage(imageFileName);
    };

    useEffect(() => {
        if (products.length > 0) {
            setMainImage(products[0].fileName);
        }
    }, [products]);

    const PlusNumber = () => {
        if (numberPlus < max) {
            setNumberPlus(prevNumber => prevNumber + 1);
        }
    }

    const MinusNumber = () => {
        if (numberPlus > min) {
            setNumberPlus(prevNumber => prevNumber - 1);
        }
    }

    return (
        <div className="EachProduct">
            <div className="EachSection">
                <div className="FirstSection">
                    <div className="Left">
                        {products.map((product) => (
                            <>
                                <div className="OptionName">Home / {product.position} &nbsp; &gt; &nbsp; {product.option} <span className="Black">/ {product.productName}</span> </div>
                                <img className="MainImg" src={`http://localhost:3001/uploads/${mainImage}`} />
                                <div className="Btm">
                                    <img className="SubImg" src={`http://localhost:3001/uploads/${product.fileName}`} onClick={() => handleImageClick(product.fileName)} />
                                    <img className="SubImg" src={`http://localhost:3001/uploads/${product.fileName2}`} onClick={() => handleImageClick(product.fileName2)} />
                                    <img className="SubImg" src={`http://localhost:3001/uploads/${product.fileName3}`} onClick={() => handleImageClick(product.fileName3)} />
                                    <img className="SubImg" src={`http://localhost:3001/uploads/${product.fileName4}`} onClick={() => handleImageClick(product.fileName4)} />
                                </div>
                            </>
                        ))}
                    </div>
                    <div className="Right">
                        {products.map((product) => (
                            <>
                                <span className="ProductName">{product.productName}</span>
                                <div className="Review">
                                    <div className="Stars">
                                        <img src={blankStar} />
                                        <img src={blankStar} />
                                        <img src={blankStar} />
                                        <img src={blankStar} />
                                        <img src={blankStar} />
                                    </div>
                                    4.0 (120 Reviews)
                                </div>
                                <span className="productPrice">{product.price} Point</span>

                                <div className="HrBox">
                                    <div className="SizeBox">
                                        <span>사이즈</span>
                                        <div className="Boxs">
                                            {renderSizes(product.size)}
                                        </div>
                                    </div>
                                    <div className="CountBox">
                                        <span>수량</span>
                                        <div className="Option">
                                            <button onClick={MinusNumber}>-</button>
                                            <span>{numberPlus}</span>
                                            <button onClick={PlusNumber}>+</button>
                                        </div>
                                    </div>
                                </div>
                                <div className="Delivery">
                                    무료 배송
                                </div>

                                <div className="BuyBtn">
                                    구매하기
                                </div>
                                <div className="BuyBox">
                                    <div><img src={EachBag} />장바구니에 넣기</div>
                                    <div><img src={Love} />찜하기</div>
                                </div>
                            </>
                        ))}
                    </div>
                </div>
                <div className="Tab">
                    <div className="Option">
                        <div onClick={() => setActiveTab('Description')}>Description</div>
                        <div onClick={() => setActiveTab('Additional Information')}>Additional Information</div>
                        <div onClick={() => setActiveTab('Review')}>Review</div>
                    </div>
                    <div className="OptionData">
                        {activeTab === 'Description' && (
                            <div>
                                우리 쇼핑몰은 고품질 자켓으로 여러분의 스타일을 완성해드립니다.<br />
                                우리의 자켓은 최상급 소재를 사용하여 제작되어 탁월한 내구성과 편안한 착용감을 보장합니다.<br />
                                세련된 디자인과 다양한 컬러 및 사이즈 옵션으로 고객들의 다양한 취향과 체형에 맞는 제품을 찾을 수 있습니다.<br />
                                또한, 우리의 자켓은 다양한 계절과 활동에 맞춰 다양한 스타일을 제공하여 고객들의 다양한 생활양식에 부합합니다.<br />
                                트렌디하면서도 실용적인 우리의 자켓으로 여러분의 패션 센스를 뽐내보세요.<br />
                                최고의 품질과 스타일을 자랑하는 우리 쇼핑몰에서 여러분을 기다리고 있습니다.
                            </div>
                        )}
                        {activeTab === 'Additional Information' && (
                            <div>
                                <span>옷 사이즈</span>
                            </div>
                        )}
                        {activeTab === 'Review' && (
                            <div>
                                <span>리뷰</span>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <div className="Section4">
                <span className="SectionName">RELATED PRODUCTS</span>
                <div className="ScrollImage">
                    {similarProducts.slice(0, 8).map((product, index) => (
                        <div className="image-container" key={`product-${index}`}>
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
    )
}
export default EachProduct;
