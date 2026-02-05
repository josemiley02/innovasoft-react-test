import { Redirect, Route } from "react-router-dom/cjs/react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Box, CircularProgress } from "@material-ui/core";

function PrivateRoute({ component: Component, ...rest }) {
    const { token, loading } = useAuth();
    
    if (loading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
                <CircularProgress style={{ color: "#FF9900" }} />
            </Box>
        );
    }
    return (
        <Route
            {...rest}
            render={(props) =>
                token ? <Component {...props} /> : <Redirect to="/" />
            }
        />
    );
}

export default PrivateRoute;