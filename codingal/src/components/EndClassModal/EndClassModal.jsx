   
    import React, { useState } from 'react';
    import './EndClassModal.css';
    import Button from '../Button/Button';

    
    const EndClassModal = ({ onClose, onEndClass }) => {

    const [selectedOption, setSelectedOption] = useState(null);
    
    
    const [selectedSubOption, setSelectedSubOption] = useState(null);
    
    
    const [otherReasonText, setOtherReasonText] = useState("");

    
    const handleMainOptionSelect = (option) => {
    
        if (selectedOption === option) {
        setSelectedOption(null);
        } else {
        setSelectedOption(option);
        }
        
    
        setSelectedSubOption(null);
        setOtherReasonText("");
    };

    
    const handleSubOptionSelect = (option) => {
    
        if (selectedSubOption === option) {
        setSelectedSubOption(null);
        setOtherReasonText("");
        } else {
        setSelectedSubOption(option);
    
        if (option !== "other") {
            setOtherReasonText("");
        }
        }
    };

    
    const handleOtherReasonChange = (e) => {
        setOtherReasonText(e.target.value);
    };

    
    const handleEndClass = () => {
    
        console.log("Main option:", selectedOption);
        console.log("Sub option:", selectedSubOption);
        console.log("Other reason:", otherReasonText);
        
    
        if (onEndClass) {
        onEndClass();
        } else {
        onClose(); 
        }
    };

    return (
        
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