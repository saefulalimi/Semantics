import React, { Component } from 'react'  ;  
import FullCalendar from "@fullcalendar/react";  
import dayGridPlugin from "@fullcalendar/daygrid";  
import '../style/calendar.css'


const events = [{ title: "Today", date: new Date() }];  

export class Calendar extends Component {  
    render() {  
        return (  
            <div className="containercal">  
                <div className="bodycal col-sm-12">   
                    <div className="callenda">
                    <FullCalendar  
                     className="fullcalendar"
                    defaultView="dayGridMonth"  
                    plugins={[dayGridPlugin]}  
                    events={events}  
                />
                    </div>

               </div>      
            </div>  
        )  
    }  
}  
  
export default Calendar 