import React, { useEffect, useState } from "react";
import { FunnelFill } from "react-bootstrap-icons";
import { Search } from "react-feather";
import ReactMultiSelectCheckboxes from "react-multiselect-checkboxes";

import { Link } from "react-router-dom";
import CourseTable from "./CourseTable";
import { CREATE_COURSE } from "../../../constants/pages"

import { getCourse } from "../services/request"
import { 
  ACCSENDING, 
  DECSENDING, 
  DEFAULT_COURSE_SORT_COLUMN_NAME,
  DEFAULT_PAGE_LIMIT
} from "../../../constants/paging"

import { db } from "../../../services/requests";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";

const ListCourse = () => {
  const [query, setQuery] = useState({
    page: 1,
    limit: DEFAULT_PAGE_LIMIT,
    sortOrder: DECSENDING,
    sortColumn: DEFAULT_COURSE_SORT_COLUMN_NAME
  });

  const [search, setSearch] = useState("");
  const [courses, setCourses] = useState([]);

  const [selectedType, setSelectedType] = useState([
    { id: 1, label: "All", value: 0 },
  ]);

  const handleType = (selected) => {
    if (selected.length === 0) {
      setQuery({
        ...query,
        types: [],
      });

      // setSelectedType([FilterCourseTypeOptions[0]]);
      return;
    }

    const selectedAll = selected.find((item) => item.id === 1);

    setSelectedType((prevSelected) => {
      if (!prevSelected.some((item) => item.id === 1) && selectedAll) {
        setQuery({
          ...query,
          types: [],
        });

        return [selectedAll];
      }

      const newSelected = selected.filter((item) => item.id !== 1);
      const types = newSelected.map((item) => item.value);

      setQuery({
        ...query,
        types,
      });

      return newSelected;
    });
  };

  const handleChangeSearch = (e) => {
    e.preventDefault();

    const search = e.target.value;
    setSearch(search);
  };

  const handlePage = (page) => {
    setQuery({
      ...query,
      page,
    });
  };

  const handleSearch = () => {
    setQuery({
      ...query,
      search,
    });
  };

  const handleSort = (sortColumn) => {
    const sortOrder = query.sortOrder === ACCSENDING ? DECSENDING : ACCSENDING;

    setQuery({
      ...query,
      sortColumn,
      sortOrder,
    });
  };

  const fetchDataCallbackAsync = async () =>  {
    let data = await getCourse(query);
    console.log('fetchDataCallbackAsync');
    console.log(data);
    setCourses(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  }

  useEffect(() => {
    async function fetchDataAsync() {
      let result = await getCourse(query);
      setCourses(result.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      console.log(result);
    }

    fetchDataAsync();
  }, [query]);

  return (
    <>
      <div className="primaryColor text-title intro-x">Danh sách khóa học</div>

      <div>
        <div className="d-flex mb-5 intro-x">
          <div className="d-flex align-items-center w-md mr-5">
          <ReactMultiSelectCheckboxes
              // options={FilterCourseTypeOptions}
              hideSearch={true}
              placeholderButtonLabel="Type"
              value={selectedType}
              onChange={handleType}
            />

            <div className="border p-2">
              <FunnelFill />
            </div>
          </div>

          <div className="d-flex align-items-center w-ld ml-auto">
            <div className="input-group">
              <input
                onChange={handleChangeSearch}
                value={search}
                type="text"
                className="form-control"
              />
              <span onClick={handleSearch} className="border p-2 pointer">
                <Search />
              </span>
            </div>
          </div>

          <div className="d-flex align-items-center ml-3">
            <Link to={CREATE_COURSE} type="button" className="btn btn-danger">
              Tạo khóa học mới
            </Link>
          </div>
        </div>

        <CourseTable
          courses={courses}
          handlePage={handlePage}
          handleSort={handleSort}
          sortState={{
            columnValue: query.sortColumn,
            orderBy: query.sortOrder,
          }}
          fetchData={fetchDataCallbackAsync}
        />
      </div>
    </>
  );
};

export default ListCourse;
