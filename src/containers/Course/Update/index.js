import React, { useEffect, useState } from "react";
import { useLocation } from "react-router";
import CourseForm from "../CourseForm";

const UpdateCourseContainer = () => {
  const [course, setCourse] = useState(undefined);

  const { state } = useLocation();

  const { existCourse } = state;

  useEffect(() => {
    if (existCourse) {
      setCourse({
        id: existCourse.id,
        name: existCourse.name, 
        content: existCourse.content,
        detail: existCourse.detail,
        startDate: existCourse.startDate.toDate(),
        endDate: existCourse.endDate.toDate(),
        tuition: existCourse.tuition,
        studyCondition: existCourse.studyCondition,
      });
    }
  }, [existCourse]);
  console.log(existCourse);
  console.log("edit");
  console.log(course);

  return (
    <>
      <div className="ml-5">
        <div className="primaryColor text-title intro-x">
          Cập nhật thông tin khóa học {course?.name}
        </div>

        <div className='row'>
        {
          course && (<CourseForm
            initialCourseForm={course}
  
          />)
        }
      </div>

        {/* <div className="row">
          {course && (<CourseForm initialCourseForm={course} />)}
        </div> */}
      </div>
    </>
  )
};

export default UpdateCourseContainer;
