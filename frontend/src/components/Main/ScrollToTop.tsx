import React, { useState, useEffect } from "react";
import { ToTopIcon } from "../../assets/image/index";

const ScrollToTop = () => {

    const [showScrollButton, setShowScrollButton] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setShowScrollButton(window.scrollY > 0);
        };

        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);


    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    };

    return (
        <>
            {showScrollButton && (
                <img src={ToTopIcon} onClick={scrollToTop} className="scroll-to-top" />
            )}
        </>
    )
}
export default ScrollToTop;