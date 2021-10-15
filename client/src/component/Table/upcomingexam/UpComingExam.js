import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import Form from "./Form";
import FormList from "./FormList";
import Header from "./Header";

import { upcomingexamUpdate } from "../../../redux/action";

function UpComingExam() {
  const initialState = JSON.parse(localStorage.getItem("upcomingexam")) || [];
  const [input, setInput] = useState({
    name: "",
    poster: "",
    date: "",
  });
  const [exams, setExams] = useState(initialState);
  const [editExam, setEditExam] = useState(null);
  const token = localStorage.getItem("token");
  const dispatch = useDispatch();

  useEffect(() => {
    localStorage.setItem("upcomingexam", JSON.stringify(exams));
    async function fetchData() {
      const data = { token, exams };
      await dispatch(upcomingexamUpdate(data));
    }
    fetchData();
  }, [exams, dispatch, token]);

  return (
    <div>
      <div className="flex justify-start items-start mt-5 h-44">
        <div className="bg-blue-500">
          <div>
            <Header />
          </div>
          <div>
            <Form
              input={input}
              setInput={setInput}
              exams={exams}
              setExams={setExams}
              editExam={editExam}
              setEditExam={setEditExam}
            />
          </div>
          <div>
            <FormList
              exams={exams}
              setExams={setExams}
              setEditExam={setEditExam}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default UpComingExam;
