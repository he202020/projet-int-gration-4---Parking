import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import * as SecureStore from "expo-secure-store";

const TOKEN_KEY = 'my_jwt';
const API_URL = 'https://5410-2a02-a03f-635e-3f00-f8a1-5fc9-9c7f-d3dd.ngrok-free.app';
const AuthContext = createContext({});

export const useAuth = () => {
    return useContext(AuthContext);
}

export const AuthProvider = ({children}) => {
    const [authState, setAuthState] = useState({ token: null, authenticated: false});

    useEffect(() => {
        const loadToken = async () => {
            const token = await SecureStore.getItemAsync(TOKEN_KEY);

            if (token) {
                axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

                setAuthState({
                    token: token,
                    authenticated: true,
                });
            }
        };
        loadToken();
    }, [])

    const register = async (email, hash, firstName, lastName, company, plate) => {
        try {
            return await axios.post(
                `${API_URL}/person`,
                { email, hash, firstName, lastName, company, plate });
        } catch (err) {
            return err;
        }
    }

    const login = async (email, hash) => {
        try {
            const result = await axios.post(`${API_URL}/person/login`, { email, hash });
            console.log("The token is: ", result.data.token, "for ", result.data.user);

            setAuthState({
                token: result.data.token,
                authenticated: true,
            });

            axios.defaults.headers.common['Authorization'] = `Bearer ${result.data.token}`;

            await SecureStore.setItemAsync(TOKEN_KEY, result.data.token);

            console.log(authState.authenticated)
            return result;
        } catch (err) {
            return err;
        }
    }

    const logout = async () => {
        await SecureStore.deleteItemAsync(TOKEN_KEY);

        axios.defaults.headers.common['Authorization'] = '';

        setAuthState({
            token: null,
            authenticated: false,
        });
    }

    const value = {
        onRegister: register,
        onLogin: login,
        onLogout: logout,
        authState
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
