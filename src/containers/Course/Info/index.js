import React from "react";
import { Modal } from "react-bootstrap";
import { XSquare } from "react-bootstrap-icons";

const Info = ({ course, handleClose }) => {
  return (
    <>
    <Modal
        show={true}
        onHide={handleClose}
        dialogClassName="containerModalErr"
        size="lg"
      >
        <Modal.Header className="align-items-center headerModal">
          <Modal.Title id="detail-modal" className="primaryColor">
            Detailed User Information
          </Modal.Title>
          <XSquare
            onClick={handleClose}
            className="primaryColor model-closeIcon"
            size={25}
          />
        </Modal.Header>

        <Modal.Body className="bodyModal">
        <div className="container-fluid">
            <div className="row -intro-y mt-2">
              <div className="col-4">Tên khóa học:</div>
              <div className="col-8 text-wrap text-break">{course.name}</div>
            </div>

            <div className="row -intro-y mt-2">
              <div className="col-4">Nội dung khóa học:</div>
              <div className="col-8 text-wrap text-break">{course.content}</div>
            </div>

            <div className="row -intro-y mt-2">
              <div className="col-4">Chi tiết khóa học:</div>
              <div className="col-8 text-wrap text-break">{course.detail}</div>
            </div>

            <div className="row -intro-y mt-2">
              <div className="col-4">Học phí:</div>
              <div className="col-8 text-wrap text-break">{course.tuition}</div>
            </div>
            <div className="row -intro-y mt-2">
              <div className="col-4">Điều kiện học:</div>
              <div className="col-8 text-wrap text-break">
                {course.studyCondition}
              </div>
            </div>
            <div className="row -intro-y mt-2">
              <div className="col-4">Ngày bắt đầu:</div>
              <div className="col-8 text-wrap text-break">
                {course.endDate.toDate().toLocaleDateString("vi-VN")}
              </div>
            </div>
            <div className="row -intro-y mt-2">
              <div className="col-4">Ngày kết thúc:</div>
              <div className="col-8 text-wrap text-break">
                {course.startDate.toDate().toLocaleDateString("vi-VN")}
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>
      
    </>
  );
};

export default Info;
