import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider, Routes } from "react-router-dom"

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/" element={<p>Neki tekst</p>}></Route>
      <Route path="*" element={<p>Not Found!</p>}></Route>
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