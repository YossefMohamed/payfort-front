import React from "react";
import { useLocation } from "react-router-dom";

const PaymentResponse: React.FC = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);

  return (
    <div>
      <h1>Payment Response</h1>
      <p>Status: {params.get("status")}</p>
    </div>
  );
};

export default PaymentResponse;
