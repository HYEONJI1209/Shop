import React, { useRef, useEffect } from "react";
import { SearchIcon } from "../../assets/image/index";

interface SearchProps {
    setSearchClick: React.Dispatch<React.SetStateAction<boolean>>;
    searchClick: boolean;
}

const SearchModal: React.FC<SearchProps> = ({ setSearchClick, searchClick }) => {
    useEffect(() => {
        const closeSelectBox = (event: MouseEvent) => {
            const target = event.target as HTMLElement;
            const selectBox = document.querySelector(".SearchBox");

            if (selectBox && !selectBox.contains(target)) {
                setSearchClick(false);
            }
        };

        document.addEventListener("click", closeSelectBox);

    }, []);

    return (
        <div className="ModalBackground">
            <div className="SearchBox">
                <input type="text" placeholder="찾으시는 상품의 이름을 적어주세요" />
                <img src={SearchIcon} alt="Search Icon" />
            </div>
        </div>
    );
};

export default SearchModal;
