import React, { useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

const Form = ({ input, setInput, exams, setExams, editExam, setEditExam }) => {
  const updateExam = ({ id, name, poster, date, status }) => {
    const newExam = exams.map((ex) =>
      ex.id === id ? { id, name, poster, date, status } : ex
    );
    setExams(newExam);
    setEditExam("");
  };

  const onChange = (e) => {
    const value = e.target.value;
    setInput({
      ...input,
      [e.target.name]: value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (!editExam) {
      setExams([
        ...exams,
        {
          id: uuidv4(),
          name: input.name,
          poster: input.poster,
          date: input.date,
          status: false,
        },
      ]);
      // reset
      setInput({
        name: "",
        poster: "",
        date: "",
      });
    } else {
      updateExam({
        id: editExam.id,
        name: input.name,
        poster: input.poster,
        date: input.date,
        status: editExam.status,
      });
    }
  };

  useEffect(() => {
    if (editExam) {
      setInput({
        name: editExam.name,
        poster: editExam.poster,
        date: editExam.date,
      });
    } else {
      setInput("");
    }
  }, [editExam, setInput]);

  return (
    <div className="flex justify-center items-center">
      <form className="my-2 flex flex-col" onSubmit={onSubmit}>
        <input
          className="mt-2"
          type="text"
          value={input.name}
          name="name"
          onChange={onChange}
        />
        <input
          className="mt-2"
          type="text"
          value={input.poster}
          name="poster"
          onChange={onChange}
        />
        <input
          className="mt-2"
          type="date"
          value={input.date}
          name="date"
          onChange={onChange}
        />
        <button className="mx-2" onClick={onSubmit}>
          {editExam ? "OK" : "ADD"}
        </button>
      </form>
    </div>
  );
};

export default Form;
