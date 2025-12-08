import React, { useState, useEffect } from "react";
import "./App.css";
import "./index.css";

import RestaurantPage from "./components/RestaurantPage";
import HomePage from "./components/HomePage";
import NavBar from "./components/NavBar";
import HeroPage from "./components/HeroPage";
import Formulario from "./components/formularios/formularios";
import Footer from "./components/Footer";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { getUserSession } from "./utils/localStorage.utils";
import { CartContext } from "./contexts/CartContext";
import { OrderContext } from "./contexts/OrderContext";
import DashBoard from "./components/DashBoard/dashBoard";
import ConfirmationPage from "./components/ConfirmationPage";
import { UserContext } from "./contexts/UserContext";
import LandbotChat from "./components/LandbotChat";
import { RestaurantContext } from "./contexts/RestaurantContext";
import FAQPage from "./components/FAQPage";
import AboutUsPage from "./components/AboutUsPage";

import "leaflet/dist/leaflet.css";

function App() {
  const [shoppingList, setShoppingList] = useState([]);
  const [order, setOrder] = useState([]);
  const [location, setLocation] = useState("");
  const [restaurants, setrestaurants] = useState("");
  const [user, setLocalUser] = useState(null);
  const [logged, setLogged] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  // Coordenadas de la dirección elegida (HeroPage)
  const [coords, setCoords] = useState(null);

  useEffect(() => {
    const session = getUserSession();
    if (session && session.token) {
      setLocalUser(session.user);
      setLogged(true);
    }
  }, []);

  return (
    <RestaurantContext.Provider value={{ restaurants, setrestaurants }}>
      <UserContext.Provider value={{ user, setLocalUser }}>
        <OrderContext.Provider value={{ order, setOrder }}>
          <CartContext.Provider value={{ shoppingList, setShoppingList }}>
            <BrowserRouter>
              <NavBar
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                location={location}
                logged={logged}
                setLogged={setLogged}
              />

              <Routes>
                <Route
                  path="/"
                  element={
                    <HeroPage
                      setLocation={setLocation}
                      setCoordinates={setCoords}
                    />
                  }
                />

                <Route
                  path="/restaurants"
                  element={
                    <HomePage
                      searchTerm={searchTerm}
                      location={location}
                      coords={coords}
                    />
                  }
                />

                <Route
                  path="/restaurant/:restaurantId"
                  element={<RestaurantPage />}
                />

                <Route
                  path="/confirmation/:orderId"
                  element={<ConfirmationPage />}
                />

                <Route path="/formularios" element={<Formulario />} />
                <Route path="/dashboard" element={<DashBoard />} />
                <Route path="/faq" element={<FAQPage />} />
                <Route path="/about" element={<AboutUsPage />} />
              </Routes>

              <LandbotChat />
              <Footer logged={logged} setLogged={setLogged} />
            </BrowserRouter>
          </CartContext.Provider>
        </OrderContext.Provider>
      </UserContext.Provider>
    </RestaurantContext.Provider>
  );
}

export default App;
