import { ChangeEvent, useEffect } from "react";
import { Link } from "react-router-dom"

const Navbar = ({ onChangeMode, themeMode, isLoggedIn} : { onChangeMode: (event: ChangeEvent<HTMLInputElement>) => void, themeMode: string, isLoggedIn: boolean }) => {

    useEffect(() => {

    }, [isLoggedIn])

    return (
        <nav className="bg-white dark:bg-gray-900 fixed w-full z-20 top-0 left-0 ">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
            <a href='/'><span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Blog app</span></a>
            <div className="md:order-2">
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" checked={themeMode === 'dark'} value="" onChange={(e) => onChangeMode(e)} className="sr-only peer" />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">Dark mode</span>
              </label>
            </div>
            <div className="items-center justify-between w-full md:flex md:w-auto md:order-1 dark:text-white" id="navbar-sticky">
              <ul className="flex gap-8 w-[600px]">
                {!isLoggedIn && 
                  <>
                    <li>
                      <Link to="/login">Login</Link>
                    </li>
                    <li>
                      <Link to="/register">Register</Link>
                    </li>
                  </>
                }
                {isLoggedIn && (
                  <>
                    <li>
                      <Link to="/">Create Blog</Link>
                    </li>
                    <li>
                      <Link to="/blogs">View Blogs</Link>
                    </li>
                    <li>
                      <Link to="/logout">Logout</Link>
                    </li>
                  </>
                )}
              </ul>
            </div>
            </div>
          </nav>
    )
}

export default Navbar;