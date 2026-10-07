import "./tripDashboard.css";
import cards from "./cards";
import photoUser from '../../assets/user.png'

import { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
export default function TripsDashboard({
  itemsNavbar,
  setItemsNavbar,
  setSelectedRestaurant,
}) {
  const [json, setJson] = useState(null);
  const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const chartData = weekDays.map((day, index) => ({
    day,
    tripsobtainedhistoryS: json?.tripsobtainedhistoryS?.[index] ?? 0,
  }));
  const requisition = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/metrics`, {
        method: "GET",
        credentials: "include",
      });
      const data = await response.json();
      if (data?.Error) {
        console.error(data?.Error);
      }
      setJson(data);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    requisition();
  }, []);
  const [currentIndex, setCurrentIndex] = useState(0);

  const next = () => {
    setCurrentIndex((prev) => Math.min(prev + 1, json.trip.length - 1));
  };

  const previous = () => {
    setCurrentIndex((prev) => Math.max(prev - 1, 0));
  };
  return (
    <>
      <section
        className={`tripsDashboard ${itemsNavbar == "trip dashboard" ? "d-flex" : "d-none"}`}
      >
        <header className="d-flex flex-column">
          <h1>Trip tracking dashboard </h1>
          <p>
            Track revenues, operating profits, and traveler feedback in real
            time.
          </p>
        </header>
        <div className="cardsTrips ">
          {cards.map((cardsMap) => (
            <div className="card" key={cardsMap.id}>
              <h2 className="fw-normal">{cardsMap.title}</h2>
              <h1>
                {cardsMap?.json === "moneyObtained"
                  ? new Intl.NumberFormat("en-us", {
                      style: "currency",
                      currency: "usd",
                      notation: "compact",
                    }).format(json?.[cardsMap?.json] || 0)
                  : json?.[cardsMap?.json] || 0}
              </h1>
            </div>
          ))}
        </div>
        <div className="graphicTrips ">
          <ResponsiveContainer width="100%" height={300}>
            <LineChart
              style={{ cursor: "pointer" }}
              data={chartData}
              margin={{
                top: 10,
                right: 10,
                left: -20,
                bottom: 0,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="day"
                niceTicks="snap125"
                style={{ fontSize: 11 }}
                interval={0}
              />
              <YAxis
                width="40"
                niceTicks="snap125"
                style={{ fontSize: 11 }}
                dataKey="tripsobtainedhistoryS"
              />
              <Tooltip />
              <Line
                type="monotone"
                name="money"
                dataKey="tripsobtainedhistoryS"
                stroke="var(--bs-primary)"
                strokeWidth={3}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="trips">
          {json?.trip?.[currentIndex] && (
            <div
              className="trip"
              role="button"
              
              onClick={() => {
                setSelectedRestaurant(json.trip[currentIndex]);
                setItemsNavbar("explore");
              }}
            >
              <div>
                <h2>{json.trip[currentIndex].name}</h2>
                <p>
                  {json.trip[currentIndex].description?.length > 80
                    ? json.trip[currentIndex].description.slice(0, 60) + "..."
                    : json.trip[currentIndex].description}
                </p>
              </div>

              <div className="trip-info">
                <span>
                  📅 {json.trip[currentIndex].startDate} - {json.trip[currentIndex].endDate}
                </span>
                <span>👥 {json.trip[currentIndex].numberOfTravelers} travelers</span>
                <span>
                  💰{" "}
                  {json.trip[currentIndex].price.toLocaleString("en-US", {
                    style: "currency",
                    currency: "USD",
                  })}
                </span>
                <span>⭐ {json.trip[currentIndex]?.review}</span>
                <span>😺 Pets {json.trip[currentIndex]?.petsAllowed}</span>
              </div>

              <div className="trip-owner">
                <img
                  src={json.trip[currentIndex].ownerImage || photoUser}
                  alt={json.trip[currentIndex].ownerName}
                  loading="lazy"
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = photoUser;
                  }}
                />

                <span>{json.trip[currentIndex].ownerName}</span>
              </div>
            </div>
          )}
          <div className="buttons">
          <button onClick={previous}>{'<'}</button>
          <button onClick={next}>{">"}</button>
          </div>
        </div>
      </section>
    </>
  )
}
