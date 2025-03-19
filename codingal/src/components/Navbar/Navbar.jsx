import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Button from '../Button/Button';
import EndClassModal from '../EndClassModal/EndClassModal';
import './Navbar.css';

const Navbar = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [timeRemaining, setTimeRemaining] = useState(10 * 60);
    const [isTimerActive, setIsTimerActive] = useState(true);

    useEffect(() => {
        let timerInterval;
        if (isTimerActive && timeRemaining > 0) {
            timerInterval = setInterval(() => {
                setTimeRemaining((previousTime) => previousTime - 1);
            }, 1000);
        }
        return () => {
            clearInterval(timerInterval);
        };
    }, [isTimerActive, timeRemaining]);

    const formatTimeDisplay = (totalSeconds) => {
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = totalSeconds % 60;
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    };

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    const showEndClassModal = () => {
        setIsModalOpen(true);
    };

    const hideEndClassModal = () => {
        setIsModalOpen(false);
    };

    const confirmEndClass = () => {
        setIsTimerActive(false);
        hideEndClassModal();
    };

    return (
        <nav className="navbar">
            <div className="navbar-container">
                <div className="navbar-logo">
                    <div className="logo-container">
                        <div style={{ fontSize: "24px", color: "white" }}>🐧</div>
                    </div>
                    <span className="brand-name">Codingal</span>
                </div>
                <div className="navbar-center">
                    <div className="lesson-title">Trial Lesson [Grade 1-3]</div>
                    <div className="nav-links">
                        <Link to="/" className="nav-link">Home</Link>
                        <Link to="/posts" className="nav-link">Posts</Link>
                    </div>
                </div>
                <div className="navbar-right">
                    <div className="timer">{formatTimeDisplay(timeRemaining)}</div>
                    <Button className="end-class-btn" onClick={showEndClassModal}>End class</Button>
                    <div className="hamburger-menu" onClick={toggleMobileMenu}>
                        <div className="hamburger-icon">☰</div>
                    </div>
                </div>
            </div>
            {isMobileMenuOpen && (
                <div className="mobile-menu">
                    <div className="mobile-menu-item">
                        <div className="lesson-title">Trial Lesson [Grade 1-3]</div>
                    </div>
                    <div className="mobile-menu-item">
                        <Link to="/" className="nav-link" onClick={() => setIsMobileMenuOpen(false)}>Home</Link>
                    </div>
                    <div className="mobile-menu-item">
                        <Link to="/posts" className="nav-link" onClick={() => setIsMobileMenuOpen(false)}>Posts</Link>
                    </div>
                    <div className="mobile-menu-item">
                        <div className="timer">{formatTimeDisplay(timeRemaining)}</div>
                        <Button className="end-class-btn" onClick={showEndClassModal}>End class</Button>
                    </div>
                </div>
            )}
            {isModalOpen && (
                <EndClassModal onClose={hideEndClassModal} onEndClass={confirmEndClass} />
            )}
        </nav>
    );
};

export default Navbar;
