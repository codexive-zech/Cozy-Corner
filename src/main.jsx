import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "react-toastify/dist/ReactToastify.css";
import "./index.css";
import { store } from "./app/store.js";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
ReactDOM.createRoot(document.getElementById("root")).render(
  <>
    <Provider store={store}>
      <App />
      <ToastContainer position="top-right" className=" capitalize" />
    </Provider>
  </>
);
