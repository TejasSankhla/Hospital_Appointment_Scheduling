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
    <div className="flex justify-center items-center min-h-screen bg-gray-100 py-10">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-2xl font-bold text-center text-gray-800">
          Appointment Details
        </h1>
        <p className="mt-3 text-center text-green-600 font-semibold">
          Appointment booked successfully
        </p>
        <div className="mt-6">
          <table className="w-full text-left">
            <tbody>
              <tr className="border-b">
                <td className="py-2">
                  <strong>Appointment Date:</strong>
                </td>
                <td className="py-2 text-gray-700">
                  {formatISOToDate(Booked.Appointment_date)}
                </td>
              </tr>
              <tr className="border-b">
                <td className="py-2">
                  <strong>Appointment Time:</strong>
                </td>
                <td className="py-2 text-gray-700">
                  {parseISOToTime(Booked.Appointment_time)}
                </td>
              </tr>
              <tr className="border-b">
                <td className="py-2">
                  <strong>Patient Name:</strong>
                </td>
                <td className="py-2 text-gray-700">{Booked.patient_name}</td>
              </tr>
              <tr className="border-b">
                <td className="py-2">
                  <strong>Patient Number:</strong>
                </td>
                <td className="py-2 text-gray-700">{Booked.patient_num}</td>
              </tr>
              <tr className="border-b">
                <td className="py-2">
                  <strong>Doctor:</strong>
                </td>
                <td className="py-2 text-gray-700">{Booked.doctor}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
