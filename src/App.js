import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'
import { useAuthContext } from './hooks/useAuthContext'

//styles
import './App.css'

//pages and components

import Dashboard from './pages/dashboard/Dashboard'
import Create from './pages/create/Create'
import Login from './pages/login/Login'
import Project from './pages/project/Project'
import Signup from './pages/signup/Signup'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar';
import OnlineUsers from './components/OnlineUsers'
import EmeraldStore from './pages/emeraldstore/EmeraldStore'
import Products from './pages/products/Products'
import Product from './pages/product/Product'


function App() {
const {user, authIsReady} = useAuthContext()

  return (
    <div className="App">
    {authIsReady && (
    <BrowserRouter>
    {user&&<Sidebar />}
    <div className="container">
    <Navbar />      
      <Switch>
        <Route exact path="/">
        {!user && <Redirect to="/login"/>}
         {user && <Dashboard />} 
        </Route>
        <Route  path="/create">
        {!user && <Redirect to="/login"/>}
         {user && <Create />}          
        </Route>
        <Route  path="/projects/:id">
        {!user && <Redirect to="/login"/>}
        {user && <Project />}          
        </Route>

        <Route  path="/emeraldstore">
        {!user && <Redirect to="/login"/>}
        {user && <EmeraldStore />}          
        </Route>

        <Route  path="/login">
        {user && <Redirect to="/"/>}
        {!user && <Login />}          
        </Route>

        <Route  path="/signup">
        {user && <Redirect to="/"/>}
        {!user && <Signup />}          
        </Route>

        <Route  path="/esproducts">
        {!user && <Redirect to="/"/>}
        {user && <Products />}          
        </Route>

        <Route  path = "/producto/:id">
        {!user && <Redirect to="/"/>}
        {user && <Product />} 
          </Route>

      </Switch>
    
       </div>
       {user && <OnlineUsers />}
       </BrowserRouter>
       )}
    </div>
  );
}

export default App
