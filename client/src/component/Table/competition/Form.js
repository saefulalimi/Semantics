import React, { useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

const Form = ({
  input,
  setInput,
  competitions,
  setCompetitions,
  editCompetition,
  setEditCompetition,
}) => {
  const updateExam = ({ id, competition, poster, date, status }) => {
    const newWorkshop = competitions.map((ex) =>
      ex.id === id ? { id, competition, poster, date, status } : ex
    );
    setCompetitions(newWorkshop);
    setEditCompetition("");
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
    if (!editCompetition) {
      setCompetitions([
        ...competitions,
        {
          id: uuidv4(),
          competition: input.competition,
          poster: input.poster,
          date: input.date,
          status: false,
        },
      ]);
      // reset
      setInput({
        competition: "",
        poster: "",
        date: "",
      });
    } else {
      updateExam({
        id: editCompetition.id,
        competition: input.competition,
        poster: input.poster,
        date: input.date,
        status: editCompetition.status,
      });
    }
  };

  useEffect(() => {
    if (editCompetition) {
      setInput({
        competition: editCompetition.competition,
        poster: editCompetition.poster,
        date: editCompetition.date,
      });
    } else {
      setInput({
        competition: "",
        poster: "",
        date: "",
      });
    }
  }, [editCompetition, setInput]);

  return (
    <div className="flex justify-center items-center">
      <form className="my-2 flex flex-col" onSubmit={onSubmit}>
        <input
          className="mt-2"
          type="text"
          value={input.competition}
          name="competition"
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
          {editCompetition ? "OK" : "ADD"}
        </button>
      </form>
    </div>
  );
};

export default Form;
