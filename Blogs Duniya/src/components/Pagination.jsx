import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";

export default function Pagination() {
  const { page, handlePageChange, totalPages, darkMode } =
    useContext(AppContext);
  const navigate = useNavigate();

  if (!totalPages) return null;

  return (
    <div
      className={`fixed bottom-0 inset-x-0  py-2 
     ${
       darkMode
         ? "bg-black text-white border-t-[1px] border-t-gray-400"
         : "bg-white border-t-2 border-t-gray-300"
     }`}
    >
      <div className="flex items-center gap-x-3 w-11/12 max-w-2xl mx-auto">
        {page > 1 && (
          <button
            onClick={() => handlePageChange(page - 1)}
            className="border-2 border-gray-300 py-1 px-4 rounded-md"
          >
            Previous
          </button>
        )}
        {page < totalPages && (
          <button
            onClick={() => handlePageChange(page + 1)}
            className="border-2 border-gray-300 py-1 px-4 rounded-md"
          >
            Next
          </button>
        )}
        {page === totalPages && (
          <button
            onClick={() => navigate("/")}
            className="border-2 border-gray-300 py-1 px-4 rounded-md hover:bg-red-500 font-bold"
          >
            Reset
          </button>
        )}
        <p className="text-sm font-semibold ml-auto">
          Page {page} of {totalPages}
        </p>
      </div>
    </div>
  );
}
