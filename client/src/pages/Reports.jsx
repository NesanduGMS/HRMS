import React from "react";
import ReportHeading from "../components/ReportHeading";
import Report1 from "../components/Report1";
import Report2 from "../components/Report2";
import Report3 from "../components/Report3";
import Report4 from "../components/Report4";
import Report5 from "../components/Report5";

const Report = () => {
  return (
    <div className="w-full -mt-[7.25rem]">
      <ReportHeading />
      <div className="flex justify-center space-x-4 mt-4"> {/* Added flex container */}
        <Report1 />
        <Report2 />
        <Report3 />
      </div>
      <div className="flex justify-center space-x-4 mt-4"> {/* Added flex container */}
        <Report4 />
        <Report5 />
      </div>
    </div>
  );
};

export default Report;
