import React, { useState } from "react";

const Registration = () => {
    const [selectedFile, setSelectedFile] = useState(null);

    const handleFileChange = (event:any) => {
        setSelectedFile(event.target.files[0]);
    };

    const handleSubmit = (event:any) => {
        event.preventDefault();
        if (selectedFile) {
            console.log("Selected file:", selectedFile);
        } else {
            console.log("No file selected.");
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
                <label htmlFor="price">가격: </label>
                    <input 
                        type="text" 
                        id="price"
                    />
                </div>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default Registration;
