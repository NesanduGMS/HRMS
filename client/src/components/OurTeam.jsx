import React from 'react';
import human from "../assets/Teamphoto/Human.jpg"; // Import the image

const TeamMemberCard = ({ img, name, initials, title, description }) => {
  return (
    <div className="bg-[#001F3F] text-white rounded-lg p-6 text-center max-w-xs mx-auto"> {/* Set a max width and center the card */}
      <img
        src={img}
        alt={name}
        className="w-32 h-32 rounded-full mx-auto mb-4 object-cover" // Keep the image size as w-32 h-32
      />
      <h3 className="text-xl font-semibold">{name}</h3>
      <h4 className="text-lg font-semibold">{initials}</h4> {/* Keeping initials on a new line */}
      <p className="text-gray-100 mb-4">{title}</p> {/* Lighter gray for title */}
      <p className="text-sm mb-4">{description}</p>
      <div className="flex justify-center space-x-4">
        <a href="#" className="text-gray-300 hover:text-white">
          <i className="fab fa-xing"></i>
        </a>
        <a href="#" className="text-gray-300 hover:text-white">
          <i className="fab fa-instagram"></i>
        </a>
        <a href="#" className="text-gray-300 hover:text-white">
          <i className="fab fa-linkedin"></i>
        </a>
      </div>
    </div>
  );
};

const TeamSection = () => {
  const members = [
    {
      img: human,
      name: 'Indunil', // Removed trailing space
      initials: 'W.A.K.', // Added missing comma here
      title: '220240G',
      description:
        "I've established pagedone in 2022 and it was one of the best ideas I've had in my life.",
    },
    {
      img: human,
      name: 'Vishmitha',
      initials: 'W.D.L.',
      title: '220669E',
      description:
        'I’m the chief executive of sales and closed valuable deals that helped pagedone in growth.',
    },
    {
      img: human,
      name: 'Gunarathna',
      initials: 'M.N.S.',
      title: '220187A',
      description:
        'I am the co-founder of pagedone and we’ve pushed our limit so far to make it successful.',
    },
    {
      img: human,
      name: 'Deepthika',
      initials: 'K.A.E.R.',
      title: '220107G',
      description:
        'I’ve been lead designer for pagedone since the beginning of it and enjoyed every bit.',
    },
    {
      img: human,
      name: 'Wedamuhandirama',
      initials: 'W.M.P.U.',
      title: '220681H',
      description:
        'I am responsible for developing and maintaining the web structure of pagedone.',
    },
  ];

  return (
    <section className="bg-[#2B4B75] py-20">
      <div className="container mx-auto text-center mb-12">
        <h2 className="text-3xl font-semibold text-white">Meet the brains</h2>
        <p className="text-gray-300 mt-2">
          These people work on making our product the best.
        </p>
      </div>
      <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8">
        {members.map((member, index) => (
          <TeamMemberCard key={index} {...member} />
        ))}
      </div>
    </section>
  );
};

export default TeamSection;
