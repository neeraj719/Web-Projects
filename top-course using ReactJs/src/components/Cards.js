import { useState } from "react";
import { toast } from "react-toastify";
import Card from "./Card";

const Cards = (props) => {
  const courses = props.courses;
  let category = props.category;

   // Check if there is no data present
   if (courses.length === 0) {
    toast.error("No data present");
  }

  const [likedCourses, setLikedCourses] = useState([]);

  //returns a list of all courses received from the api response
  const getCourses = () => {
    let allCourses = [];

    if (category === "All") {
          Object.values(courses).forEach((array) => {
        array.forEach((courseData) => {
          allCourses.push(courseData);
        });
      });
      return allCourses;
    } else {
      //main sif specific category ka array pass karunga
      return courses[category];
    }

  };

  return (
    <div className="flex flex-wrap justify-center gap-4 mb-4">
      {getCourses().map((course) => {
        return (
          <Card
            key={course.id}
            course={course}
            likedCourses={likedCourses}
            setLikedCourses={setLikedCourses}
          />
        );
      })}
    </div>
  );
};

export default Cards;
