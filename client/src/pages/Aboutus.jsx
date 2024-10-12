import React from "react";
import AboutHeading from "../components/AboutHeading";
import VisionMission from "../components/Vision&Mission";
import OurTeam from "../components/OurTeam";

const Aboutus = () => {
    return (
      <div className="w-full -mt-[7.25rem]">
        < AboutHeading />
        < VisionMission />
        < OurTeam />
      </div>
    );
  };
  
  export default Aboutus;