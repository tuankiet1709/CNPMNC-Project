import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  doc,
  query,
  where,
  orderBy,
} from "firebase/firestore";
import { db } from "../../../services/requests";
import Course from "../../../models/course";
import {IsDeleted, All} from "../../../constants/Course/CourseStateConstant";

const coursesCollectionRef = collection(db, "Course");

function Mapping(courseForm) {
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

export async function getCourse(requestQuery) {
  var data = getDocs(coursesCollectionRef);
  var q = undefined;
  console.log(requestQuery);
  console.log(requestQuery.states);

  if(requestQuery.states){
    if(
      requestQuery.states.length>0 &&
      !requestQuery.states.some(x => x === All) &&
      requestQuery.search){
        q = query( coursesCollectionRef,
          where('state', 'in', requestQuery.states),
          where("name", ">=", requestQuery.search),
          where("name", "<=", requestQuery.search + '\uf8ff'),
          orderBy(requestQuery.sortColumn,requestQuery.sortOrder));
    }
    else if (
      requestQuery.states.length>0 &&
      !requestQuery.states.some(x => x === All) &&
      !requestQuery.search){
        q = query( coursesCollectionRef,
          where('state', 'in', requestQuery.states),
          orderBy(requestQuery.sortColumn,requestQuery.sortOrder));
    } else if (
      requestQuery.states.length==0 &&
      requestQuery.search){
        q = query( coursesCollectionRef,
          where("name", ">=", requestQuery.search),
          where("name", "<=", requestQuery.search + '\uf8ff'),
          orderBy(requestQuery.sortColumn,requestQuery.sortOrder));
    } else if (
      requestQuery.states.length==0 &&
      !requestQuery.search){
        q = query( coursesCollectionRef,
          orderBy(requestQuery.sortColumn,requestQuery.sortOrder));
    }
  } else if (requestQuery.search){
    q = query( coursesCollectionRef,
      where("name", ">=", requestQuery.search),
      where("name", "<=", requestQuery.search + '\uf8ff'),
      orderBy(requestQuery.sortColumn,requestQuery.sortOrder)); 
  }
  else{
    q = query( coursesCollectionRef,
      orderBy(requestQuery.sortColumn,requestQuery.sortOrder)); 
  } 
  
  data = getDocs(q);
  return data;
}

export function createCourseRequest(courseForm) {
  var course = Mapping(courseForm);

  var result = addDoc(coursesCollectionRef, {
    name: courseForm.name,
    tuition: courseForm.tuition,
    startDate: courseForm.startDate,
    duration: courseForm.duration,
    studyCondition: courseForm.studyCondition,
    studyObject: courseForm.studyObject,
    content: courseForm.content,
    detail: courseForm.detail,
    createdDate: Date.now(),
    modifiedDate: Date.now(),
    state: parseInt(courseForm.state),
  });
  if (result) return course;
}
export function updateCourseRequest(id, courseForm) {
  var course = Mapping(courseForm);
  const courseDoc = doc(db, "Course", id);
  console.log(courseDoc);

  var result = updateDoc(courseDoc, {
    name: courseForm.name,
    tuition: courseForm.tuition,
    startDate: courseForm.startDate,
    duration: courseForm.duration,
    studyCondition: courseForm.studyCondition,
    studyObject: courseForm.studyObject,
    content: courseForm.content,
    detail: courseForm.detail,
    modifiedDate: Date.now(),
    state: parseInt(courseForm.state),
  });

  if (result) {
    return course;
  }
}
export function DeleteCourseRequest(id) {
  const courseDoc = doc(db, "Course", id);
  console.log(courseDoc);

  var result = updateDoc(courseDoc, {
    state: IsDeleted,
  });
  if (result) {
    return "success";
  }
}
