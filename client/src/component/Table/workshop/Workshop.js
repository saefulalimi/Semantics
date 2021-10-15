import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import Form from "./Form";
import FormList from "./FormList";
import Header from "./Header";
import { workshopUpdate } from "../../../redux/action";

function UpComingExam() {
  const initialState = JSON.parse(localStorage.getItem("workshop")) || [];
  const [input, setInput] = useState({
    workshop: "",
    poster: "",
    date: "",
  });
  const [workshops, setWorkshops] = useState(initialState);
  const [editWorkshop, setEditWorkshop] = useState(null);
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");

  useEffect(() => {
    localStorage.setItem("workshop", JSON.stringify(workshops));
    async function fetchData() {
      const data = { token, workshops };
      await dispatch(workshopUpdate(data));
    }
    fetchData();
  }, [workshops, dispatch, token]);

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
              workshops={workshops}
              setWorkshops={setWorkshops}
              editWorkshop={editWorkshop}
              setEditWorkshop={setEditWorkshop}
            />
          </div>
          <div>
            <FormList
              workshops={workshops}
              setWorkshops={setWorkshops}
              setEditWorkshop={setEditWorkshop}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default UpComingExam;
