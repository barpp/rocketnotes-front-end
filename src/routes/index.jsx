import { useAuth } from '../hooks/auth'
import { BrowserRouter } from "react-router-dom";

import { AppRoutes } from "./app.routes";
import { AuthRoutes } from "./auth.routes";

export function Routes(){
    const { user } = useAuth()
    
    return(
        <BrowserRouter>
            {user ? <AppRoutes /> : <AuthRoutes /> }
        </BrowserRouter>       
    )
}