import { useState } from 'react';

const usePasswordVisibility = () => {
    const [isVisible, setIsVisible] = useState(false);

    const toggleVisibility = () => {
        setIsVisible(prev => !prev);
    };

    return {
        isVisible,
        toggleVisibility,
    };
};

export default usePasswordVisibility;