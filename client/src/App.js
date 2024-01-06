import React from "react";
import LayoutHOC from "./components/Layout";
import ContentComponent from "./components/ContentComponent";
import { Router, Route } from 'react-router-dom';

function App() {
  return (
    <>

      <ContentComponent />
    </>
  );
}

export default LayoutHOC(App);
