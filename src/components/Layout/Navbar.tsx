// import { useNavigate } from "react-router-dom";

// export const Navbar = () => {
//     const navigate = useNavigate()

//     return (
//         <nav className="shadow-md">
//             <div className="max-w-4xl mx-auto px-4 py-3 flex justify-between items-center">
//                 <h1 className="text-xl font-bold">🚀 Job Hunter</h1>
//                 <div className="flex items-center gap-4">
//                     <button onClick={() => navigate("/dashboard")} className="border px-3 py-1 rounded hover:bg-gray-100">Dashboard</button>
//                     <button onClick={() => navigate("/jobboard")} className="border px-3 py-1 rounded hover:bg-gray-100">Job Board</button>
//                     <button onClick={() => navigate("/questions")} className="border px-3 py-1 rounded hover:bg-gray-100">Interview Questions</button>
//                     <span>Hello, [User Name]</span>
//                     <button className="border px-3 py-1 rounded">Logout</button>
//                 </div>
//             </div>
//         </nav>
//     );
// }

import { useNavigate, useLocation } from "react-router-dom"
import clsx from "clsx" // install this if not already: npm i clsx

export const Navbar = () => {
  const navigate = useNavigate()
  const location = useLocation()

  const navItems = [
    { name: "Dashboard", path: "/dashboard" },
    { name: "Job Board", path: "/jobboard" },
    { name: "Interview Questions", path: "/questions" },
  ]

  const isActive = (path: string) => location.pathname === path

  return (
    <nav className="fixed top-0 w-full z-50 bg-white dark:bg-gray-900 shadow-sm border-b border-gray-200 dark:border-gray-800">
      <div className="max-w-5xl mx-auto px-4 py-3 flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-0">
        {/* Logo */}
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
          🚀 Job Hunter
        </h1>

        {/* Navigation Links */}
        <div className="flex flex-wrap items-center gap-3">
          {navItems.map(({ name, path }) => (
            <button
              key={path}
              onClick={() => navigate(path)}
              className={clsx(
                "px-3 py-1 rounded-md text-sm font-medium",
                isActive(path)
                  ? "bg-blue-500 text-white dark:bg-blue-400"
                  : "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
              )}
            >
              {name}
            </button>
          ))}
        </div>

        {/* User Section */}
        <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-300">
          <span>Hello, <strong>[User]</strong></span>
          <button className="border px-3 py-1 rounded-md hover:bg-red-50 dark:hover:bg-red-800 dark:border-gray-700">
            Logout
          </button>
        </div>
      </div>
    </nav>
  )
}
