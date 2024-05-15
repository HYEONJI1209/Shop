import React, { useState } from "react";
import { PostRegistration } from "../../services/Manager/RegistrationServices";

const Registration = () => {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
    const [price, setPrice] = useState("");
    const [explanation, setExplanation] = useState("");
    const [productName, setProductName] = useState("");
    const [position, setPosition] = useState<string>('');
    const [options, setOptions] = useState<string[]>([]);
    const [selectedOption, setSelectedOption] = useState<string>('');

    const handleFileChange = (event: any) => {
        setSelectedFile(event.target.files[0]);
    };

    const handleSizeChange = (event: any) => {
        const { value, checked } = event.target;
        if (checked) {
            setSelectedSizes([...selectedSizes, value]);
        } else {
            setSelectedSizes(selectedSizes.filter(size => size !== value));
        }
    };

    const handlePriceChange = (event: any) => {
        setPrice(event.target.value);
    };

    const handleExplanationChange = (event: any) => {
        setExplanation(event.target.value);
    };

    const handleProductNameChange = (event: any) => {
        setProductName(event.target.value);
    };

    const handleSubmit = async (event: any) => {
        event.preventDefault();
        if (selectedFile && selectedSizes.length > 0 && price && explanation && productName && position && selectedOption) {
            const formData = new FormData();
            formData.append("file", selectedFile);
            formData.append("fileName", selectedFile.name);
            formData.append("size", selectedSizes.join(","));
            formData.append("price", price);
            formData.append("explanation", explanation);
            formData.append("productName", productName);
            formData.append("position", position);
            formData.append("option", selectedOption);
            
            try {
                const response = await PostRegistration(formData);
                console.log("Response from backend:", response.data);
            } catch (error) {
                console.error("Error sending data to backend:", error);
            }
        } else {
            console.log("Please fill in all fields.");
        }
    };
    const handlePositionChange = (event: any) => {
        const selectedPosition = event.target.value;
        setPosition(selectedPosition);

        switch (selectedPosition) {
            case 'top':
                setOptions(['Knit', 'T-Shirts', 'Shirts']);
                break;
            case 'bottom':
                setOptions(['Denimopaint', 'Trousers', 'Short pants']);
                break;
            case 'outer':
                setOptions(['Jacket', 'Coat', 'Padding']);
                break;
            default:
                setOptions([]);
                break;
        }
    };

    const handleOptionChange = (event: any) => {
        setSelectedOption(event.target.value);
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="fileInput">Upload Image:</label>
                    <input
                        type="file"
                        id="fileInput"
                        accept="image/*"
                        onChange={handleFileChange}
                    />
                </div>
                <div>
                    <label>Size:</label><br />
                    <input
                        type="checkbox"
                        id="small"
                        value="small"
                        checked={selectedSizes.includes("small")}
                        onChange={handleSizeChange}
                    />
                    <label htmlFor="small">Small</label><br />
                    <input
                        type="checkbox"
                        id="medium"
                        value="medium"
                        checked={selectedSizes.includes("medium")}
                        onChange={handleSizeChange}
                    />
                    <label htmlFor="medium">Medium</label><br />
                    <input
                        type="checkbox"
                        id="large"
                        value="large"
                        checked={selectedSizes.includes("large")}
                        onChange={handleSizeChange}
                    />
                    <label htmlFor="large">Large</label><br />
                </div>
                <div>
                    <label htmlFor="price">가격: </label>
                    <input
                        type="text"
                        id="price"
                        value={price}
                        onChange={handlePriceChange}
                    />
                </div>
                <div>
                    <label htmlFor="explanation">상세 설명: </label>
                    <input
                        type="text"
                        id="explanation"
                        value={explanation}
                        onChange={handleExplanationChange}
                    />
                </div>
                <div>
                    <label htmlFor="productName">제품 명: </label>
                    <input
                        type="text"
                        id="productName"
                        value={productName}
                        onChange={handleProductNameChange}
                    />
                </div>

                <div>
                    <select value={position} onChange={handlePositionChange}>
                        <option value="">위치를 선택하세요</option>
                        <option value="top">Top</option>
                        <option value="bottom">Bottom</option>
                        <option value="outer">Outer</option>
                    </select>
                    <select value={selectedOption} onChange={handleOptionChange}>
                        <option value="">옵션을 선택하세요</option>
                        {options.map((option, index) => (
                            <option key={index} value={option}>{option}</option>
                        ))}
                    </select>
                </div>

                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default Registration;
