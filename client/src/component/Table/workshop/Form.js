import React, { useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

const Form = ({
  input,
  setInput,
  workshops,
  setWorkshops,
  editWorkshop,
  setEditWorkshop,
}) => {
  const updateWorkshop = ({ id, workshop, poster, date, status }) => {
    const newWorkshop = workshops.map((ex) =>
      ex.id === id ? { id, workshop, poster, date, status } : ex
    );
    setWorkshops(newWorkshop);
    setEditWorkshop("");
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
    if (!editWorkshop) {
      setWorkshops([
        ...workshops,
        {
          id: uuidv4(),
          workshop: input.workshop,
          poster: input.poster,
          date: input.date,
          status: false,
        },
      ]);
      // reset
      setInput({
        workshop: "",
        poster: "",
        date: "",
      });
    } else {
      updateWorkshop({
        id: editWorkshop.id,
        workshop: input.workshop,
        poster: input.poster,
        date: input.date,
        status: editWorkshop.status,
      });
    }
  };

  useEffect(() => {
    if (editWorkshop) {
      setInput({
        workshop: editWorkshop.workshop,
        poster: editWorkshop.poster,
        date: editWorkshop.date,
      });
    } else {
      setInput({
        workshop: "",
        poster: "",
        date: "",
      });
    }
  }, [editWorkshop, setInput]);

  return (
    <div className="flex justify-center items-center">
      <form className="my-2 flex flex-col" onSubmit={onSubmit}>
        <input
          className="mt-2"
          type="text"
          value={input.workshop}
          name="workshop"
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
          {editWorkshop ? "OK" : "ADD"}
        </button>
      </form>
    </div>
  );
};

export default Form;
