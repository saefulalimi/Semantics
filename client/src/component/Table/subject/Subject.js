import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import Form from "./Form";
import FormList from "./FormList";
import Header from "./Header";
import * as action from "../../../redux/action";

function Subject() {
  const [input, setInput] = useState("");
  const [subjects, setSubjects] = useState(
    JSON.parse(localStorage.getItem("subject"))
  );
  const [status, setStatus] = useState(false);
  const [editSubject, setEditSubject] = useState(null);
  const token = localStorage.getItem("token");
  const dispatch = useDispatch();

  useEffect(() => {
    if (status) {
      async function getdata() {
        await dispatch(action.subjectGet(token));
      }
      getdata();
      setStatus(false);
    }
  }, [status, dispatch, token]);

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
              status={status}
              subjects={subjects}
              setStatus={setStatus}
              editSubject={editSubject}
              setEditSubject={setEditSubject}
            />
          </div>
          <div>
            <FormList
              subjects={subjects}
              setSubjects={setSubjects}
              setEditSubject={setEditSubject}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Subject;
