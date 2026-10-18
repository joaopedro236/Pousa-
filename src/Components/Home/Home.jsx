import "./home.css";
import TripsActive from "./components/TripsActive";
import { useState, useEffect } from "react";
import photoUser from "../../assets/user.png";
import { useNavigate, useParams } from "react-router-dom";

const normalizeDateValue = (value) => {
  if (!value) return null;
  const date = new Date(`${value}T00:00:00`);
  return Number.isNaN(date.getTime()) ? null : date;
};

const parseBooleanValue = (value) => {
  if (typeof value === "boolean") return value;
  if (typeof value === "number") return value === 1;

  const text = String(value ?? "")
    .trim()
    .toLowerCase();
  return ["true", "1", "yes", "sim", "y"].includes(text);
};

export default function Home({
  user,
  userData,
  selectedRestaurant,
  setSelectedRestaurant,
  itemsNavbar,
  setItemsNavbar,
  starTrip,
  stars,
}) {
  const [json, setJson] = useState({ trips: [] });
  const [search, setSearch] = useState("");
  const [showDateFilter, setShowDateFilter] = useState(false);
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [petFilter, setPetFilter] = useState("any");
  const [appliedPetFilter, setAppliedPetFilter] = useState("any");
  const [maxPrice, setMaxPrice] = useState("");
  const [appliedMaxPrice, setAppliedMaxPrice] = useState("");
  const [minRating, setMinRating] = useState("");
  const [appliedMinRating, setAppliedMinRating] = useState("");
  const [minTravelers, setMinTravelers] = useState("");
  const [appliedMinTravelers, setAppliedMinTravelers] = useState("");
  const { tripId } = useParams();

  useEffect(() => {
    if (!tripId || !json.trips.length) return;

    const trip = json.trips.find((trip) => String(trip.id) === String(tripId));

    if (trip) {
      setSelectedRestaurant(trip);
    }
  }, [tripId, json.trips]);

  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const tripsResponse = await fetch(
        `${import.meta.env.VITE_API_URL}/getTrips`,
      );
      const tripsData = await tripsResponse.json();

      setJson({
        trips: tripsData?.trips || [],
      });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();

    const interval = setInterval(fetchData, 300000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (itemsNavbar !== "explore") return;
    fetchData();
  }, [itemsNavbar]);

  const filteredTrips = (json?.trips || []).filter((trip) => {
    const q = search?.toLowerCase();
    if (q) {
      const matches =
        trip?.name?.toLowerCase().includes(q) ||
        trip?.description?.toLowerCase().includes(q);
      if (!matches) return false;
    }

    const tripStartDate = normalizeDateValue(trip?.startDate);

    if (appliedPetFilter && appliedPetFilter !== "any") {
      const expectedPet = appliedPetFilter === "yes";
      if (parseBooleanValue(trip?.petsAllowed) !== expectedPet) return false;
    }

    if (appliedMaxPrice) {
      if (Number(trip.price || 0) > Number(appliedMaxPrice)) return false;
    }

    if (appliedMinRating) {
      if (Number(trip.review || 0) < Number(appliedMinRating)) return false;
    }

    if (appliedMinTravelers) {
      if (Number(trip.numberOfTravelers || 0) < Number(appliedMinTravelers))
        return false;
    }

    return true;
  });

  return (
    <>
      <section
        className={`home ${
          user && itemsNavbar == "explore" && selectedRestaurant == null
            ? "show-home"
            : "hide-home"
        } flex-column gap-2`}
      >
        <header className="px-3 m-auto mt-3 d-flex flex-column align-items-center justify-content-center">
          <form
            className="search-form"
            onSubmit={(e) => e.preventDefault()}
            role="search"
          >
            <div className="search-box">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="21"
                height="21"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.3-4.3" />
              </svg>

              <input
                type="search"
                className="form-control"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search for accommodations"
                aria-label="Search for accommodations"
              />

              <button
                type="button"
                className="filter-btn"
                title="Toggle date filter"
                onClick={() => setShowDateFilter((s) => !s)}
              >
                📅
              </button>
            </div>

            {showDateFilter && (
              <div className="date-filter">
                <div className="filter-field">
                  <label className="filter-label">Pets</label>
                  <select
                    className="date-input"
                    value={petFilter}
                    onChange={(e) => setPetFilter(e.target.value)}
                  >
                    <option value="any">Any</option>
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                  </select>
                </div>

                <div className="filter-field">
                  <label className="filter-label">Max price</label>
                  <input
                    type="number"
                    min="0"
                    placeholder="0"
                    className="date-input"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(e.target.value)}
                  />
                </div>

                <div className="filter-field">
                  <label className="filter-label">Rating</label>
                  <select
                    className="date-input"
                    value={minRating}
                    onChange={(e) => setMinRating(e.target.value)}
                  >
                    <option value="">Any</option>
                    <option value="1">1+</option>
                    <option value="2">2+</option>
                    <option value="3">3+</option>
                    <option value="4">4+</option>
                    <option value="5">5</option>
                  </select>
                </div>

                <div className="filter-field">
                  <label className="filter-label">Travelers</label>
                  <input
                    type="number"
                    min="1"
                    placeholder="1"
                    className="date-input"
                    value={minTravelers}
                    onChange={(e) => setMinTravelers(e.target.value)}
                  />
                </div>

                <div className="filter-actions">
                  <button
                    type="button"
                    className="apply-filter"
                    onClick={() => {
                      setAppliedPetFilter(petFilter);
                      setAppliedMaxPrice(maxPrice);
                      setAppliedMinRating(minRating);
                      setAppliedMinTravelers(minTravelers);
                    }}
                  >
                    Apply
                  </button>

                  <button
                    type="button"
                    className="clear-filter"
                    onClick={() => {
                      setFromDate("");
                      setToDate("");
                      setPetFilter("any");
                      setAppliedPetFilter("any");
                      setMaxPrice("");
                      setAppliedMaxPrice("");
                      setMinRating("");
                      setAppliedMinRating("");
                      setMinTravelers("");
                      setAppliedMinTravelers("");
                    }}
                  >
                    ✖
                  </button>
                </div>
              </div>
            )}
          </form>
        </header>

        <div className="d-flex flex-column p-4">
          <div className="userInfo d-flex justify-content-between gap-2 align-items-start">
            <div className="d-flex flex-column">
              <p className="fw-bold mb-0">
                Hello, {userData?.name?.split(" ").slice(0, 2).join(" ")}👋
              </p>
              <h1 className="mb-0">Trips For Sale</h1>
              <p className="small">Browse trips and buy them.</p>
            </div>
            <img
              src={userData?.image_url || photoUser}
              alt="photo user"
              role="button"
              loading="lazy"
              className="photo"
              onClick={() => setItemsNavbar("User Dashboard")}
            />
          </div>
        </div>

        <div className="trips">
          {filteredTrips.map((trip, index) => (
            <div
              className="trip"
              role="button"
              key={index}
              onClick={() => {
                sessionStorage.setItem("selectedTrip", JSON.stringify(trip));
                setSelectedRestaurant(trip);
                navigate(`/trip/${trip.id}`);
              }}
            >
              <div>
                <h2>{trip.name}</h2>
                <p>{trip.description}</p>
              </div>

              <div className="trip-info">
                <span>👥 {trip.numberOfTravelers} travelers</span>
                <span>
                  💰{" "}
                  {trip.price.toLocaleString("en-US", {
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
          ))}
        </div>
      </section>

      <TripsActive
        selectedRestaurant={selectedRestaurant}
        stars={stars}
        starTrip={starTrip}
        user={user}
        itemsNavbar={itemsNavbar}
        setSelectedRestaurant={setSelectedRestaurant}
      />
    </>
  );
}
