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
        <img className="Image" src={src} alt={text} />
        <div className="image-text">
            <div className="ImageMenuText">{menutext}</div>
            <div className="ImageText">{text}</div>
            <div className="ImagePointText">{point}</div>
        </div>
    </div>
);

export default ImageContainer;