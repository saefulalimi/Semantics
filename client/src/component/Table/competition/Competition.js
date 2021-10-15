import React, { useState, useEffect } from "react";
import Form from "./Form";
import { useDispatch } from "react-redux";
import FormList from "./FormList";
import Header from "./Header";
import { competitionUpdate } from "../../../redux/action";

function UpComingExam() {
  const initialState = JSON.parse(localStorage.getItem("competition")) || [];
  const [input, setInput] = useState({
    competition: "",
    poster: "",
    date: "",
  });
  const [competitions, setCompetitions] = useState(initialState);
  const [editCompetition, setEditCompetition] = useState(null);
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");

  useEffect(() => {
    localStorage.setItem("competition", JSON.stringify(competitions));
    async function fetchData() {
      const data = { token, competitions };
      await dispatch(competitionUpdate(data));
    }
    fetchData();
  }, [competitions, dispatch, token]);

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
              competitions={competitions}
              setCompetitions={setCompetitions}
              editCompetition={editCompetition}
              setEditCompetition={setEditCompetition}
            />
          </div>
          <div>
            <FormList
              competitions={competitions}
              setCompetitions={setCompetitions}
              setEditCompetition={setEditCompetition}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default UpComingExam;
