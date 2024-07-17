import { createBrowserRouter, createRoutesFromElements } from "react-router"

import AppRouter from "./AppRouter"

const router = createBrowserRouter(createRoutesFromElements(AppRouter()))

export default router
