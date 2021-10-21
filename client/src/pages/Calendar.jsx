import React, { Component } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import "../style/calendar.css";
import MobileNavbar from "../component/navbar/mobile/MobileNavbar";
import { Link } from "react-router-dom";
import { BsBackspaceFill } from "react-icons/bs";

const events = [{ title: "Today", date: new Date() }];

export class Calendar extends Component {
  render() {
    return (
      <div className="containercal">
        <Link
          className="hidden md:inline-block absolute inset z-index-10 my-3 mx-3"
          to="/dashboard"
        >
          <BsBackspaceFill
            className="hover:cursor-pointer text-white hover:text-black"
            size="1.3rem"
          />
        </Link>
        <div className="bodycal col-sm-12">
          <div className="callenda">
            <FullCalendar
              className="fullcalenda"
              defaultView="dayGridMonth"
              plugins={[dayGridPlugin]}
              events={events}
            />
          </div>
        </div>
        <div className="mobileNav">
          <MobileNavbar />
        </div>
      </div>
    );
  }
}

export default Calendar;
