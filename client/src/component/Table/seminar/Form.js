import React, { useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

const Form = ({
  input,
  setInput,
  seminars,
  setSeminars,
  editSeminar,
  setEditSeminar,
}) => {
  const updateExam = ({ id, seminar, name, date, status }) => {
    const newExam = seminars.map((ex) =>
      ex.id === id ? { id, seminar, name, date, status } : ex
    );
    setSeminars(newExam);
    setEditSeminar("");
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
    if (!editSeminar) {
      setSeminars([
        ...seminars,
        {
          id: uuidv4(),
          seminar: input.seminar,
          name: input.name,
          date: input.date,
          status: false,
        },
      ]);
      // reset
      setInput({
        seminar: "",
        name: "",
        date: "",
      });
    } else {
      updateExam({
        id: editSeminar.id,
        seminar: input.seminar,
        name: input.name,
        date: input.date,
        status: editSeminar.status,
      });
    }
  };

  useEffect(() => {
    if (editSeminar) {
      setInput({
        seminar: editSeminar.seminar,
        name: editSeminar.name,
        date: editSeminar.date,
      });
    } else {
      setInput({
        seminar: "",
        name: "",
        date: "",
      });
    }
  }, [editSeminar, setInput]);

  return (
    <div className="flex justify-center items-center">
      <form className="my-2 flex flex-col" onSubmit={onSubmit}>
        <input
          className="mt-2"
          type="text"
          value={input.seminar}
          name="seminar"
          onChange={onChange}
        />
        <input
          className="mt-2"
          type="text"
          value={input.name}
          name="name"
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
          {editSeminar ? "OK" : "ADD"}
        </button>
      </form>
    </div>
  );
};

export default Form;
