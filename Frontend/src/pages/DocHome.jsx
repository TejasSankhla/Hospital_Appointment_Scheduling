// src/DocHome.js
import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { DataContext } from "../context/data";

const DocHome = () => {
  const { account } = useContext(DataContext);
  const [availability, setAvailability] = useState({
    Monday: { from: "00:00", to: "00:00" },
    Tuesday: { from: "00:00", to: "00:00" },
    Wednesday: { from: "00:00", to: "00:00" },
    Thursday: { from: "00:00", to: "00:00" },
    Friday: { from: "00:00", to: "00:00" },
    Saturday: { from: "00:00", to: "00:00" },
  });
  const [doctorId, setDoctorId] = useState(account?.id);

  const parseISOToTime = (isoString) => {
    const date = new Date(isoString);
    return date.toTimeString().slice(0, 5); // "HH:MM" format
  };

  const convertTimeToISO = (time) => {
    const date = new Date();
    const [hours, minutes] = time.split(":");
    date.setHours(hours, minutes, 0, 0);
    return date.toISOString();
  };

  useEffect(() => {
    const fetchAvailability = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/doctors/get/availability`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ doctorId: doctorId }),
          }
        );
        const fetchedAvailability = await response.json();
        // console.log(fetchedAvailability);

        setAvailability({
          Monday: {
            from: parseISOToTime(fetchedAvailability.monday.from),
            to: parseISOToTime(fetchedAvailability.monday.to),
          },
          Tuesday: {
            from: parseISOToTime(fetchedAvailability.tuesday.from),
            to: parseISOToTime(fetchedAvailability.tuesday.to),
          },
          Wednesday: {
            from: parseISOToTime(fetchedAvailability.wednesday.from),
            to: parseISOToTime(fetchedAvailability.wednesday.to),
          },
          Thursday: {
            from: parseISOToTime(fetchedAvailability.thursday.from),
            to: parseISOToTime(fetchedAvailability.thursday.to),
          },
          Friday: {
            from: parseISOToTime(fetchedAvailability.friday.from),
            to: parseISOToTime(fetchedAvailability.friday.to),
          },
          Saturday: {
            from: parseISOToTime(fetchedAvailability.saturday.from),
            to: parseISOToTime(fetchedAvailability.saturday.to),
          },
        });
      } catch (error) {
        console.error("Error fetching availability:", error);
      }
    };

    if (doctorId) {
      fetchAvailability();
    }
  }, [doctorId]);

  const handleInputChange = (day, field, value) => {
    setAvailability((prevAvailability) => ({
      ...prevAvailability,
      [day]: {
        ...prevAvailability[day],
        [field]: value,
      },
    }));
    // console.log(availability);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const updatedAvailability = Object.keys(availability).reduce(
        (acc, day) => {
          acc[day.toLowerCase()] = {
            from: convertTimeToISO(availability[day].from),
            to: convertTimeToISO(availability[day].to),
          };
          return acc;
        },
        {}
      );
      // console.log(updatedAvailability);
      const response = await fetch(
        `http://localhost:3000/doctors/${doctorId}/availability`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedAvailability),
        }
      );
      const res = await response.json();
      if (res?.success) {
        // console.log(res);
        alert("Availability updated successfully!");
      } else throw error;
    } catch (error) {
      console.error("Error updating availability:");
      alert("Failed to update availability.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h1 className="text-2xl font-bold mb-4 text-center">
          Update Availability
        </h1>
        <form onSubmit={handleSubmit}>
          {Object.keys(availability).map((day) => (
            <div className="mb-4" key={day}>
              <label
                htmlFor={`${day.toLowerCase()}From`}
                className="block text-sm font-medium text-gray-700"
              >
                {day}:
              </label>
              <div className="flex space-x-2 mt-1">
                <input
                  type="time"
                  id={`${day.toLowerCase()}From`}
                  name={`${day.toLowerCase()}From`}
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  value={availability[day].from}
                  onChange={(e) =>
                    handleInputChange(day, "from", e.target.value)
                  }
                />
                <input
                  type="time"
                  id={`${day.toLowerCase()}To`}
                  name={`${day.toLowerCase()}To`}
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  value={availability[day].to}
                  onChange={(e) => handleInputChange(day, "to", e.target.value)}
                />
              </div>
            </div>
          ))}
          <button
            type="submit"
            className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Update
          </button>
        </form>
      </div>
    </div>
  );
};

export default DocHome;
