import "./App.css";
import { useRoutes } from "react-router-dom";
import routes from "./routes";
import { Toaster } from "./components/ui/toaster";
function App() {
  const content = useRoutes(routes);
  return (
    <>
      {content} <Toaster />
    </>
  );
}

export default App;
