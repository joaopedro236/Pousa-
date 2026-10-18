import { useState, useEffect } from "react";
import photoUser from "../../assets/user.png";

export default function TripHistory({
  user,
  itemsNavbar,
  setSelectedRestaurant,
  setItemsNavbar,
  json,
}) {
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  const filtered = (json || []).filter((trip) => {
    if (!trip?.startDate) return true;
    const tripStart = new Date(trip.startDate);
    if (fromDate) {
      const from = new Date(fromDate);
      if (tripStart < from) return false;
    }
    if (toDate) {
      const to = new Date(toDate);
      if (tripStart > to) return false;
    }
    return true;
  });

  return (
    <>
      <section
        className={`tripHistory ${user && itemsNavbar == "trip history" ? "d-flex" : "d-none"} flex-column gap-2 star home`}
      >
        <header className="d-flex flex-column gap-1 p-2">
          <h1>Purchased Trips</h1>
          <p>Here is the history of the trips you have purchased.</p>

          <div className="d-flex gap-1 align-items-center">
            <label>
              From: <input type="date" value={fromDate} onChange={(e) => setFromDate(e.target.value)} />
            </label>
            <label>
              To: <input type="date" value={toDate} onChange={(e) => setToDate(e.target.value)} />
            </label>
            <button
              onClick={() => {
                setFromDate("");
                setToDate("");
              }}
            >
              Clear
            </button>
          </div>
        </header>
        <div className="trips">
          {filtered?.length > 0 ? (
            filtered.map((trip, index) => (
              <div
                className="trip"
                role="button"
                key={index}
                onClick={() => {
                  setSelectedRestaurant(trip);
                  setItemsNavbar("explore");
                }}
              >
                <div>
                  <h2>{trip?.name}</h2>
                  <p>
                    {trip?.description?.length > 80
                      ? trip?.description.slice(0, 60) + "..."
                      : trip?.description}
                  </p>
                </div>

                <div className="trip-info">
                  <span>
                    📅 {trip?.startDate} - {trip?.endDate}
                  </span>
                  <span>👥 {trip?.numberOfTravelers} travelers</span>
                  <span>
                    💰 {" "}
                    {trip?.price.toLocaleString("en-US", {
                      style: "currency",
                      currency: "USD",
                    })}
                  </span>
                  <span>⭐ {trip?.review}</span>
                  <span>😺 Pets {trip?.petsAllowed}</span>
                </div>
                <div className="trip-owner">
                  <img
                    src={trip.ownerImage || photoUser}
                    alt={trip.ownerName}
                    loading="lazy"
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src = photoUser;
                    }}
                  />

                  <span>{trip.ownerName}</span>
                </div>
              </div>
            ))
          ) : (
            <div className="no-trips">
              <h2>No trips found</h2>
              <p>You don't have any trips yet.</p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
