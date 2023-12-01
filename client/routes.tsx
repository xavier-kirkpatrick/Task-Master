import { Route, createRoutesFromElements } from 'react-router-dom'

import AppLayout from './Pages/AppLayout.tsx'
import Home from './Pages/Home.tsx'

export const routes = createRoutesFromElements(
  <Route path="/" element={<AppLayout />}>
    <Route index element={<Home />} />
  </Route>
)
