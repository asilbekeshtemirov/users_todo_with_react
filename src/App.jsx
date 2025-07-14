import { Route, Routes } from 'react-router'
import { MainLayout } from './layout'
import React from 'react'


const UsersPage = React.lazy(()=>import('./pages/users'))
const TasksPage = React.lazy(()=>import('./pages/tasks'))
const ProductsPage = React.lazy(()=>import('./pages/products'))


function App() {

  return (
      <Routes>
        <Route path='/' element={<MainLayout/>}>
          <Route path='users' element={<UsersPage/>} />
          <Route path='products' element={<ProductsPage/>}/>
          <Route path='tasks' element={<TasksPage/>} />
        </Route>
      </Routes>
  )
}

export default App
