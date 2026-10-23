import "./StylesGlobals/reset.css";
import "./StylesGlobals/assets.css";
import "./StylesGlobals/root.css";

import VLibras from "@djpfs/react-vlibras";
import TripsActive from "./Components/Home/components/TripsActive";
import { useNavigate } from "react-router-dom";
import RegisterUser from "./Components/RegisterUser/RegisterUser";
import UserDashboard from "./Components/UserDashboard/UserDashboard";
import Navbar from "./Components/Navbar/Navbar";
import CreateTrip from "./Components/createTrip/CreateTrip";
import Home from "./Components/Home/Home";
import Login from "./Components/Login/Login";
import Loading from "./Components/loading/Loading";
import Star from "./Components/Stars/Stars";
import Chatbot from "./Components/Chatbot/Chatbot";
import TripHistory from "./Components/TripHistory/TripHistory";
import TripsDashboard from "./Components/TripsDashboard/TripsDashboard";
import Footer from "./Components/Footer/Footer";
import Ban from "./Components/Ban/Ban";
import { Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";

function App() {
  const [user, setUser] = useState(false);
  const [banInfo, setBanInfo] = useState(null);
  const [login, setLogin] = useState(false);
  const [selectedTrip, setSelectedRestaurant] = useState(null);

  const [itemsNavbar, setItemsNavbar] = useState("explore");
  const [userData, setUserData] = useState(null);
  const [starTrip, setStarTrip] = useState([]);
  const [loading, setLoading] = useState(true);

  const checkUser = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/checkUser`,
        {
          credentials: "include",
        },
      );

      const data = await response.json();

      setUser(data.authenticated);
      setBanInfo(data.Error === "Ban Detected" ? data : null);

      return data;
    } catch (error) {
      console.error(error);
      setUser(false);
      setBanInfo(null);
      return null;
    }
  };
  const [tripHistory, setTripHistory] = useState(null);

  const getUser = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/getUser`, {
        credentials: "include",
      });

      const data = await response.json();

      if (data?.image_url) {
        await new Promise((resolve) => {
          const img = new Image();

          img.onload = resolve;
          img.onerror = resolve;

          img.src = data.image_url;
        });
      }

      setUserData(data);
      setStarTrip(data?.favoriteTrips ||[])
      setTripHistory(data?.tripsAlreadyPurchased)
      return data;
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  

  useEffect(() => {
    const initializeApp = async () => {
      await Promise.all([checkUser(), getUser()]);

      setLoading(false);
    };

    initializeApp();
  }, []);

  useEffect(() => {
    document.body.classList.toggle("user-active", user);
  }, [user]);

  
  if (loading) {
    return <Loading />;
  }
  return (
    <>
      <VLibras />
      <Ban user={banInfo} />
      <RegisterUser
        checkUser={checkUser}
        user={user}
        setUser={setUser}
        login={login}
        setLogin={setLogin}
      />

      <Login
        user={user}
        setUser={setUser}
        checkUser={checkUser}
        login={login}
        setLogin={setLogin}
      />

      <main className={`d-flex flex-column ${user ? "Active" : ""}`}>
        <Navbar ItemsNavbar={setItemsNavbar} user={user} userData={userData} />

        <Routes>
          <Route
            path="/"
            element={
              <Home
                user={user}
                userData={userData}
                itemsNavbar={itemsNavbar}
                setItemsNavbar={setItemsNavbar}
                selectedTrip={selectedTrip}
                setSelectedRestaurant={setSelectedRestaurant}
                
                starTrip={starTrip}
              />
            }
          />
          <Route path="/trip/" element={<Navigate to="/" replace />} />
          <Route
            path="/trip/:tripId"
            element={
              <TripsActive
              
                user={user}
                starTrip={starTrip}
                selectedTrip={selectedTrip}
                setSelectedRestaurant={setSelectedRestaurant}
                itemsNavbar={itemsNavbar}
              />
            }
          />
        </Routes>

        <UserDashboard
          itemsNavbar={itemsNavbar}
          user={user}
          userData={userData}
        />

        <CreateTrip
          user={user}
          itemsNavbar={itemsNavbar}
          setUser={setUser}
          setItemsNavbar={setItemsNavbar}
        />
        <Star
          setSelectedRestaurant={setSelectedRestaurant}
          itemsNavbar={itemsNavbar}
          json={starTrip}
          setItemsNavbar={setItemsNavbar}
        />
        <TripHistory
          user={user}
          json={tripHistory}
          setItemsNavbar={setItemsNavbar}
          setSelectedRestaurant={setSelectedRestaurant}
          itemsNavbar={itemsNavbar}
        />
        <TripsDashboard
          itemsNavbar={itemsNavbar}
          setItemsNavbar={setItemsNavbar}
          setSelectedRestaurant={setSelectedRestaurant}
        />
        <Chatbot
          user={user}
          selectedTrip={selectedTrip}
          userData={userData}
        />
        <Footer />
      </main>
    </>
  );
}

export default App;
