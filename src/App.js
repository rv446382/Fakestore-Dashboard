import React from "react";
import { Routes, Route } from "react-router-dom"; 
import { Provider } from "react-redux";
import { store } from "./redux/store";

import Layout from "./components/layout/Layout";
import ProductListing from "./pages/ProductListing";
import ProductDetail from "./pages/ProductDetail";
import Favorites from "./pages/Favorites";

function App() {
  return (
    <Provider store={store}>
      <Layout>
        <Routes>
          <Route path="/" element={<ProductListing />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/favorites" element={<Favorites />} />
        </Routes>
      </Layout>
    </Provider>
  );
}

export default App;
