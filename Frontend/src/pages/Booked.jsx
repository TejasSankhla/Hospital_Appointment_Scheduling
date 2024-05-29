import React, { useContext } from "react";
import { DataContext } from "../context/data";

export default function Booked() {
  const { Booked } = useContext(DataContext);

  const parseISOToTime = (isoString) => {
    const date = new Date(isoString);
    let hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    const minutesStr = minutes < 10 ? "0" + minutes : minutes;
    return `${hours}:${minutesStr} ${ampm}`;
  };

  const formatISOToDate = (isoString) => {
    const date = new Date(isoString);
    return date.toLocaleDateString(); // Adjust the format as needed
  };

  return (
    <div className="wrap flex justify-center items-center my-20">
      <div className="w-[400px] rounded-md border p-4">
        <h1 className="text-lg font-semibold text-center">
          Appointment Details
        </h1>
        <p className="mt-3 text-sm text-gray-600 text-center">
          Appointment Booked successfully
        </p>
        <div className="mt-5">
          <table className="w-full">
            <tbody>
              <tr>
                <td>
                  <strong>Appointment Date:</strong>
                </td>
                <td>{formatISOToDate(Booked.Appointment_date)}</td>
              </tr>
              <tr>
                <td>
                  <strong>Appointment Time:</strong>
                </td>
                <td>{parseISOToTime(Booked.Appointment_time)}</td>
              </tr>
              <tr>
                <td>
                  <strong>Patient Name:</strong>
                </td>
                <td>{Booked.patient_name}</td>
              </tr>
              <tr>
                <td>
                  <strong>Patient Number:</strong>
                </td>
                <td>{Booked.patient_num}</td>
              </tr>
              <tr>
                <td>
                  <strong>Doctor:</strong>
                </td>
                <td>{Booked.doctor}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
