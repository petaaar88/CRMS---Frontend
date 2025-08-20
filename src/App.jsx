import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
    RouterProvider,
} from "react-router-dom";

import ReportPage from "./pages/ReportPage";
import MainLayout from "./layouts/MainLayout";
import LoginPage from "./pages/LoginPage/LoginPage";
import ThemeProvider from "./contexts/ThemeContext";
import {AuthProvider} from "./contexts/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import AuthorizedRoute from "./components/AuthorizedRoute";
import AnnoucementProvider from "./contexts/AnnoucementContext";
import USER_ROLES from "./types/userRoles";
import {UserInfoProvider} from "./contexts/UserInfoContext.jsx";

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route>
            <Route path="/login" element={<LoginPage/>}/>
            <Route
                element={
                    <ProtectedRoute>
                        <MainLayout/>
                    </ProtectedRoute>
                }
            >
                <Route path="/" element={<p>Neki tekst</p>}/>
                <Route
                    path="/admin"
                    element={
                        <AuthorizedRoute authorizedRoles={[USER_ROLES.ADMIN]}>
                            <p>Admin Page</p>
                        </AuthorizedRoute>
                    }
                />
                <Route path="/reports" element={<ReportPage/>}/>
                <Route path="*" element={<p>Not Found!</p>}/>
            </Route>
        </Route>
    )
);

const App = () => {
    return (
        <ThemeProvider>
            <AuthProvider>
                <UserInfoProvider>
                    <AnnoucementProvider>
                        <RouterProvider router={router}/>
                    </AnnoucementProvider>
                </UserInfoProvider>
            </AuthProvider>
        </ThemeProvider>
    );
};

export default App;