import React from "react";
import { useParams } from "react-router-dom";

const TransactionPage = () => {
  const params = useParams();
  console.log(params);
  console.log(params);
  console.log(params);
  console.log(params);

  return <h1>in the transaction Success :)</h1>;
};

export default TransactionPage;
