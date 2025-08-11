import { Outlet } from "react-router";
import { Toaster } from "sonner";
import "./App.scss";
function App() {
  return (
    <main className="app">
      <Outlet />
      <Toaster />
    </main>
  );
}

export default App;
