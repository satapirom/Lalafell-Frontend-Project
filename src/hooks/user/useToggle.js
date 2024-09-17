import { useState } from 'react';
const useToggle = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => {
        setIsOpen(prev => !prev);
    };

    const onClose = () => {
        setIsOpen(false);
    };

    return {
        isOpen,
        onClose,
        toggle
    };
};

export default useToggle;