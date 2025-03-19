    // src/components/Navbar/Navbar.jsx
    import React, { useState, useEffect } from 'react';
    import { Link } from 'react-router-dom';
    import Button from '../Button/Button';
    import EndClassModal from '../EndClassModal/EndClassModal';
    import './Navbar.css';
    // If you have a logo image, uncomment the line below:
    // import codingalLogo from '../../assets/codingal-logo.png'; 

    // This component creates a navigation bar for a coding class interface
    const Navbar = () => {
    // --- STATE VARIABLES ---
    // Controls whether the end class confirmation modal is showing
    const [isModalOpen, setIsModalOpen] = useState(false);
    
    // Controls whether the mobile menu is expanded (for small screens)
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    
    // The timer countdown value in seconds (starts at 10 minutes = 600 seconds)
    const [timeRemaining, setTimeRemaining] = useState(10 * 60);
    
    // Whether the countdown timer is actively running
    const [isTimerActive, setIsTimerActive] = useState(true);

    // --- TIMER EFFECT ---
    // This effect runs the countdown timer
    useEffect(() => {
        // We'll store our timer in this variable
        let timerInterval;
        
        // Only run the timer if it's active and there's time left
        if (isTimerActive && timeRemaining > 0) {
        // Set up a timer that runs every second (1000 milliseconds)
        timerInterval = setInterval(() => {
            // Decrease the time by 1 second
            setTimeRemaining((previousTime) => previousTime - 1);
        }, 1000);
        }
        
        // Clean up function - this runs when the component unmounts or when dependencies change
        return () => {
        // Stop the timer to prevent memory leaks
        clearInterval(timerInterval);
        };
    }, [isTimerActive, timeRemaining]); // Re-run this effect when these values change

    // --- HELPER FUNCTIONS ---
    // Converts seconds into a MM:SS format (e.g., "9:59")
    const formatTimeDisplay = (totalSeconds) => {
        // Calculate minutes and seconds
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = totalSeconds % 60;
        
        // Return formatted time string with leading zero for seconds if needed
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    };

    // Toggles the mobile menu open/closed
    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    // --- MODAL FUNCTIONS ---
    // Opens the end class confirmation modal
    const showEndClassModal = () => {
        setIsModalOpen(true);
    };

    // Closes the end class confirmation modal
    const hideEndClassModal = () => {
        setIsModalOpen(false);
    };

    // Handles when the user confirms ending the class
    const confirmEndClass = () => {
        // Stop the timer
        setIsTimerActive(false);
        // Close the modal
        hideEndClassModal();
        // You could add additional actions here, like redirecting to a summary page
    };

    // --- RENDER THE COMPONENT ---
    return (
        <nav className="navbar">
        {/* Main navbar content */}
        <div className="navbar-container">
            {/* Left side - Logo and brand name */}
            <div className="navbar-logo">
            <div className="logo-container">
                {/* If you have a logo image, uncomment this line and comment out the emoji */}
                {/* <img src={codingalLogo} alt="Codingal" /> */}
                {/* Penguin emoji as a placeholder logo */}
                <div style={{ fontSize: "24px", color: "white" }}>🐧</div>
            </div>
            <span className="brand-name">Codingal</span>
            </div>
            
            {/* Center - Lesson title and navigation links */}
            <div className="navbar-center">
            <div className="lesson-title">Trial Lesson [Grade 1-3]</div>
            <div className="nav-links">
                <Link to="/" className="nav-link">Home</Link>
                <Link to="/posts" className="nav-link">Posts</Link>
            </div>
            </div>
            
            {/* Right side - Timer, End Class button, and hamburger menu */}
            <div className="navbar-right">
            {/* Timer display */}
            <div className="timer">{formatTimeDisplay(timeRemaining)}</div>
            
            {/* End Class button */}
            <Button 
                className="end-class-btn"
                onClick={showEndClassModal}
            >
                End class
            </Button>
            
            {/* Hamburger menu for mobile */}
            <div className="hamburger-menu" onClick={toggleMobileMenu}>
                <div className="hamburger-icon">☰</div>
            </div>
            </div>
        </div>
        
        {/* Mobile menu - only shown when hamburger menu is clicked */}
        {isMobileMenuOpen && (
            <div className="mobile-menu">
            {/* Mobile menu lesson title */}
            <div className="mobile-menu-item">
                <div className="lesson-title">Trial Lesson [Grade 1-3]</div>
            </div>
            
            {/* Mobile navigation links */}
            <div className="mobile-menu-item">
                <Link to="/" className="nav-link" onClick={() => setIsMobileMenuOpen(false)}>Home</Link>
            </div>
            <div className="mobile-menu-item">
                <Link to="/posts" className="nav-link" onClick={() => setIsMobileMenuOpen(false)}>Posts</Link>
            </div>
            
            {/* Mobile menu timer and end class button */}
            <div className="mobile-menu-item">
                <div className="timer">{formatTimeDisplay(timeRemaining)}</div>
                <Button 
                className="end-class-btn"
                onClick={showEndClassModal}
                >
                End class
                </Button>
            </div>
            </div>
        )}
        
        {/* End Class Confirmation Modal - only shown when isModalOpen is true */}
        {isModalOpen && (
            <EndClassModal 
            onClose={hideEndClassModal}
            onEndClass={confirmEndClass}
            />
        )}
        </nav>
    );
    };

    export default Navbar;