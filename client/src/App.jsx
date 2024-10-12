import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import AboutUs from "./pages/Aboutus";
import Contact from "./pages/Contact";
//import Services from "./pages/Services";
import Reports from "./pages/Reports";
import Leaveform from "./pages/Leaveform";

const App = () => {
  return (
    <div>
      <Header />
      <div className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/aboutus" element={<AboutUs />} />
            <Route path="/contact" element={<Contact />} />
            {/* <Route path="/services" element={<Services />} /> */}
            <Route path="/leaveform" element={<Leaveform />}/>
            <Route path="/report" element={<Reports />}>
            
            
              {/* <Route
                path="/booknow/customer_details"
                element={<BookingForm1 />}
              />
              <Route
                path="/booknow/billing_details"
                element={<BookingForm2 />}
              />
              <Route path="/booknow/event_details" element={<BookingForm3 />} /> */}
            </Route>
          </Routes>
        </div>
    </div>
  );
}

export default App;
