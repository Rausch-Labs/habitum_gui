import * as React from 'react';
import './HabitCalender.css'
import { getDates, addDays, getMonthString, getDateString, groupBy } from '../../utils/date'
import { useEffect } from "react";
import { useHabitiumContext } from "../../context";

interface HabitLog {
  date: string,
  type: string,
  note: string
}

interface Days {
  Sun: string[]
  Mon: string[]
  Tue: string[]
  Wed: string[]

  Thur: string[]
  Fri: string[]
  Sat: string[]
}



const getOrange = (num: number) => {
  if (num >= 6) {
    return "#FFA054"
  } else if (num >= 4) {
    return "#E4975B"
  } else if (num >= 2) {
    return "#E4A26F"
  }
  return "#FF996D"
}

const renderHabitLogs = (habitLogs: HabitLog[], genericGroupFunction: <T>(list: any[], keyGetter: any) => Map<symbol, T[]> = groupBy) => {
  // Group habitLogs by their date
  const grouped: Map<symbol, HabitLog[]> = genericGroupFunction<HabitLog>(habitLogs, (habitLog: HabitLog) => habitLog.date)

  grouped.forEach((habitLogs) => {
    habitLogs.forEach((habitLog: HabitLog) => {
      const dateMarker = document.getElementById(habitLog.date)
      if (dateMarker) {
        dateMarker.style.backgroundColor = getColor(habitLogs.length)
      }
    });
  })
  return
}

const setupDays = (dates:  Date[]) => {
  const days: Days = {
    Sun: [],
    Mon: [],
    Tue: [],
    Wed: [],
    Thur: [],
    Fri: [],
    Sat: []
  }

  dates.forEach((date: Date) => {
    const year = date.getFullYear().toString()
    const month = getMonthString(date.getMonth().toString())
    const day = getDateString(date.getDate().toString())
    const dateString: string = year + '-' + month + '-' + day
    switch (date.getDay()) {
      case 1:
        days.Mon.push(dateString)
        break;
      case 2:
        days.Tue.push(dateString)
        break;
      case 3:
        days.Wed.push(dateString)
        break;
      case 4:
        days.Thur.push(dateString)
        break;
      case 5:
        days.Fri.push(dateString)
        break;
      case 6:
        days.Sat.push(dateString)
        break;
      case 0:
        days.Sun.push(dateString)
        break;
    }
  })

  return days
}


const setupCalander = (start: Date, end: Date) => {
  const dates: Date[] = getDates(end, start).reverse()
  const days = setupDays(dates)
  return shiftDays(days, end)
}

const shiftDays = (days: Days, end: Date) => {
  switch (end.getDay()) {
    case 0:
      days.Tue.unshift('0000-00-00')
      days.Wed.unshift('0000-00-00')
      days.Thur.unshift('0000-00-00')
      days.Fri.unshift('0000-00-00')
      days.Sat.unshift('0000-00-00')
      days.Mon.unshift('0000-00-00')
      break;
    case 1:
      days.Tue.unshift('0000-00-00')
      days.Wed.unshift('0000-00-00')
      days.Thur.unshift('0000-00-00')
      days.Fri.unshift('0000-00-00')
      days.Sat.unshift('0000-00-00')
      break;
    case 2:
      days.Wed.unshift('0000-00-00')
      days.Thur.unshift('0000-00-00')
      days.Fri.unshift('0000-00-00')
      days.Sat.unshift('0000-00-00')
      break;
    case 3:
      days.Thur.unshift('0000-00-00')
      days.Fri.unshift('0000-00-00')
      days.Sat.unshift('0000-00-00')
      break;
    case 4:
      days.Fri.unshift('0000-00-00')
      days.Sat.unshift('0000-00-00')
      break;
    case 5:
      days.Sat.unshift('0000-00-00')
      break;
    case 6:
      break;
  }
  return(days)
}

const getGreen = (num: number) => {
  if (num >= 6) {
    return "#0e4429"
  } else if (num >= 4) {
    return "#006d32"
  } else if (num >= 2) {
    return "#26a641"
  }
  return "#39d353"
}

const getColor = (num: number) => {
  getOrange(num)
  return getGreen(num)
}

export const HabitCalender: React.FC = () => {

  const { state } = useHabitiumContext()

  useEffect(() => {
    // Render habitLogs with array
    state.data ? renderHabitLogs(state.data.GetAllHabitLogs.dataList) : console.log("Fetching Data")
  }, [state.data])

  const now: Date = new Date()
  const end: Date = addDays(new Date(new Date().setFullYear(now.getFullYear() - 1)), 1)

  const calender = setupCalander(now, end)

  const renderCalenderDays = Object.values(calender).map((value, index) => {
    return (
      <div key={index} style={{ display: "flex", flexDirection: "row" }}>
        {value.map((date: string) => {
          return (<div className="marker" key={date} id={date} style={{ backgroundColor: date === "0000-00-00" ? "transparent" : "#353c45" }} />)
        })}
      </div>
    )
  })

  return (
    <>
      <div className="days-container">
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div className="day" style={{ visibility: "hidden"}} >empty</div>
          <div className="day" >Mon</div>
          <div className="day" style={{ visibility: "hidden"}} >empty</div>
          <div className="day" >Wed</div>
          <div className="day" style={{ visibility: "hidden"}} >empty</div>
          <div className="day" >Fri</div>
          <div className="day" style={{ visibility: "hidden"}} >empty</div>
        </div>
        <div className="hScroll">
          <div style={{ display: "flex", flexDirection: "column" }}>
            {renderCalenderDays}
          </div>
        </div>
      </div>
    </>
  )
}


