import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import Form from "./Form";
import FormList from "./FormList";
import Header from "./Header";

import { seminarUpdate } from "../../../redux/action";

function UpComingExam() {
  const initialState = JSON.parse(localStorage.getItem("seminar")) || [];
  const [input, setInput] = useState({
    seminar: "",
    name: "",
    date: "",
  });
  const [seminars, setSeminars] = useState(initialState);
  const [editSeminar, setEditSeminar] = useState(null);
  const token = localStorage.getItem("token");
  const dispatch = useDispatch();

  useEffect(() => {
    localStorage.setItem("seminar", JSON.stringify(seminars));
    async function fetchData() {
      const data = { token, seminars };
      await dispatch(seminarUpdate(data));
    }
    fetchData();
  }, [seminars, dispatch, token]);

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
              seminars={seminars}
              setSeminars={setSeminars}
              editSeminar={editSeminar}
              setEditSeminar={setEditSeminar}
            />
          </div>
          <div>
            <FormList
              seminars={seminars}
              setSeminars={setSeminars}
              setEditSeminar={setEditSeminar}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default UpComingExam;
