import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"

import { Blog } from "../types/Blog"

const ViewBlog = () => {
    const token = localStorage.getItem('token')
    const [blog, setBlogs] = useState<Blog>()

    const { id } = useParams()

    const fetchBlogs = () => {
        fetch(`${import.meta.env.VITE_SERVER_URL}/api/blogs/${id}`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then((res) => res.json())
          .then((res) => setBlogs(res.data))
    }
    
    useEffect(() => {
        fetchBlogs()
    }, []) 
    
    return (
        <div className="h-screen">
            <div className="flex w-full gap-8 p-8 relative mt-40">
            {blog &&
                <div
                    key={blog._id}
                    className="w-64 max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
                >
                    <h5 className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">
                        {blog.title}
                    </h5>
                    <p className="text-sm text-gray-700 dark:text-gray-400">
                        {blog.description}
                    </p>
                </div>
            }
            </div>
        </div>
    )
}

export default ViewBlog;