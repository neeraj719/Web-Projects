import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";
import BlogDetails from "./BlogDetails";
import Spinner from "./Spinner";

export default function Blogs() {
  const { posts, loading } = useContext(AppContext);
  const navigate = useNavigate();

  return (
    <div
      className={`w-11/12 max-w-[670px] py-8 gap-y-7 mb-[40px] mx-auto`}
    >
      {loading ? (
        <div className="min-h-[80vh] w-full flex justify-center items-center">
          <Spinner />
        </div>
      ) : posts.length === 0 ? (
        <div className="min-h-[80vh] w-full flex  flex-col justify-center items-center gap-y-5">
          <p className="text-center font-bold text-3xl">No Blogs Found !</p>
          <button
            className="border-2 border-gray-300 py-3 px-6 rounded-md hover:bg-red-500 font-bold text-lg"
            onClick={() => navigate("/")}
          >
            Home
          </button>
        </div>
      ) : (
        posts.map((post) => <BlogDetails key={post.id} post={post} />)
      )}
    </div>
  );
}
