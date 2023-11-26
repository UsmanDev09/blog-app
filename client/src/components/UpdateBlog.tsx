import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UpdateBlog = () => {
  const token = localStorage.getItem('token');
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: '',
    description: ''
  });

  const fetchBlogDetails = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/blogs/${id}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`
        },
      });

      if (response.ok) {
        const blogDetails = await response.json();
        setFormData({
          title: blogDetails.data.title,
          description: blogDetails.data.description
        });
      } else {
        const errorData = await response.json();
        console.error(errorData.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchBlogDetails();
  }, [id, token]);

  const updateBlog = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/blogs/${id}`, {
        method: 'PUT', 
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast.success('Blog updated successfully');
        navigate(`/blogs/${id}`); // Redirect to the updated blog's details page
      } else {
        const errorData = await response.json();
        toast.error(`Error: ${errorData.message}`);
      }
    } catch (error) {
        if(error instanceof Error)
            toast.error(error.message);
    }
  };

  return (
    <div className="flex place-content-center bg-white dark:bg-gray-700">
      <form
        className="flex flex-col items-center dark:bg-dark rounded justify-center h-screen w-screen"
        onSubmit={updateBlog}
      >
        <section className=" dark:bg-dark-green sm:w-1/2">
          <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
            <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-lg xl:p-0 dark:bg-gray-700 dark:border-gray-700">
              <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                  Update Blog
                </h1>
                <div>
                  <label
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Title
                  </label>
                  <input
                    onChange={(e) =>
                      setFormData({ ...formData, title: e.target.value })
                    }
                    required
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="1 hour gym"
                    value={formData.title}
                  />
                </div>
                <div>
                  <label
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Description
                  </label>
                  <input
                    required
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                    placeholder="Go to gym at 5am"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    value={formData.description}
                  />
                </div>
                <button
                  type="submit"
                  className="w-full text-white bg-gray-700 hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-primary-800"
                >
                  Update Blog
                </button>
              </div>
            </div>
          </div>
        </section>
      </form>
    </div>
  );
};

export default UpdateBlog;
