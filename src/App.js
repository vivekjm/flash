import React from "react";
import Routes from "./routes/";

//styles import
import "./assets/scss/themes.scss";

//Backend helpers
import FakeBackend from "./helpers/fake-backend";

//Firebase helpers

FakeBackend();

function App() {
  return <Routes />;
}

export default App;
