import React, { useContext, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Lock } from "lucide-react";
import { DataContext } from "../context/data";
import { useNavigate } from "react-router-dom";

export default function RecHome() {
  const navigate = useNavigate();
  const { account, app, setapp, Booked, setBooked } = useContext(DataContext);
  const [date, setDate] = useState(new Date());
  const [pname, setPname] = useState("");
  const [pnum, setPnum] = useState("");
  const [doctor, setDoctor] = useState("");
  const [date2, setDate2] = useState(new Date());

  async function genAppointment() {
    try {
      const response = await fetch(`http://localhost:3000/doctors/name`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: doctor }),
      });
      const res = await response.json();
      // console.log(res);

      if (res?.success) {
        const newAppointment = {
          Appointment_date: date,
          patient_name: pname,
          patient_num: pnum,
          doctor: res?.docid?._id,
          receptionist: account?.id,
        };
        // console.log(newAppointment);
        setapp((prevApp) => [...prevApp, newAppointment]);
        console.log("New appointment generated:", newAppointment);
        const booking = await fetch(`http://localhost:3000/appointments`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newAppointment),
        });
        const findata = await booking.json();
        console.log(findata);

        if (findata.success) {
          setBooked(findata.appointment);
          navigate("/book");
        }
      }
    } catch (error) {
      console.log("Error generating appointment:", error);
    }
  }

  async function getAllAppointments() {
    try {
      const response = await fetch(`http://localhost:3000/appointments/day`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ Appointment_date: date2 }),
      });
      const res = await response.json();
      console.log(res);
      // console.log("here");

      setapp(res.app);
      console.log("Appointments for the day:", res.app);
      navigate("/all-app");
    } catch (error) {
      console.log("Error fetching appointments:", error);
    }
  }

  return (
    <section className="py-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto w-full text-center md:max-w-2xl">
          <h2 className="text-3xl font-bold leading-tight text-black sm:text-4xl lg:text-5xl">
            Welcome {account?.name}
          </h2>
        </div>
        <div className="flex justify-around my-5">
          <div className="form flex flex-col gap-2 m-5">
            <h2 className="text-lg font-semibold">Schedule Appointments</h2>
            <label className="text-sm text-gray-600">Select Date</label>
            <DatePicker selected={date} onChange={setDate} />
            <label htmlFor="pname">Patient Name:</label>
            <input
              type="text"
              name="pname"
              value={pname}
              onChange={(e) => setPname(e.target.value)}
              className="border rounded p-2"
            />
            <label htmlFor="pnum">Patient Number:</label>
            <input
              type="text"
              name="pnum"
              value={pnum}
              onChange={(e) => setPnum(e.target.value)}
              className="border rounded p-2"
            />
            <label htmlFor="docid">Doctor ID:</label>
            <input
              type="text"
              name="docid"
              value={doctor}
              onChange={(e) => setDoctor(e.target.value)}
              className="border rounded p-2"
            />
            <button
              className="m-5 rounded-lg bg-blue-600 p-2 text-white text-lg"
              onClick={genAppointment}
            >
              Generate Appointment
            </button>
          </div>
          <div className="form flex flex-col gap-2 m-5 items-center">
            <h2 className="text-lg font-semibold">Get Appointments</h2>
            <label className="text-sm text-gray-600">Enter Date</label>
            <DatePicker selected={date2} onChange={setDate2} />
            <button
              className="m-5 rounded-lg bg-blue-600 p-2 text-white text-lg"
              onClick={getAllAppointments}
            >
              Get Appointment
            </button>
          </div>
        </div>
        <div className="mt-8 flex items-center justify-center px-8 sm:px-0">
          <Lock className="h-4 w-4 text-gray-600" />
          <span className="ml-2 text-sm text-gray-600">
            Your data is completely secured with us. We don&apos;t share it with
            anyone.
          </span>
        </div>
      </div>
    </section>
  );
}
