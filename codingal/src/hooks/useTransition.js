import { useState } from 'react';

export const useTransition = (initialState = false) => {
const [isVisible, setIsVisible] = useState(initialState);

const toggleVisibility = () => {
    setIsVisible(!isVisible);
};

return [isVisible, toggleVisibility];
};