
import { lazy } from "react";

const components = {
  Navbar: lazy(() => import("./Components/Navbar/Navbar")),
    RegisterUser: lazy(() => import("./Components/RegisterUser/RegisterUser")),
      Login: lazy(() => import("./Components/Login/Login")),
      Loading: lazy(() => import("./Components/Loading/Loading")),
        Home: lazy(() => import("./Components/Home/Home")),
          UserDashboard: lazy(() => import("./Components/UserDashboard/UserDashboard")),
            Ban: lazy(() => import("./Components/Ban/Ban")),
              TripsActive: lazy(() => import("./Components/Home/components/TripsActive")),
                CreateTrip: lazy(() => import("./Components/createTrip/CreateTrip")),
                  Star: lazy(() => import("./Components/Stars/Stars")),
                    Chatbot: lazy(() => import("./Components/Chatbot/Chatbot")),
                      TripHistory: lazy(() => import("./Components/TripHistory/TripHistory")),
                        TripsDashboard: lazy(() => import("./Components/TripsDashboard/TripsDashboard")),
                          Footer: lazy(() => import("./Components/Footer/Footer")),
                          };

    export default components;
