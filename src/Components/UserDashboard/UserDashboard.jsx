import "./userDashboard.css";
import updateImage from "../../Requests/uploadImage";
import cards from "./cardsUsers";
import deleteAccount from "../../Requests/deleteAccount";
import logOut from "../../Requests/logout"
import { useState, useEffect } from "react";
import photoUser from "../../assets/user.png";
import Cookies from "js-cookie"
export default function User({ user, itemsNavbar, userData }) {
  const [activeFile, setActiveFile] = useState(false);
  const [photo, setPhoto] = useState(null);

  

  const handleFile = async (event) => {
    const file = event.target.files[0];

    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);
    updateImage(formData, setPhoto, setActiveFile)
  }
  const imageUrl = photo || userData?.image_url || photoUser;
  return (
    <>
      <section
        className={`userDashboard ${
          user && itemsNavbar == "User Dashboard" ? "show-home" : "hide-home"
        } flex-column align-items-center justify-content-center padding-top-2`}
      >
        <header className="d-flex flex-column  align-items-center justify-content-center ">
          {imageUrl && (
            <picture
              className="position-relative"
              onClick={() => setActiveFile((prev) => !prev)}
            >
              <img
                src={imageUrl}
                alt="photo user"
                loading="lazy"
                className="photo w-100"
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                }}
              />
            </picture>
          )}
          <h1>{userData?.name}</h1>
          <p>Welcome Back!</p>
        </header>
        <div className="cards_usersDashboards d-flex flex-wrap gap-3 mt-3 px-3 aligh-items-center justify-content-center ">
          {cards.map((cardsMap) => (
            <div key={cardsMap.id} className="d-flex  flex-column  ">
              <img
                src={cardsMap?.image}
                loading="lazy"
                alt={cardsMap.name}
                style={{ background: cardsMap.color, filter: "invert(100)" }}
              />
              <h1 className="mt-3">
                {cardsMap.json === "moneyalreadyspent" ||
                cardsMap.json === "money"
                  ? new Intl.NumberFormat("en-us", {
                      style: "currency",
                      currency: "usd",
                      notation: "compact",
                    }).format(userData?.[cardsMap.json] || 0)
                  : userData?.[cardsMap.json] || 0}
              </h1>

              <p>{cardsMap.title}</p>
            </div>
          ))}
        </div>
        <div
          className={`file-upload position-fixed ${activeFile ? "d-flex" : "d-none"}`}
        >
          <input
            type="file"
            id="fileInput"
            accept="image/jpeg,image/png,image/webp"
            onChange={handleFile}
          />

          <label htmlFor="fileInput">
            <div className="upload-content">
              <span>📁</span>
              <h2>Select a file</h2>
              <p>Click here to choose an image</p>
            </div>
          </label>
        </div>
        <div className="controlAccount">
          <button className="LogOut btn btn-outline-dark" onClick={logOut}>
            Log out
          </button>
          <button
            className="deleteAccount LogOut btn btn-outline-danger"
            onClick={deleteAccount}
          >
            Delete Account
          </button>
        </div>
      </section>
    </>
  );
}
