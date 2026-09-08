import React, { useState } from "react";

import Loginpage from "./pages/Loginpage";
import Registration from "./pages/Registration";
import Home from "./pages/Home";

function App() {

    const [page, setPage] = useState("login");

    const loginSuccess = () => {
        setPage("home");
    };

    const logout = () => {
        setPage("login");
    };

    return (

        <div>

            {page === "login" && (
                <Loginpage
                    goHome={loginSuccess}
                    goRegister={() => setPage("register")}
                />
            )}

            {page === "register" && (
                <Registration
                    goLogin={() => setPage("login")}
                />
            )}

            {page === "home" && (
                <Home
                    logout={logout}
                />
            )}

        </div>

    );

}

export default App;