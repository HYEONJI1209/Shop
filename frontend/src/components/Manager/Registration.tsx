import React, { useState } from "react";
import { PostRegistration } from "../../services/Manager/RegistrationServices";

const Registration = () => {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [selectedFile2, setSelectedFile2] = useState<File | null>(null);
    const [selectedFile3, setSelectedFile3] = useState<File | null>(null);
    const [selectedFile4, setSelectedFile4] = useState<File | null>(null);
    const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
    const [price, setPrice] = useState("");
    const [position, setPosition] = useState<string>('');
    const [options, setOptions] = useState<string[]>([]);
    const [selectedOption, setSelectedOption] = useState<string>('');

    const handleFileChange = (event: any) => {
        setSelectedFile(event.target.files[0]);
    };
    const handleFile2Change = (event: any) => {
        setSelectedFile2(event.target.files[0]);
    };
    const handleFile3Change = (event: any) => {
        setSelectedFile3(event.target.files[0]);
    };
    const handleFile4Change = (event: any) => {
        setSelectedFile4(event.target.files[0]);
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

    const handleSubmit = async (event: any) => {
        event.preventDefault();
        if (selectedFile && selectedFile2 && selectedFile3 && selectedFile4 && selectedSizes.length > 0 && price && position && selectedOption) {
            const formData = new FormData();
            formData.append("file", selectedFile);
            formData.append("file2", selectedFile2);
            formData.append("file3", selectedFile3);
            formData.append("file4", selectedFile4);
            formData.append("fileName", selectedFile.name);
            formData.append("fileName2", selectedFile2.name);
            formData.append("fileName3", selectedFile3.name);
            formData.append("fileName4", selectedFile4.name);
            formData.append("size", selectedSizes.join(","));
            formData.append("price", price);
            formData.append("productName", selectedFile.name.slice(0, -4));
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
                    <label htmlFor="fileInput">Upload Image1:</label>
                    <input
                        type="file"
                        id="fileInput"
                        accept="image/*"
                        onChange={handleFileChange}
                    />
                </div>
                <div>
                    <label htmlFor="fileInput2">Upload Image2:</label>
                    <input
                        type="file"
                        id="fileInput2"
                        accept="image/*"
                        onChange={handleFile2Change}
                    />
                </div>
                <div>
                    <label htmlFor="fileInput3">Upload Image3:</label>
                    <input
                        type="file"
                        id="fileInput3"
                        accept="image/*"
                        onChange={handleFile3Change}
                    />
                </div>
                <div>
                    <label htmlFor="fileInput4">Upload Image4:</label>
                    <input
                        type="file"
                        id="fileInput4"
                        accept="image/*"
                        onChange={handleFile4Change}
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
                    <label htmlFor="small">S</label><br />
                    <input
                        type="checkbox"
                        id="medium"
                        value="medium"
                        checked={selectedSizes.includes("medium")}
                        onChange={handleSizeChange}
                    />
                    <label htmlFor="medium">M</label><br />
                    <input
                        type="checkbox"
                        id="large"
                        value="large"
                        checked={selectedSizes.includes("large")}
                        onChange={handleSizeChange}
                    />
                    <label htmlFor="large">L</label><br />
                    <input
                        type="checkbox"
                        id="xlarge"
                        value="xlarge"
                        checked={selectedSizes.includes("xlarge")}
                        onChange={handleSizeChange}
                    />
                    <label htmlFor="xlarge">XL</label><br />
                    <input
                        type="checkbox"
                        id="2xlarge"
                        value="2xlarge"
                        checked={selectedSizes.includes("2xlarge")}
                        onChange={handleSizeChange}
                    />
                    <label htmlFor="2xlarge">2XL</label><br />
                    <input
                        type="checkbox"
                        id="3xlarge"
                        value="3xlarge"
                        checked={selectedSizes.includes("3xlarge")}
                        onChange={handleSizeChange}
                    />
                    <label htmlFor="3xlarge">3XL</label><br />
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
                <label htmlFor="productName">제품 명: {selectedFile ? selectedFile.name.slice(0, -4) : ''}</label>
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
