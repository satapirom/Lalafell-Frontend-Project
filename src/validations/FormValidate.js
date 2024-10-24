import { toast } from 'react-hot-toast';

const FormValidate = {
    username: {
        required: "username is required",
        pattern: {
            value: /^[a-zA-Z]+$/i,
            message: "username can only contain letters"
        }
    },
    email: {
        required: "Email is required",
        pattern: {
            value: /^\S+@\S+\.\S+$/,
            message: "Invalid email format"
        }
    },
    password: {
        required: "Password is required",
        minLength: {
            value: 8,
            message: "Password must be at least 8 characters"
        },
        maxLength: {
            value: 16,
            message: "Password must be no more than 16 characters"
        },
        pattern: {
            value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/,
            message: "Password must include uppercase, lowercase, number, and special character"
        },
    }
};

export default FormValidate;