import React from 'react';
import { useParams } from 'react-router-dom';
// import Footer from "../../components/footer/footer";
// import Navbar from "../../components/navbar/navbar";
// import Footer from "../../components/Footer";

const Error = () => {
  const { errorCode } = useParams();
  return (
    <div>
      {/* <Navbar /> */}
      <div className="errorContainer">
        <p>Something went wrong!</p>
        {errorCode && <p>{`Error code: ${errorCode}`}</p>}
      </div>
      {/* <Footer /> */}
    </div>
  );
};

export default Error;