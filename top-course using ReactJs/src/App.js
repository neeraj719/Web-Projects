import React, { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Filter from "./components/Filter";
import Cards from "./components/Cards";
import { filterData, apiUrl } from "./data";
import Spinner from "./components/Spinner";
import { toast } from "react-toastify";
import NotFoundImage from "./assets/not-found.png";

function App() {
  const [courses, setCourses] = useState(null);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState(filterData[0].title);
  const [error, setError] = useState(false);

  async function fetchData() {
    setLoading(true);
    try {
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error("API call failed");
      }
      const output = await response.json();
      setCourses(output.data);
      setError(false); // Reset the error state if the API call is successful
    } catch (error) {
      setError(true);
      toast.error("Network problem");
    }
    setLoading(false);
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-bgDark2 ">
      {error ? (
        // Render the 404 image 
        <div className="flex flex-col items-center justify-center mt-[170px]">
          <img
            src={NotFoundImage}
            alt="Not Found"
            className="w-[300px] h-[300px] object-cover"
          />
          <p className="text-white text-2xl font-semibold text-center">
            404 Not Found
          </p>
        </div>
      ) : (
        <div>
        <div>
          <Navbar />
        </div>
          <div className="bg-bgDark2">
            <div>
              <Filter
                filterData={filterData}
                category={category}
                setCategory={setCategory}
              />
            </div>
            <div className="w-11/12 max-w-[1200px] mx-auto flex flex-wrap justify-center items-center min-h-[50vh]">
              {loading ? (
                <Spinner />
              ) : (
                <Cards courses={courses} category={category} />
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
