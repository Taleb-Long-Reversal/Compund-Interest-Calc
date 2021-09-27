import * as React from "react";
import ReactDOM from "react-dom";

import VariablesForm from "./VariablesForm";
import CompoundInterestChart from "./CompoundInterestChart";

import defaultState from "./defaultState";
import "./styles.css";

function App() {
  const [state, setState] = React.useState(defaultState);

  return (
    <div id="annualCompoundCalculator">
      <h1 className="text-center">Annual Compound Interest Calculator</h1>
      <hr />
      <VariablesForm onUpdate={variables => setState(variables)} />
      <hr />
      <CompoundInterestChart {...state} />
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
