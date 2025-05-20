import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider, Routes } from "react-router-dom"
import ReportPage from "./pages/ReportPage"
import MainLayout from "./layouts/MainLayout";
import LoginPage from "./pages/LoginPage/LoginPage";
import ThemeProvider from "./contexts/ThemeContext";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/login" element={<LoginPage/>}/>
      <Route element={<MainLayout/>}>
        <Route path="/" element={<p>Neki tekst</p>}/>
        <Route path="/reports" element= {<ReportPage />}/>
        <Route path="*" element={<p>Not Found!</p>}/>
      </Route>
    </Route>

  )
);

const App = () => {
  return (
    <ThemeProvider>
      <RouterProvider router={router}/>
    </ThemeProvider>
  )
}

export default App