import { useState } from "react";
import { BookOpenIcon, PlusCircleIcon } from "@heroicons/react/24/outline";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { Home } from "lucide-react";
import Cookies from "js-cookie";

export default function AdminLayout() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const handleLogout = () => {
    Cookies.remove("token"); // delete JWT cookie
    navigate("/login", { replace: true }); // redirect to login page
  };
  return (
    <div className="min-h-screen bg-gray-100 text-gray-900">
      {/* Header */}
      <header className="fixed top-0 left-0 w-full bg-primary h-16 flex items-center justify-between px-6 text-white shadow-md z-50">
        <h1 className="text-2xl font-semibold">Admin Dashboard</h1>
        <button
          onClick={handleLogout}
          className="bg-white text-primary px-4 py-2 rounded-lg hover:bg-primary/90 hover:text-white transition"
        >
          Logout
        </button>
      </header>
      <div className="flex min-h-[calc(100vh-4rem)] relative mx-auto">
        {/* Sidebar */}
        <aside
          className={`fixed top-16 left-0 h-[calc(100vh-4rem)] bg-primary-100 text-gray-100 p-6 space-y-4 transition-all duration-300 ease-in-out ${
            open ? "w-64" : "w-16"
          }`}
        >
          {/* Toggle button */}
          <button
            onClick={() => setOpen(!open)}
            className={`text-white focus:outline-none transition-all duration-300
              ${open ? "absolute top-4 right-4" : "mx-auto block text-2xl"}
            `}
          >
            {open ? "✕" : "☰"}
          </button>

          <h2 className="text-lg font-semibold mb-6 text-white flex items-center space-x-2">
            {open && <span>Menu</span>}
          </h2>

          <nav className="flex flex-col space-y-3 mt-10">
            <NavLink
              to="/admin/books"
              end
              className="flex items-center space-x-2 hover:bg-primary hover:text-white px-3 py-2 rounded-md transition"
            >
              <BookOpenIcon className="h-5 w-5" />
              {open && <span>All Books</span>}
            </NavLink>

            <NavLink
              to="/admin/add-book"
              className="flex items-center space-x-2 hover:bg-primary hover:text-white px-3 py-2 rounded-md transition"
            >
              <PlusCircleIcon className="h-5 w-5" />
              {open && <span>Add Book</span>}
            </NavLink>

            <NavLink
              to="/"
              className="flex items-center space-x-2 hover:bg-primary hover:text-white px-3 py-2 rounded-md transition"
            >
              <Home className="h-5 w-5" />
              {open && <span>Home</span>}
            </NavLink>
          </nav>
        </aside>

        {/* Routed content */}
        <section
          className={`flex-1 p-8 mt-16 overflow-y-auto transition-all duration-300 ease-in-out
  ${open ? "ml-64" : "ml-0 md:ml-16"}`}
        >
          <div className="">
            {" "}
            {/* full width container */}
            <Outlet />
          </div>
        </section>
      </div>
    </div>
  );
}
