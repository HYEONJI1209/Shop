import React, { useState, useRef, useEffect } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import {
    MainSlide1,
    MainSlide2,
    MainSlide3,
    SlideRightArrow,
    SlideLeftArrow,
    MainTestImg1,
    MainTestImg2
} from "../../assets/image/index";
import { ImageContainer, Section4Container } from "../index";
import ScrollToTop from "./ScrollToTop";

interface MainProps { }

const Mainpage: React.FC<MainProps> = () => {
    const [hovered, setHovered] = useState(false);
    const [currentSlide, setCurrentSlide] = useState(0);
    const carouselRef = useRef<Carousel>(null);
    const [imageHovered, setImageHovered] = useState<{ [key: string]: boolean }>({
        img1: false,
        img2: false,
        img3: false,
        img4: false,
        img5: false,
        img6: false,
        img7: false,
        img8: false,
    } as { [key: string]: boolean });

    const handleImageMouseEnter = (img: any) => {
        setImageHovered(prevState => ({ ...prevState, [img]: true }));
    };

    const handleImageMouseLeave = (img: any) => {
        setImageHovered(prevState => ({ ...prevState, [img]: false }));
    };

    const handleMouseEnter = () => {
        setHovered(true);
    };

    const handleMouseLeave = () => {
        setHovered(false);
    };

    const handleSlideChange = (index: number) => {
        setCurrentSlide(index);
    };

    const goToPrevSlide = () => {
        setCurrentSlide((currentSlide - 1 + 3) % 3);
    };

    const goToNextSlide = () => {
        setCurrentSlide((currentSlide + 1) % 3);
    };

    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (!hovered) {
            interval = setInterval(goToNextSlide, 4000);
        }
        return () => clearInterval(interval);
    }, [currentSlide, hovered]);

    const Section2Containers = [
        { id: 'img1', src: MainTestImg1, menutext: 'Top > Jacket', text: '이미지 1', point: '16,000point' },
        { id: 'img2', src: MainTestImg2, menutext: 'Top > Jacket', text: '이미지 2', point: '16,000point' }
    ];

    const imageContainers = [
        { id: 'img1', src: MainTestImg1, menutext: 'Top > Jacket', text: '이미지 1', point: '16,000point' },
        { id: 'img2', src: MainTestImg2, menutext: 'Top > Jacket', text: '이미지 2', point: '16,000point' },
        { id: 'img1', src: MainTestImg1, menutext: 'Top > Jacket', text: '이미지 1', point: '16,000point' },
        { id: 'img2', src: MainTestImg2, menutext: 'Top > Jacket', text: '이미지 2', point: '16,000point' },
    ];

    const section4Containers = [
        { id: 'img1', src: MainTestImg1, menutext: 'Top > Jacket', text: '이미지 4', point: '16,000point' },
        { id: 'img2', src: MainTestImg2, menutext: 'Top > Jacket', text: '이미지 4', point: '16,000point' },
        { id: 'img3', src: MainTestImg1, menutext: 'Top > Jacket', text: '이미지 1', point: '16,000point' },
        { id: 'img4', src: MainTestImg2, menutext: 'Top > Jacket', text: '이미지 2', point: '16,000point' },
        { id: 'img5', src: MainTestImg1, menutext: 'Top > Jacket', text: '이미지 1', point: '16,000point' },
        { id: 'img6', src: MainTestImg2, menutext: 'Top > Jacket', text: '이미지 2', point: '16,000point' },
        { id: 'img7', src: MainTestImg1, menutext: 'Top > Jacket', text: '이미지 1', point: '16,000point' },
        { id: 'img8', src: MainTestImg2, menutext: 'Top > Jacket', text: '이미지 2', point: '16,000point' },
    ];

    return (
        <div className="MainPage">
            {hovered && (
                <div className="slider-buttons">
                    <div className="prev" onClick={goToPrevSlide} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                        <img src={SlideLeftArrow} alt="Left Arrow" />
                    </div>
                    <div className="next" onClick={goToNextSlide} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                        <img src={SlideRightArrow} alt="Right Arrow" />
                    </div>
                </div>
            )}
            <Carousel
                className="Slider"
                showArrows={false}
                showStatus={false}
                autoPlay={!hovered}
                interval={4000}
                selectedItem={currentSlide}
                onChange={handleSlideChange}
                ref={carouselRef}
                showThumbs={false}
                showIndicators={true}
            >
                <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                    <img src={MainSlide1} alt="이미지 1" />
                </div>
                <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                    <img src={MainSlide2} alt="이미지 2" />
                </div>
                <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                    <img src={MainSlide3} alt="이미지 3" />
                </div>
            </Carousel>

            <div className="Section2">
                <div className="TwoLeft">
                    {Section2Containers.map((image) => (
                        <ImageContainer
                            key={image.id}
                            src={image.src}
                            isHovered={imageHovered[image.id]}
                            onMouseEnter={() => handleImageMouseEnter(image.id)}
                            onMouseLeave={() => handleImageMouseLeave(image.id)}
                            menutext={image.menutext}
                            text={image.text}
                            point={image.point}
                        />
                    ))}
                </div>
                <div className="TwoRight">
                    <div className="Best">BEST SELLERS</div>
                    <div className="GoodsName">Fullcount Denim Jacket “Dartford”</div>
                    <div className="Explan">
                        거친 남성성과 반항적인 분위기를 떠올리게 하는 <br />
                        라이더 자켓은 그 강렬한 이미지 덕에 수많은 영화 속 남자 주인공들의<br />
                        의상으로 선택되어 왔습니다
                    </div>
                    <button>+ 다른 상품 둘러보기</button>
                </div>
            </div>
            <div className="Section3">
                <div className="Se3Name">NEW ARRIVALS</div>
                <div className="Section3_image">
                    {imageContainers.map((image) => (
                        <ImageContainer
                            key={image.id}
                            src={image.src}
                            isHovered={imageHovered[image.id]}
                            onMouseEnter={() => handleImageMouseEnter(image.id)}
                            onMouseLeave={() => handleImageMouseLeave(image.id)}
                            menutext={image.menutext}
                            text={image.text}
                            point={image.point}
                        />
                    ))}
                </div>
                <div className="Section3_image">
                    {imageContainers.map((image) => (
                        <ImageContainer
                            key={image.id}
                            src={image.src}
                            isHovered={imageHovered[image.id]}
                            onMouseEnter={() => handleImageMouseEnter(image.id)}
                            onMouseLeave={() => handleImageMouseLeave(image.id)}
                            menutext={image.menutext}
                            text={image.text}
                            point={image.point}
                        />
                    ))}
                </div>
                <div className="AddPlus">
                    <button>+ 다른 상품 둘러보기</button>
                </div>
            </div>

            <div className="Section3-1">
                <div className="Named3-1">“WildFix Provides Genuine Product”</div>
                <div className="Explan3-1">
                    WildFix는 빈티지의 본질을 전달합니다.<br />
                    과거의 우아함과 현대의 품질을 결합해 시대를 초월한 제품을 제공합니다.<br />
                    각 제품은 고유하며 진품임이 보장됩니다.<br />
                    WildFix와 함께 역사의 발자취를 따라가며 과거의 매력을 현재에 불어넣어 보세요.
                </div>
            </div>
            <div className="Section4">
                <span className="SectionName">BEST SALE</span>
                <div className="ScrollImage">
                    {section4Containers.map((image) => (
                        <Section4Container
                            key={image.id}
                            src={image.src}
                            isHovered={imageHovered[image.id]}
                            onMouseEnter={() => handleImageMouseEnter(image.id)}
                            onMouseLeave={() => handleImageMouseLeave(image.id)}
                            menutext={image.menutext}
                            text={image.text}
                            point={image.point}
                        />
                    ))}
                </div>
                <div className="Add4Section">
                    <button>+ 더보기</button>
                </div>
            </div>
            <ScrollToTop />
            <div className="Section5">
                안녕하세요, WildFix 개발진입니다.<br />
                저희 사이트는 포트폴리오 사용 용도로 실제 제품 구매가 이루어지지 않는 점 양해 부탁드립니다.<br />
                개별 연락은 하단 이메일로 부탁드리며, 저희 사이트에 방문해 주셔서 감사합니다.
            </div>
        </div>
    );
};

export default Mainpage;
