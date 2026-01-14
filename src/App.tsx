import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import focusReducer from "./store/focusSlice";
import Dashboard from "./pages/Dashboard";
function App() {
  const store = configureStore({
    reducer: {
      focus: focusReducer,
    },
  });

  return (
    <Provider store={store}>
      <div className="antialiased selection:bg-indigo-100">
        <Dashboard />
      </div>
    </Provider>
  );
}

export default App;
