import {
    collection,
    getDocs,
    addDoc,
    updateDoc,
    deleteDoc,
    doc,
  } from "firebase/firestore";
import { db } from "../../../services/requests";
import Course from "../../../models/course"

  const coursesCollectionRef = collection(db, "Course");

  function Mapping(courseForm){
    var course = new Course();

    course.name = courseForm["name"];
    course.startDate = courseForm["startDate"];
    course.tuition = courseForm["tuition"];
    course.endDate = courseForm["endDate"];
    course.content = courseForm["content"];
    course.detail = courseForm["detail"];
    course.studyCondition = courseForm["studyCondition"];
    
    return course;
  }

  export function getCourse(query){
    const data = getDocs(coursesCollectionRef);
    return data;
  }

  export function createCourseRequest(courseForm){
    var course = Mapping(courseForm); 

    var result = addDoc(coursesCollectionRef, { 
        name: course.name, 
        content: course.content,
        detail: course.detail,
        startDate: course.startDate,
        endDate: course.endDate,
        tuition: course.tuition,
        studyCondition: course.studyCondition
    });
    if(result) return course;
  }
  export function updateCourseRequest(id, courseForm){
    var course = Mapping(courseForm); 
    const courseDoc= doc(db, "Course", id);
    console.log(courseDoc);

    var result = updateDoc(courseDoc, { 
        name: course.name, 
        content: course.content,
        detail: course.detail,
        startDate: course.startDate,
        endDate: course.endDate,
        tuition: course.tuition,
        studyCondition: course.studyCondition
    });

    if(result) {
      return course
    };
  }
  export function DeleteCourseRequest(id){
    const courseDoc = doc(db, "Course", id);
    var result = deleteDoc(courseDoc);
    if(result){
      return "success";
    }
    
  }
  

