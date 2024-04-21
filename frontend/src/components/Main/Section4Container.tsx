const Section4Container = ({ src, isHovered, onMouseEnter, onMouseLeave, text, menutext, point }: {
    src: string;
    isHovered: boolean;
    onMouseEnter: () => void;
    onMouseLeave: () => void;
    text: string;
    menutext: string;
    point: string;
}) => (
    <div className="section4-container" onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
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

export default Section4Container;