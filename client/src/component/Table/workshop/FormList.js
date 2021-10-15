import React from "react";
import { AiFillCheckCircle } from "react-icons/ai";
import { BiPencil } from "react-icons/bi";
import { BsFillTrashFill } from "react-icons/bs";

const FormList = ({ workshops, setWorkshops, setEditWorkshop }) => {
  const handleComplete = (sub) => {
    setWorkshops(
      workshops.map((subject) => {
        if (subject.id === sub.id) {
          return { ...subject, status: !sub.status };
        }
        return subject;
      })
    );
  };

  const handleEdit = ({ id }) => {
    const findWorkshop = workshops.find((sub) => sub.id === id);
    setEditWorkshop(findWorkshop);
  };

  const handleDelete = ({ id }) => {
    setWorkshops(workshops.filter((sub) => sub.id !== id));
  };

  return (
    <div className="mx-2 my-5">
      {workshops.map((ex) => (
        <li className="flex flex-row my-2 rounded-md" key={ex.id}>
          <input
            type="text"
            value={ex.workshop}
            className={`${ex.status ? "line-through" : ""}`}
            onChange={(e) => e.preventDefault()}
          />
          <input
            type="text"
            value={ex.poster}
            className={`${ex.status ? "line-through" : ""}`}
            onChange={(e) => e.preventDefault()}
          />
          <input
            type="date"
            value={ex.date}
            className={`${ex.status ? "line-through" : ""}`}
            onChange={(e) => e.preventDefault()}
          />
          <div>
            <button onClick={() => handleComplete(ex)}>
              <AiFillCheckCircle />
            </button>
            <button onClick={() => handleEdit(ex)}>
              <BiPencil />
            </button>
            <button onClick={() => handleDelete(ex)}>
              <BsFillTrashFill />
            </button>
          </div>
        </li>
      ))}
    </div>
  );
};

export default FormList;
