import React, { useState } from "react";
import {
    MyBagIcon,
    MyBagHoverIcon,
    MyPageIcon,
    MyPageHoverIcon,
    SearchHoverIcon,
    SearchIcon
} from "../../assets/image/index";
import {Link} from "react-router-dom";

interface HeaderProps {
    setSearchClick: React.Dispatch<React.SetStateAction<boolean>>;
    setMypageClick: React.Dispatch<React.SetStateAction<boolean>>;
    setHeaderOptionClick: React.Dispatch<React.SetStateAction<string>>;
}

const Header: React.FC<HeaderProps> = ({ setSearchClick, setMypageClick, setHeaderOptionClick }) => {
    const [hoveredIcon, setHoveredIcon] = useState<number | null>(null);

    const icons = [
        { normal: SearchIcon, hover: SearchHoverIcon },
        { normal: MyBagIcon, hover: MyBagHoverIcon },
        { normal: MyPageIcon, hover: MyPageHoverIcon }
    ];

    const handleIconHover = (index: number) => {
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
        setHeaderOptionClick(menuItem);
    };

    return (
        <div className="Header">
            <div className="Logo">
                로고
            </div>
            <div className="Menu">
                <Link to="/productDetail" className="span" onClick={() => handleMenuClick("TOP")}>TOP</Link>
                <Link to="/productDetail" className="span" onClick={() => handleMenuClick("BOTTOM")}>BOTTOM</Link>
                <Link to="/productDetail" className="span" onClick={() => handleMenuClick("OUTER")}>OUTER</Link>
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
                            alt={index === 0 ? "Search Icon" : index === 1 ? "MyBag Icon" : "MyPage Icon"}
                        />
                        {index === 2 && <span style={{fontSize:'11px', color:'#fff'}}>10,000point</span>}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Header;
