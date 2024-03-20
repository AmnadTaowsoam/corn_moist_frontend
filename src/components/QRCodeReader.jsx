import React, { useState } from "react";
import { FaPlus, FaTrash } from "react-icons/fa";
import Information from "./Information";

const QRCodeReader = ({ setInterfaceData }) => {
    const [inputText, setInputText] = useState("");
    const [formData, setFormData] = useState({
        queue: "",
        date_receive: "",
        inspectionlot: "",
        batch: "",
        plant: "",
        material: "",
        vendor: "",
        operationno: "",
    });

    const updateFormData = (newData) => {
        setFormData(newData);
    };

    const handleAddClick = (e) => {
        e.preventDefault();
        const parts = inputText.split(",").map((part) => part.trim());
        if (parts.length >= 8) {
        const data = {
            queue: parts[0] || "",
            date_receive: parts[1] || "",
            inspectionlot: parts[2] || "",
            batch: parts[3] || "",
            plant: parts[4] || "",
            material: parts[5] || "",
            vendor: parts[6] || "",
            operationno: parts[7] || "",
        };

        // console.log("Data from input:", data);
        updateFormData(data);
        setInputText("");
        // Update interfaceData state
        setInterfaceData({
            inspecLotNo: data.inspectionlot,
            operationNo: data.operationno,
        });
        console.log("Input data from QRCode successfully....");
        } else {
        // Handle case where input does not have enough parts
        console.log("Invalid input. Please provide all 8 parts.");
        }
    };

    const handleFormDataChange = (key, value) => {
        setFormData((prevFormData) => ({
        ...prevFormData,
        [key]: value,
        }));
    };

    return (
        <>
        <div className="container mx-auto px-12 font-custom">
            <form>
            <div className="grid gap-1 m-1">
                <div className="flex">
                <input
                    type="text"
                    className="border border-gray-300 rounded-lg py-2 px-2 w-full m-1 h-8 text-sm"
                    placeholder=">>>Scan QRCode "
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                />
                <button
                    className="bg-transparent hover:bg-teal-500 text-teal-700 font-semibold hover:text-white py-1 px-1 w-1/4 border border-teal-500 hover:border-transparent rounded-lg m-1 h-8 font-custom text-sm"
                    onClick={handleAddClick}
                >
                    <FaPlus className="inline-block mr-2" />
                    Add
                </button>
                </div>
            </div>
            </form>
            <div>
            <Information
                formData={formData}
                onFormDataChange={handleFormDataChange}
            />
            {/* <InterfaceData interfaceData={interfaceData} /> */}
            </div>
        </div>
        </>
    );
};

export default QRCodeReader;
