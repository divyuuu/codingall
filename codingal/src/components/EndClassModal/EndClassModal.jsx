    // src/components/EndClassModal/EndClassModal.jsx
    import React, { useState } from 'react';
    import './EndClassModal.css';
    import Button from '../Button/Button';

    // This component is a popup that asks for a reason when ending a class
    const EndClassModal = ({ onClose, onEndClass }) => {
    // Track which main option is selected (null, "completed", or "interrupted")
    const [selectedOption, setSelectedOption] = useState(null);
    
    // Track which sub-option is selected (null or one of the options)
    const [selectedSubOption, setSelectedSubOption] = useState(null);
    
    // This tracks text for "Other reason" option
    const [otherReasonText, setOtherReasonText] = useState("");

    // Function to handle main option selection
    const handleMainOptionSelect = (option) => {
        // If clicking the same option again, deselect it
        if (selectedOption === option) {
        setSelectedOption(null);
        } else {
        setSelectedOption(option);
        }
        
        // Reset sub-option when changing main option
        setSelectedSubOption(null);
        setOtherReasonText("");
    };

    // Function to handle sub-option selection
    const handleSubOptionSelect = (option) => {
        // If clicking the same option again, deselect it
        if (selectedSubOption === option) {
        setSelectedSubOption(null);
        setOtherReasonText("");
        } else {
        setSelectedSubOption(option);
        // Clear other reason text if a different option is selected
        if (option !== "other") {
            setOtherReasonText("");
        }
        }
    };

    // Function to handle "Other reason" text input
    const handleOtherReasonChange = (e) => {
        setOtherReasonText(e.target.value);
    };

    // Function that runs when "End Class" button is clicked
    const handleEndClass = () => {
        // Here you would typically save the selected reason
        console.log("Main option:", selectedOption);
        console.log("Sub option:", selectedSubOption);
        console.log("Other reason:", otherReasonText);
        
        // If onEndClass prop is provided, call it
        if (onEndClass) {
        onEndClass();
        } else {
        onClose(); // Fallback to just closing the modal
        }
    };

    return (
        // Background overlay that darkens the rest of the page
        <div className="modal-overlay">
        {/* The actual popup box */}
        <div className="modal-content">
            <h2>Select a reason to end class</h2>
            
            {/* Container for all options */}
            <div className="options-container">
            {/* Main option 1 */}
            <label className={selectedOption === "completed" ? "selected" : ""}>
                <input 
                type="checkbox" 
                checked={selectedOption === "completed"}
                onChange={() => handleMainOptionSelect("completed")}
                />
                Class completed
            </label>
            
            {/* Main option 2 */}
            <label className={selectedOption === "interrupted" ? "selected" : ""}>
                <input
                type="checkbox"
                checked={selectedOption === "interrupted"}
                onChange={() => handleMainOptionSelect("interrupted")}
                />
                Class interrupted/aborted
            </label>

            {/* Sub-options that appear when "Class interrupted" is checked */}
            <div className={`sub-options ${selectedOption === "interrupted" ? 'visible' : ''}`}>
                {/* Sub-option 1 */}
                <label className={selectedSubOption === "noshow" ? "selected" : ""}>
                <input 
                    type="checkbox"
                    checked={selectedSubOption === "noshow"}
                    onChange={() => handleSubOptionSelect("noshow")}
                />
                Student didn't show up
                </label>
                
                {/* Sub-option 2 */}
                <label className={selectedSubOption === "notinterested" ? "selected" : ""}>
                <input 
                    type="checkbox"
                    checked={selectedSubOption === "notinterested"}
                    onChange={() => handleSubOptionSelect("notinterested")}
                />
                Student wasn't interested
                </label>
                
                {/* Sub-option 3 */}
                <label className={selectedSubOption === "connection" ? "selected" : ""}>
                <input 
                    type="checkbox"
                    checked={selectedSubOption === "connection"}
                    onChange={() => handleSubOptionSelect("connection")}
                />
                Connection issues
                </label>
                
                {/* Sub-option 4 with its own sub-input */}
                <label className={selectedSubOption === "other" ? "selected" : ""}>
                <input
                    type="checkbox"
                    checked={selectedSubOption === "other"}
                    onChange={() => handleSubOptionSelect("other")}
                />
                Other reason
                </label>
                
                {/* Text area that appears when "Other reason" is checked */}
                {selectedSubOption === "other" && (
                <textarea 
                    placeholder="Type here" 
                    className="other-reason-input"
                    value={otherReasonText}
                    onChange={handleOtherReasonChange}
                />
                )}
            </div>
            </div>

            {/* Buttons at the bottom */}
            <div className="buttons-container">
            <Button 
                onClick={handleEndClass} 
                disabled={!selectedOption || (selectedOption === "interrupted" && !selectedSubOption)}
            >
                End Class
            </Button>
            <Button onClick={onClose}>Cancel</Button>
            </div>
        </div>
        </div>
    );
    };

    export default EndClassModal;