import { useEffect, useState } from "react";
import { BrowserRouter } from "react-router-dom";
import LoadingPage from "./components/Loading/LoadingPage";
import AiChatbot from "./components/ui/AiChatbot";
import AppRoutes from "./routes/AppRoutes";

function App() {
  const [isBooting, setIsBooting] = useState(true);

  useEffect(() => {
    const bootTimer = window.setTimeout(() => {
      setIsBooting(false);
    }, 2000);

    return () => window.clearTimeout(bootTimer);
  }, []);

  if (isBooting) {
    return <LoadingPage />;
  }

  return (
    <BrowserRouter>
      <AppRoutes />
      <AiChatbot />
    </BrowserRouter>
  );
}

export default App;
