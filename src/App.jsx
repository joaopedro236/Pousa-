import "./StylesGlobals/reset.css";
import "./StylesGlobals/assets.css";
import "./StylesGlobals/root.css";

import VLibras from "@djpfs/react-vlibras";
import { useNavigate } from "react-router-dom";

import components from "./components";
import { Suspense } from "react";
import checkUser from "./Requests/CheckUser";
import getUser from "./Requests/getUser";
import { Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
const {
  Navbar,
  RegisterUser,
  Login,
  Loading,
  Home,
  UserDashboard,
  Ban,
  TripsActive,
  CreateTrip,
  Star,
  Chatbot,
  TripHistory,
  TripsDashboard,
  Footer
} = components
function App() {
  const [user, setUser] = useState(false);
  const [banInfo, setBanInfo] = useState(null);
  const [login, setLogin] = useState(false);
  const [selectedTrip, setSelectedTrip] = useState(null);

  const [itemsNavbar, setItemsNavbar] = useState("explore");
  const [userData, setUserData] = useState(null);
  const [starTrip, setStarTrip] = useState([]);
  const [loading, setLoading] = useState(true);

  
  const [tripHistory, setTripHistory] = useState(null)


  useEffect(() => {
      const initializeApp = async () => {
          try {
                await Promise.all([
                        checkUser(setUser, setBanInfo),
                                getUser(setUserData, setStarTrip, setTripHistory)
                                      ]);
                                          } catch (error) {
                                                console.error("Error initializing application:", error);
                                                    } finally {
                                                          setLoading(false);
                                                              }
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
    <Suspense fallback={<Loading/>}>
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
                setSelectedTrip={setSelectedTrip}
                
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
                setSelectedTrip={setSelectedTrip}
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
          setSelectedTrip={setSelectedTrip}
          itemsNavbar={itemsNavbar}
          json={starTrip}
          setItemsNavbar={setItemsNavbar}
        />
        <TripHistory
          user={user}
          json={tripHistory}
          setItemsNavbar={setItemsNavbar}
          setSelectedTrip={setSelectedTrip}
          itemsNavbar={itemsNavbar}
        />
        <TripsDashboard
          itemsNavbar={itemsNavbar}
          setItemsNavbar={setItemsNavbar}
          setSelectedTrip={setSelectedTrip}
        />
        <Chatbot
          user={user}
          selectedTrip={selectedTrip}
          userData={userData}
        />
        <Footer />
      </main>
      </Suspense>
    </>
  );

}
export default App;
