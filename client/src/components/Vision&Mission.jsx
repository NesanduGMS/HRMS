import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faBullseye } from '@fortawesome/free-solid-svg-icons'; // Importing the new icons

const VisionMission = () => {
  return (
    <div className="bg-white py-16 px-4 mx-5">
      <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-15">
        {/* Vision */}
        <div className="bg-[#2B4B75] p-8 rounded-lg flex flex-col items-center"> {/* Dark navy blue for the Vision block */}
          <div className="flex items-center mb-4"> {/* Flex container for icon and title */}
            <div className="bg-[#001F3F] text-white p-4 rounded-full flex justify-center items-center"> {/* Darker circle for the icon */}
              <FontAwesomeIcon icon={faEye} className="h-6 w-6" />
            </div>
            <h3 className="text-lg leading-6 font-medium text-white ml-2">Our Vision</h3> {/* Keep title color white */}
          </div>
          <p className="mt-2 text-gray-300 text-center"> {/* Adjusted text color for contrast */}
            To be a leading provider of innovative solutions that improve everyday lives and empower businesses to thrive globally.
          </p>
        </div>

        {/* Mission */}
        <div className="bg-[#001F3F] p-8 rounded-lg flex flex-col items-center"> {/* Dark navy blue for the Mission block */}
          <div className="flex items-center mb-4"> {/* Flex container for icon and title */}
            <div className="bg-white text-blue-800 p-4 rounded-full flex justify-center items-center"> {/* White circle for the icon */}
              <FontAwesomeIcon icon={faBullseye} className="h-6 w-6" />
            </div>
            <h3 className="text-lg leading-6 font-medium text-white ml-2">Our Mission</h3> {/* Keep title color white */}
          </div>
          <p className="mt-2 text-gray-300 text-center"> {/* Adjusted text color for contrast */}
            Our mission is to deliver high-quality products and services, fostering growth, and building lasting relationships through excellence, innovation, and a customer-first approach.
          </p>
        </div>
      </div>
    </div>
  );
};

export default VisionMission;
