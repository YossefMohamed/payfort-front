import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import PaymentResponse from "./components/PaymentResponse";
import PaymentForm from "./elements/PaymentForm";
import TransactionPage from "./elements/transaction";

const App: React.FC = () => (
  <Router>
    <Switch>
      <Route path="/" exact component={PaymentForm} />
      <Route path="/payment-response" component={PaymentResponse} />
      <Route path="/transaction/:id" component={TransactionPage} />
    </Switch>
  </Router>
);

export default App;
