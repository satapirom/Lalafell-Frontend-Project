import React, { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token'); // ดึง token จาก localStorage
        if (token) {
            setIsLoggedIn(true); // ถ้ามี token ให้ตั้งค่า isLoggedIn เป็น true
        }
    }, []); // ทำงานแค่ครั้งเดียวเมื่อโหลดคอมโพเนนต์

    const login = () => setIsLoggedIn(true);
    const logout = () => {
        localStorage.removeItem('token'); // ลบ token ออกจาก localStorage เมื่อออกจากระบบ
        setIsLoggedIn(false);
    };

    return (
        <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);




