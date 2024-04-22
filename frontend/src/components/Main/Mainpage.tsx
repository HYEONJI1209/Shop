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
                        풀카운트의 베이직 2세대 자캣을 베이스로 제작<br />
                        되었으며, 13.7OZ 오리지널 잠바브웨 코튼 셀비지<br />
                        데님이 적용 되었습니다.
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
                <div className="Named3-1">“Curated for you”</div>
                <div className="Explan3-1">
                    Enter a world where style and substance meet.All products are carefully selected to reflect the epitome<br />
                    of quality and taste. We combine the best of contemporary fashion with classic,timeless elegance to<br />
                    create a sophisticated and welcoming atmosphere. Every detail speaks of discretion and luxury.<br />
                    Every garment has been selected with an unwavering commitment to excellence, and explore our<br />
                    carefully curated collection of top brands that epitomize the essence of luxury style.<br />
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
        </div>
    );
};

export default Mainpage;
