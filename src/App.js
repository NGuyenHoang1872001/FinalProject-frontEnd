import logo from "./logo.svg";
import * as React from "react";
import "./App.css";
import AppRouter from "./appRouter/Router";

function App() {
  return (
    <html data-theme="wireframe">
      <div>
        <AppRouter></AppRouter>
      </div>
    </html>
  );
}

export default App;
