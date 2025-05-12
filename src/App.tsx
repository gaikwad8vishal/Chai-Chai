import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./authentication";
import Layout from "./components/layouts";


function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Layout/>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;