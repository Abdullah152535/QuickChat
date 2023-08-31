
import { BrowserRouter as  Router, Route , Routes   } from "react-router-dom";
import Home from "./Screens/Home";
import Chat from "./Screens/Chat";

function App() {
  return (
    <div className="  ">

    <Router>
            <Routes>

            <Route path="/" element={<Home />} />
            <Route path="/Chat" element={<Chat />} />

            </Routes>
            
    </Router>

    </div>
  );
}

export default App;
