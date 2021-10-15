import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import * as action from "../../../redux/action";
import { v4 as uuidv4 } from "uuid";
// import axios from "axios";

const Form = ({
  input,
  setInput,
  subjects,
  setSubjects,
  setStatus,
  editSubject,
  setEditSubject,
}) => {
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");

  const updateSubject = ({ id, input, status }) => {
    //changing
    const newSubject = subjects.map((subject) =>
      subject.id === id ? { id, input, status } : subject
    );

    const data = { token };
    async function updateSubject() {
      await dispatch(action.subjectChange());
    }

    setSubjects(newSubject);
    setEditSubject("");
  };

  const onChange = (e) => {
    setInput(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (!editSubject) {
      const data = { id: uuidv4(), content: input, status: false };
      const send = { token, data: data };

      async function addData() {
        await dispatch(action.subjectAdd(send));
      }
      setStatus(true);
      addData();
      setInput("");
    } else {
      setInput("");
    }
  };

  useEffect(() => {
    if (!editSubject) {
      setInput("");
    } else {
      updateSubject({
        id: editSubject.id,
        content: editSubject.content,
        status: editSubject.status,
      });
    }
  }, [editSubject, setInput]);

  return (
    <div className="flex justify-center items-center">
      <form className="my-2" onSubmit={onSubmit}>
        <input type="text" value={input} onChange={onChange} />
        <button className="mx-2" onClick={onSubmit}>
          {editSubject ? "OK" : "ADD"}
        </button>
      </form>
    </div>
  );
};

export default Form;
