import { useCallback } from "react";

export default function useAuthHeader() {
    const getAuthHeader = useCallback(() =>{ 
        const token = localStorage.getItem('jwt_token');
        if (token) {
            return {
                Authorization: `Bearer ${token}`
            }
        } else {
            return {};
        }
    }, [])
    return getAuthHeader;
}