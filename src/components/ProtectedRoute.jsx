import { Navigate, Outlet } from "react-router-dom";

export const ProtectecRoute = ({ tipo_usuario, allowedTypes, redirectTo = "/" }) => {
    
    if (allowedTypes.includes(tipo_usuario)) {
        return <Outlet />;
    }

    return <Navigate to={redirectTo} />;
};