import React, { useEffect, useContext, useState } from "react";
import { Calendar } from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./css/styles.css";
import { motion } from "framer-motion";
import { useHistory } from "react-router-dom";
import { pageVariants, pageTransition } from "../../util/framerStyles";
import axios from "axios";
import { apiUrl } from "../../util/apiUrl";
import { AuthContext } from "../../providers/AuthContext";
import { taskDatesArr, func } from "./helpers/helpers";
import logo from "../../assets/img/logo.png";

const CalendarPage = () => {
  const API = apiUrl();
  const history = useHistory();
  const { currentUser, token } = useContext(AuthContext);
  const [currentDate, setCurrentDate] = useState({
    month: new Date().getMonth() + 1,
    year: new Date().getFullYear(),
  });
  const [tasks, setTasks] = useState([]);

  const dayClick = (e) => {
    let day = new Date(e).toISOString();
    history.push(`/calendar/tasks/${day}`);
  };

  const onClick = (value, e) => {
    setCurrentDate({
      month: new Date(value.activeStartDate).getMonth() + 1,
      year: new Date(value.activeStartDate).getFullYear(),
    });
  };

  useEffect(() => {
    const getMonthsTasks = async () => {
      try {
        let res = await axios({
          method: "GET",
          url: `${API}/api/users/tasks/month/${currentDate.month}?user=${currentUser.id}&year=${currentDate.year}`,
          headers: {
            authToken: token,
          },
        });
        setTasks(res.data.tasks);
      } catch (error) {
        console.log(error);
      }
    };
    getMonthsTasks();
  }, [API, currentDate.month, currentDate.year, currentUser.id, token]);

  return (
    <div>
      <motion.div
        initial="initial"
        animate="in"
        exit="out"
        variants={pageVariants}
        transition={pageTransition}
        className="calDiv"
      >
        <div>
          <img style={{ height: "12vh" }} alt="" src={logo} />
        </div>
        <Calendar
          tileClassName={"tileClass"}
          className={"cally"}
          showNavigation={true}
          tileContent={({ activeStartDate, date, view }) =>
            func(date, taskDatesArr(tasks), view)
          }
          onClickDay={dayClick}
          onClickMonth={onClick}
          value={new Date()}
          onActiveStartDateChange={onClick}
          showNeighboringMonth={false}
        />
      </motion.div>
    </div>
  );
};

export default CalendarPage;
