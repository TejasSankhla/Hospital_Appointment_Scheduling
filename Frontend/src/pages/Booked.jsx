import React, { useContext } from "react";
import { DataContext } from "../context/data";

export default function Booked() {
  const { Booked } = useContext(DataContext);
  
  return (
    <div className="wrap flex justify-center items-center my-20">
      <div className="w-[400px] rounded-md border p-4">
        <h1 className="text-lg font-semibold text-center">Appointment Details</h1>
        <p className="mt-3 text-sm text-gray-600 text-center">Appointment Booked successfully</p>
        <div className="mt-5">
          <table className="w-full">
            <tbody>
              <tr>
                <td><strong>Appointment Date:</strong></td>
                <td>{Booked.Appointment_date}</td>
              </tr>
              <tr>
                <td><strong>Appointment Time:</strong></td>
                <td>{Booked.Appointment_time}</td>
              </tr>
              <tr>
                <td><strong>Patient Name:</strong></td>
                <td>{Booked.patient_name}</td>
              </tr>
              <tr>
                <td><strong>Patient Number:</strong></td>
                <td>{Booked.patient_num}</td>
              </tr>
              <tr>
                <td><strong>Doctor:</strong></td>
                <td>{Booked.doctor}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
