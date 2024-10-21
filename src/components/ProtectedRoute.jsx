import { Navigate, Outlet } from "react-router-dom";

export const ProtectedRoute = ({ tipo_usuario, allowedTypes, redirectTo = "/" }) => {
    if (tipo_usuario === undefined) {
        console.error('tipo_usuario es undefined');
        return <Navigate to={redirectTo} />;
    }
    const tipoUsuarioStr = tipo_usuario.toString();
    if (allowedTypes.includes(tipoUsuarioStr)) {
        return <Outlet />;
    }
    console.log('Redirigir a espacio');

    return <Navigate to={redirectTo} />;
};