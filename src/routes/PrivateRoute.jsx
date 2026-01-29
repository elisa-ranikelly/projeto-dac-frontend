import { Navigate } from "react-router-dom";

function PrivateRoute({ children }) {
  const auth = JSON.parse(localStorage.getItem("auth")) || JSON.parse(sessionStorage.getItem("auth"));

  if (!auth || !auth.token) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default PrivateRoute;