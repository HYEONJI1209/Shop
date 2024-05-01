import React, { useState } from "react";
import {
    MyBagIcon,
    MyBagHoverIcon,
    MyPageIcon,
    MyPageHoverIcon,
    SearchHoverIcon,
    SearchIcon
} from "../../assets/image/index";
import {HeaderServices} from "../../services/Header/HeaderServices";

interface HeaderProps {
    setSearchClick: React.Dispatch<React.SetStateAction<boolean>>;
    setMypageClick: React.Dispatch<React.SetStateAction<boolean>>;
}

const Header: React.FC<HeaderProps> = ({ setSearchClick, setMypageClick }) => {
    const [hoveredIcon, setHoveredIcon] = useState(null);

    const icons = [
        { normal: SearchIcon, hover: SearchHoverIcon },
        { normal: MyBagIcon, hover: MyBagHoverIcon },
        { normal: MyPageIcon, hover: MyPageHoverIcon }
    ];

    const handleIconHover = (index: any) => {
        setHoveredIcon(index);
    };

    const handleIconLeave = () => {
        setHoveredIcon(null);
    };

    const handleIconClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>, index: number) => {
        event.stopPropagation();
    
        if (index === 0) {
            setSearchClick(true);
        } else if (index === 2) {
            setMypageClick(true);
        }
    };

    const handleMenuClick = (menuItem: string) => {
        HeaderServices({ menuOption: menuItem });
    };

    return (
        <div className="Header">
            <div className="Logo">
                로고
            </div>
            <div className="Menu">
                <span onClick={() => handleMenuClick("TOP")}>TOP</span>
                <span onClick={() => handleMenuClick("BOTTOM")}>BOTTOM</span>
                <span onClick={() => handleMenuClick("OUTER")}>OUTER</span>
            </div>
            <div className="MyBox">
                {icons.map((icon, index) => (
                    <div
                        className="IconsBoxs"
                        key={index}
                        onMouseEnter={() => handleIconHover(index)}
                        onMouseLeave={handleIconLeave}
                        onClick={(event) => handleIconClick(event, index)}
                        style={{ display: 'flex', flexDirection: index === 2 ? 'column' : 'row', alignItems:'center', justifyContent:'center' }}
                    >
                        <img
                            className="HeaderImage"
                            src={hoveredIcon === index ? icon.hover : icon.normal}
                        />
                        {index === 2 && <span style={{fontSize:'11px', color:'#fff'}}>10,000point</span>}
                    </div>
                ))}
            </div>
        </div>
    )
}
export default Header;
