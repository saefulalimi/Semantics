import React from "react";
import { AiFillCheckCircle } from "react-icons/ai";
import { BiPencil } from "react-icons/bi";
import { BsFillTrashFill } from "react-icons/bs";

const FormList = ({ subjects, setSubjects, setEditSubject }) => {
  const handleComplete = (sub) => {
    setEditSubject(
      subjects.map((subject) => {
        if (subject.id === sub.id) {
          return { ...subject, status: !subject.status };
        }
        return subject;
      })
    );
  };

  const handleEdit = ({ id }) => {
    const findSubject = subjects.find((sub) => sub.id === id);
    setEditSubject(findSubject);
  };

  const handleDelete = ({ id }) => {
    setSubjects(subjects.filter((sub) => sub.id !== id));
  };

  return (
    <div className="mx-2 my-5">
      {subjects.map((sub) => (
        <li className="flex flex-row my-2 rounded-md" key={sub.id}>
          <input
            type="text"
            value={sub.content}
            className={`${sub.status ? "line-through" : ""}`}
            onChange={(e) => e.preventDefault()}
          />
          <div>
            <button onClick={() => handleComplete(sub)}>
              <AiFillCheckCircle />
            </button>
            <button onClick={() => handleEdit(sub)}>
              <BiPencil />
            </button>
            <button onClick={() => handleDelete(sub)}>
              <BsFillTrashFill />
            </button>
          </div>
        </li>
      ))}
    </div>
  );
};

export default FormList;
