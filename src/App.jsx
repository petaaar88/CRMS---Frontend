import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
    RouterProvider,
} from "react-router-dom";

import PartnersAndReportsPage from "./pages/PartnersAndReportsPage/PartnersAndReportsPage.jsx";
import PlansPage from "./pages/PlansPage/PlansPage.jsx";
import MainLayout from "./layouts/MainLayout";
import LoginPage from "./pages/LoginPage/LoginPage";
import ThemeProvider from "./contexts/ThemeContext";
import {AuthProvider} from "./contexts/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import AuthorizedRoute from "./components/AuthorizedRoute";
import AnnouncementProvider from "./contexts/AnnouncementContext";
import USER_ROLES from "./types/userRoles";
import {UserInfoProvider} from "./contexts/UserInfoContext.jsx";
import AssignmentsPage from "./pages/AssignmentsPage/AssignmentsPage.jsx";
import AnnouncementsPage from "./pages/AnnouncementsPage/AnnouncementsPage.jsx";
import ManagePage from "./pages/ManagePage/ManagePage.jsx"

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
                    path="/partners-and-reports"
                    element={<PartnersAndReportsPage/>}
                />
                <Route
                    path="/plans"
                    element={<PlansPage/>}
                />
                <Route
                    path="/assignments"
                    element={
                        <AuthorizedRoute authorizedRoles={[USER_ROLES.USER]}>
                            <AssignmentsPage/>
                        </AuthorizedRoute>
                    }
                />
                <Route
                    path="/announcements"
                    element={
                        <AuthorizedRoute authorizedRoles={[USER_ROLES.ADMIN]}>
                            <AnnouncementsPage/>
                        </AuthorizedRoute>
                    }
                />
                <Route
                    path="/manage"
                    element={
                        <AuthorizedRoute authorizedRoles={[USER_ROLES.ADMIN]}>
                            <ManagePage/>
                        </AuthorizedRoute>
                    }
                />
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
                    <AnnouncementProvider>
                        <RouterProvider router={router}/>
                    </AnnouncementProvider>
                </UserInfoProvider>
            </AuthProvider>
        </ThemeProvider>
    );
};

export default App;
