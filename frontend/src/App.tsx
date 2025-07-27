import Routes from "./routes/Routes.tsx";
import { ToastProvider } from "./contexts/ToastContext.tsx";

function App() {
  return (
    <ToastProvider>
      <Routes />
    </ToastProvider>
  );
}

export default App;
