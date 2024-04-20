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
import SearchModal from "./SearchModal";

interface MainProps {
}

const Mainpage: React.FC<MainProps> = ({ }) => {
    const [hovered, setHovered] = useState(false);
    const [currentSlide, setCurrentSlide] = useState(0);
    const carouselRef = useRef<Carousel>(null);
    const [imageHovered, setImageHovered] = useState({
        img1: false,
        img2: false,
        img3: false,
        img4: false
    });

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
    }, [currentSlide, hovered, goToNextSlide]);

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
                    <ImageContainer
                        src={MainTestImg1}
                        isHovered={imageHovered.img1}
                        onMouseEnter={() => handleImageMouseEnter('img1')}
                        onMouseLeave={() => handleImageMouseLeave('img1')}
                        menutext="Top > Jacket"
                        text="이미지 1"
                        point="16,000point"
                    />
                    <ImageContainer
                        src={MainTestImg2}
                        isHovered={imageHovered.img2}
                        onMouseEnter={() => handleImageMouseEnter('img2')}
                        onMouseLeave={() => handleImageMouseLeave('img2')}
                        menutext="Top > Jacket"
                        text="이미지 2"
                        point="16,000point"
                    />
                </div>
                <div className="TwoRight">
                    <div className="Best">BEST SELLERS</div>
                    <div className="GoodsName">Fullcount Denim Jacket “Dartford”</div>
                    <div className="Explan">
                        풀카운트의 베이직 2세대 자캣을 베이스로 제작<br />
                        되었으며, 13.7OZ 오리지널 잠바브웨 코튼 셀비지<br />
                        데님이 적용 되었습니다.
                    </div>
                    <button>+ 다른 상품 둘러보기</button>
                </div>
            </div>
            <div className="Section2">
                <div className="ThreeRight">
                    <button>+ 다른 상품 둘러보기</button>
                    <div className="GoodsName">Fullcount Denim Jacket “Dartford”</div>
                    <div className="Explan">
                        풀카운트의 베이직 2세대 자캣을 베이스로 제작<br />
                        되었으며, 13.7OZ 오리지널 잠바브웨 코튼 셀비지<br />
                        데님이 적용 되었습니다.
                    </div>
                </div>
                <div className="TwoLeft">
                    <ImageContainer
                        src={MainTestImg1}
                        isHovered={imageHovered.img3}
                        onMouseEnter={() => handleImageMouseEnter('img3')}
                        onMouseLeave={() => handleImageMouseLeave('img3')}
                        menutext="Top > Jacket"
                        text="이미지 3"
                        point="16,000point"
                    />
                    <ImageContainer
                        src={MainTestImg2}
                        isHovered={imageHovered.img4}
                        onMouseEnter={() => handleImageMouseEnter('img4')}
                        onMouseLeave={() => handleImageMouseLeave('img4')}
                        menutext="Top > Jacket"
                        text="이미지 4"
                        point="16,000point"
                    />
                </div>
            </div>
            <div className="Section4">
                <span className="SectionName">BEST SELLERS</span>
                <div className="ScrollImage">
                    <img src={MainTestImg1} />
                    <img src={MainTestImg2} />
                    <img src={MainTestImg1} />
                    <img src={MainTestImg2} />
                    <img src={MainTestImg1} />
                    <img src={MainTestImg2} />
                    <img src={MainTestImg1} />
                    <img src={MainTestImg2} />
                </div>
                <div className="Add4Section">
                    <button>+ 더보기</button>
                </div>
            </div>
        </div>
    );
};

const ImageContainer = ({ src, isHovered, onMouseEnter, onMouseLeave, text, menutext, point }: {
    src: string;
    isHovered: boolean;
    onMouseEnter: () => void;
    onMouseLeave: () => void;
    text: string;
    menutext: string;
    point: string;
}) => (
    <div className="image-container" onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
        <img src={src} alt={text} />
        {isHovered &&
            <div className="image-text">
                <div className="ImageMenuText">{menutext}</div>
                <div className="ImageText">{text}</div>
                <div className="ImagePointText">{point}</div>
            </div>
        }
    </div>
);


export default Mainpage;
