import React, { useState } from "react";
import {PostRegistration} from "../../services/Manager/RegistrationServices";

const Registration = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [selectedSize, setSelectedSize] = useState("");
    const [price, setPrice] = useState("");
    const [explanation, setExplanation] = useState("");
    const [productName, setProductName] = useState("");

    const handleFileChange = (event:any) => {
        setSelectedFile(event.target.files[0]);
    };

    const handleSizeChange = (event:any) => {
        setSelectedSize(event.target.value);
    };

    const handlePriceChange = (event:any) => {
        setPrice(event.target.value);
    };

    const handleExplanationChange = (event:any) => {
        setExplanation(event.target.value);
    };

    const handleProductNameChange = (event:any) => {
        setProductName(event.target.value);
    };

    const handleSubmit = async (event:any) => {
        event.preventDefault();
        if (selectedFile && selectedSize && price && explanation && productName) {
            const formData = new FormData();
            formData.append("file", selectedFile);
            formData.append("size", selectedSize);
            formData.append("price", price);
            formData.append("explanation", explanation);
            formData.append("productName", productName);
            
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
                    <label htmlFor="size">Size:</label>
                    <select id="size" value={selectedSize} onChange={handleSizeChange}>
                        <option value="">Select Size</option>
                        <option value="small">Small</option>
                        <option value="medium">Medium</option>
                        <option value="large">Large</option>
                    </select>
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
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default Registration;
