const ButtonRoundedSvg = (white) => (
    <>
      <svg
        className="absolute top-0 left-0"
        width="21"
        height="44"
        viewBox="0 0 21 44"
      >
        <path
          fill={white ? "white" : "#0e7a31"}
          stroke={white ? "white" : "#0e7a31"}
          strokeWidth="2"
          d="M21,43.00005 
               L10,43.00005 
               C5,43.00005 1,38.00005 1,33.00005 
               L1,10.00005 
               C1,5.00005 5,1.00005 10,1.00005 
               L21,1.00005"
        />
      </svg>
      <svg
        className="absolute top-0 left-[1.3125rem] w-[calc(100%-2.625rem)]"
        height="44"
        viewBox="0 0 100 44"
        preserveAspectRatio="none"
        fill={white ? "white" : "#0e7a31"}
      >
        {white ? (
          <polygon
            fill="white"
            fillRule="nonzero"
            points="100 0 100 44 0 44 0 0"
          />
        ) : (
          <>
            <polygon
              fill="#0e7a31" // mentioned in ButtonGradient.jsx
              fillRule="nonzero"
              points="100 0 100 44 0 44 0 0"
            />
            <polygon
              fill="#0e7a31" // mentioned in ButtonGradient.jsx
              fillRule="nonzero"
              points="100 0 100 44 0 44 0 0"
            />
          </>
        )}
      </svg>
      <svg
        className="absolute top-0 right-0"
        width="21"
        height="44"
        viewBox="0 0 21 44"
      >
        <path
          fill={white ? "white" : "#0e7a31"}
          stroke={white ? "white" : "#0e7a31"}
          strokeWidth="2"
          d="M0,43.00005 
               L10,43.00005 
               C15,43.00005 20,38.00005 20,33.00005 
               L20,10.00005 
               C20,5.00005 15,1.00005 10,1.00005 
               L0,1.00005"
        />
      </svg>
    </>
  );
  
  export default ButtonRoundedSvg;
  