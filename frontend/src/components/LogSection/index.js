import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

import moment from "moment";
import UilPlus from "@iconscout/react-unicons/icons/uil-plus";

import LogSectionItem from "./LogSectionItem";
import LogSectionItemLoading from "./LogSectionItemLoading";
import LogSectionTitle from "./LogSectionTitle";

import "../../assets/styles/Buttons.css";
import "../../assets/styles/LogSection.css";

const LogSection = ({ user }) => {
  const [records, setRecords] = useState([]);

  const navigate = useNavigate();

  const getRecords = async () => {
    const res = await fetch("/api/records", {
      method: "POST",
      body: JSON.stringify(user),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (res.ok) {
      const result = await res.json();
      const data = result.sort(
        (a, b) => new Date(b.timestamp_day) - new Date(a.timestamp_day)
      );
      for (let i = 0; i < data.length; i++) {
        data[i].timestamp_day = moment(data[i].timestamp_day).format(
          "MMM Do YYYY"
        );
      }
      setRecords(data);
    } else {
      console.log(res.err);
    }
  };

  useEffect(() => {
    if (user.id) getRecords();
  }, [user]);

  const handleClick = () => {
    navigate("/createRecord");
  };

  return (
    <div className="d-flex flex-column log-section">
      <div className="d-flex justify-content-end">
        <button
          className="d-inline-flex align-items-center small-button log-section-add-record-button orange-solid"
          onClick={handleClick}
        >
          <UilPlus className="plus-icon" size="20" />
          Add record
        </button>
      </div>
      <LogSectionTitle />
      <div className="d-flex flex-column position-relative log-section-items">
        {records.length === 0 ? (
          <LogSectionItemLoading />
        ) : (
          records.map((record) => (
            <LogSectionItem key={record._id} record={record} />
          ))
        )}
      </div>
    </div>
  );
};

LogSection.propTypes = {
  user: PropTypes.object
};

export default LogSection;
