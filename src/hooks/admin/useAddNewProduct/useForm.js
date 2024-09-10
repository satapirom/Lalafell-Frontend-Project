import { useState } from "react";

const useForm = (initialFormState) => {
    const [formData, setFormData] = useState(initialFormState);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const resetForm = () => {
        console.log('Resetting form...');
        setFormData(initialFormState); // Make sure this is the correct state
    };

    return {
        formData,
        handleChange,
        resetForm,
    };
};
export default useForm;