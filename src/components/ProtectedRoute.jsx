import { Navigate, Outlet } from "react-router-dom";

export const ProtectecRoute = ({ tipo_usuario, allowedTypes, redirectTo = "/" }) => {
    // Permitir acceso si no hay usuario autenticado
    if (!tipo_usuario || allowedTypes.includes(tipo_usuario)) {
        return <Outlet />;
    }

    return <Navigate to={redirectTo} />;
};
