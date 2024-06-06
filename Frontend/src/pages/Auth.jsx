import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import hospital from "../assets/hospital.png";
import { Button } from "../components/Button";
import { DataContext } from "../context/data";

export default function Auth() {
  const {
    setAccount,
    setdoctor,
    doctor,
    setreceptionist,
    account,
    receptionist,
  } = useContext(DataContext);
  const [email, setEmail] = useState("tejas@gmail.com");
  const [password, setPassword] = useState("123");
  const [type, setType] = useState("doctors");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  useEffect(() => {}, [doctor, receptionist]);
  const handleLogin = async (event) => {
    event.preventDefault();
    // console.log(password, email);
    try {
      const response = await fetch(`http://localhost:3000/${type}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      const res = await response.json();
      // console.log(res);
      if (res.success) {
        const details = res.data;
        setAccount({
          token: details.access_token,
          name:
            type === "doctors"
              ? details.doctor.name
              : details.receptionist.name,
          id:
            type === "doctors" ? details.doctor._id : details.receptionist._id,
          type: type,
        });
        // console.log(account);
        if (type === "doctors") {
          setdoctor(details.doctor);
          navigate("/DocHome");
        } else {
          setreceptionist(details.receptionist);
          navigate("/RecHome");
        }
      } else {
        throw { code: res?.err?.code, message: res?.err?.message };
      }
    } catch (error) {
      // navigate("/loginerror");
      // alert(`${error.message}`);
      setError(error.message); 
      // console.error("Login error:", error);
    }
  };

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img
          className="mx-auto h-10 w-auto"
          src={hospital}
          alt="Your Company"
        />
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Sign in to your account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" onSubmit={handleLogin}>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Email address
            </label>
            <div className="mt-2">
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Password
            </label>
            <div className="mt-2">
              <input
                id="password"
                name="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div className="flex justify-around">
            <Button
              content="Doctor"
              onClick={() => setType("doctors")}
              className={type === "doctors" ? "bg-blue-200" : ""}
            />
            <Button
              content="Receptionist"
              onClick={() => setType("receptionists")}
              className={type === "receptionists" ? "bg-blue-200" : ""}
            />
          </div>

          <div className="signinas">
            <span className="block text-sm font-medium leading-6 text-gray-900">
              Sign In as:{" "}
              <span className="text-red-500">
                {type === "doctors" ? "Doctor" : "Receptionist"}
              </span>
            </span>
          </div>
          {error && <div className="text-red-500 text-sm">{error}</div>}

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Sign in
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
