import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { Blog } from "../types/Blog";

const ViewBlogs = () => {
  const token = localStorage.getItem('token');
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  const navigate = useNavigate()
  
  const blogsPerPage = 10;

  const fetchBlogs = async () => {
    const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/blogs?page=${currentPage}&limit=${blogsPerPage}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.ok) {
      const data = await response.json();
      setBlogs(data.data);
    } else {
      const errorData = await response.json();
      console.error(errorData.message);
    }
  };

  const handleDeleteBlog = (event: React.MouseEvent<HTMLButtonElement>, id: number) => {
    event.preventDefault();
    return fetch(`${import.meta.env.VITE_SERVER_URL}/api/blogs/${id}`, {
      method: 'DELETE',
    })
      .then((res) => {
        if (res.ok) {
          toast.success('Blog deleted successfully');
        }
        return res.json();
      })
      .then((res) => {
        setBlogs(res.data);
      });
  };

  useEffect(() => {
    fetchBlogs();
  }, [currentPage, token]);

  return (
    <div className="flex flex-col relative dark:bg-gray-700 justify-center items-center w-[80%] m-auto h-screen">
      <div className="flex flex-wrap gap-8 p-8 w-full">
        {blogs &&
          blogs.map((blog: Blog) => (
            <div
              key={blog._id}
              className="w-52 max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
            >
              <Link to={`/blogs/${blog._id}`} className="flex justify-between flex-col h-full">
                <div>
                  <h5 className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">{blog.title}</h5>
                  <p className="text-sm text-gray-700 dark:text-gray-400 h-12">{blog.description}</p>
                </div>

                <div className="flex flex-col">
                  <button
                    onClick={(e) => { e.preventDefault(), navigate(`${blog._id}/update`)}}
                    className="border rounded p-2 text-center bg-blue-200 dark:text-white dark:bg-blue-900 mt-2"
                  >
                    Update Blog
                  </button>
                  <button
                    onClick={(e) => handleDeleteBlog(e, blog._id)}
                    className="border rounded p-2 text-center bg-red-200 dark:text-white dark:bg-red-900 mt-2"
                  >
                    Delete Blog
                  </button>
                </div>
              </Link>
            </div>
          ))}
      </div>
      <div className="flex justify-center items-center mt-4 w-full ">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="mx-2 px-4 py-2 border rounded bg-blue-500 text-white"
        >
          Previous Page
        </button>
        <button
          onClick={() => setCurrentPage((prev) => prev + 1)}
          disabled={blogs.length < blogsPerPage}
          className="mx-2 px-4 py-2 border rounded bg-blue-500 text-white"
        >
          Next Page
        </button>
      </div>
    </div>
  );
};

export default ViewBlogs;
