import { useState, useEffect, ChangeEvent, useRef } from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { ToastContainer } from "react-toastify"

import CreateBlog from "./components/CreateBlog"
import { ThemeProvider } from "./context/ThemeContext"

import ViewBlogs from "./components/ViewBlogs"
import ViewBlog from "./components/ViewBlog"
import Login from "./components/Login"
import Register from './components/Register'

import Navbar from "./components/Navbar"
import { Logout } from "./components/Logout"
import Protected from "./components/PrivateRoute"
import UpdateBlog from "./components/UpdateBlog"

function App() {
  const [themeMode, setThemeMode] = useState('light');
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('token') ? true : false);

  const htmlRef = useRef(document.querySelector('html'));

  const darkTheme = () => {
    setThemeMode('dark');
  }

  const lightTheme = () => {
    setThemeMode('light')
  }

  const onChangeMode = (event: ChangeEvent<HTMLInputElement>) => {
    const darkModeStatus = event.currentTarget.checked;

    if(darkModeStatus) {
      darkTheme()
    } else {
      lightTheme()
    }
  }

  useEffect(() => {
    const htmlElement = htmlRef.current;

    if(htmlElement) {
      htmlElement.classList.remove('dark', 'light');
      htmlElement.classList.add(themeMode);
    }
  }, [themeMode])

  return (
    <ThemeProvider value={{ themeMode, darkTheme, lightTheme }}>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        />
        <ToastContainer />
        
      <Router>
      <div className="dark:bg-gray-700  flex flex-col justify-center items-center">
          <Navbar onChangeMode={onChangeMode} themeMode={themeMode} isLoggedIn={isLoggedIn} />
            <Routes>
              <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} /> 
              <Route path="/register" element={<Register />} /> 
              <Route path="/" element={<Protected Component={CreateBlog} />} />
              <Route path="/logout" element={<Logout setIsLoggedIn={setIsLoggedIn} />} /> 
              <Route path="/blogs" element={<Protected Component={ViewBlogs} />} />
              <Route path="/blogs/:id" element={<Protected Component={ViewBlog} />} />
              <Route path="/blogs/:id/update" element={<Protected Component={UpdateBlog} />} />
            </Routes>
        </div>
      </Router>
    </ThemeProvider>
  )
}

export default App
