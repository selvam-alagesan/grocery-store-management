import React, { createContext, useState, useContext, useEffect } from 'react';
import API from '../api/axios'
const AdminContext = createContext();
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    
        const checkAuth = async () => {
            
            try {
                const response = await API.get('/admin/me');
                setUser(response.data);
            } catch (error) {
                setUser(null);
            } finally {
                setLoading(false);
            }
        };
        useEffect(() => {
        checkAuth();
    }, []);

     const adminLogin = async (credentials) => {
        const response = await API.post('/admin/login', credentials);
        setUser(response.data);
        return response.data;
    };
    const employeeLogin = async (credentials) =>{
        const response = await API.post('/employee/login',credentials);
        setUser(response.data);
        return response.data
    }
    const supervisorLogin = async (credentials) =>{
        const response = await API.post('/supervisor/login',credentials);
        setUser(response.data);
        return response.data
    }

   const logout = async () => {
        try {
            await API.post('/admin/logout');
        } catch (error) {
            console.error('Logout failed', error);
        } finally {
            setUser(null);
        }
    };

     return (
        <AdminContext.Provider value={{ user, adminLogin, logout,employeeLogin,checkAuth,supervisorLogin }}>
            {!loading&& children}
        </AdminContext.Provider>
    );
}
export const useAdmin = () => useContext(AdminContext);