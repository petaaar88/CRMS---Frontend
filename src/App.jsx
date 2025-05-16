import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider, Routes } from "react-router-dom"
import ReportPage from "./pages/ReportPage"
import MainLayout from "./layouts/MainLayout";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
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
    <RouterProvider router={router}>

    </RouterProvider>
  )
}

export default App