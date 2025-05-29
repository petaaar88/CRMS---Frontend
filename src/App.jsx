import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider, Routes } from "react-router-dom"
import ReportPage from "./pages/ReportPage"
import MainLayout from "./layouts/MainLayout";
import LoginPage from "./pages/LoginPage/LoginPage";
import ThemeProvider from "./contexts/ThemeContext";
import {AuthProvider} from "./contexts/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import AuthorizedRoute from "./components/AuthorizedRoute";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/login" element={<LoginPage/>}/>
      <Route element={<ProtectedRoute><MainLayout/></ProtectedRoute>}>
        <Route path="/" element={<p>Neki tekst</p>}/>
        <Route path="/admin" element={<AuthorizedRoute authorizedRoles={["ADMIN"]}><p>Admin Page</p></AuthorizedRoute>}/>
        <Route path="/reports" element= {<ReportPage />}/>
        <Route path="*" element={<p>Not Found!</p>}/>
      </Route>
    </Route>
    
  )
);

const App = () => {
  return (
    <ThemeProvider>
      <AuthProvider>
        <RouterProvider router={router}/>
      </AuthProvider>
    </ThemeProvider>
  )
}

export default App