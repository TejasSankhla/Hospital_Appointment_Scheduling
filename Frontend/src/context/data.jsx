import { Book } from "lucide-react";
import { createContext, useState } from "react";
import { useEffect } from "react";
const DataContext = createContext(null);

const DataProvider = ({ children }) => {
  const [account, setAccount] = useState(null);
  const [doctor, setdoctor] = useState({});
  const [receptionist, setreceptionist] = useState({});
  const [app, setapp] = useState([]);
  const [Booked, setBooked] = useState({});
  useEffect(() => {}, [account, doctor, receptionist,Booked,app]);

  return (
    <DataContext.Provider
      value={{
        account,
        setAccount,
        doctor,
        setdoctor,
        receptionist,
        setreceptionist,
        app,
        setapp,
        Booked,setBooked
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export { DataProvider, DataContext };
