//Imports
import * as React from "react";
import {
  Label,
  Area,
  AreaChart,
  ReferenceLine,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from "recharts";

import Summary from "./Summary.jsx";
const yolo = [
  {
    "name": "Page A",
    "uv": 4000,
    "pv": 2400,
    "amt": 2400
  },
  {
    "name": "Page B",
    "uv": 3000,
    "pv": 1398,
    "amt": 2210
  },
  {
    "name": "Page C",
    "uv": 2000,
    "pv": 9800,
    "amt": 2290
  },
  {
    "name": "Page D",
    "uv": 2780,
    "pv": 3908,
    "amt": 2000
  },
  {
    "name": "Page E",
    "uv": 1890,
    "pv": 4800,
    "amt": 2181
  },
  {
    "name": "Page F",
    "uv": 2390,
    "pv": 3800,
    "amt": 2500
  },
  {
    "name": "Page G",
    "uv": 3490,
    "pv": 4300,
    "amt": 2100
  }
]

//Render tooltip with payload
function renderTooltip({ payload }) {
  if (!payload[0]) {
    return;
  }

  return <span>{`$${payload[0].value.toFixed(2)}`}</span>;
}

function CompoundInterestChart({ initialAmount, period, growthRate, monthlyContribution }) {
  const data = React.useMemo(
    () => {
      const result = [];
      let totalCont = 0;

      for (let i = 1; i <= period; i++) {
        let lastFutureValue = initialAmount + monthlyContribution * 12;
        totalCont = totalCont + monthlyContribution*12;
        if (result.length > 0) {
          lastFutureValue = result[result.length - 1].value + monthlyContribution * 12;
        }
        result.push({
          label: `${i}`,
          value: lastFutureValue * Math.pow(1 + growthRate / 100, 1),
          total: totalCont
        });
      }

      return result;
    },
    [initialAmount, period, growthRate, monthlyContribution]
  );

  return (
    <>
      <h2>Projected Growth</h2>
      <div style={{ width: "100%", height: 400 }}>
        <ResponsiveContainer>
          <LineChart
            width={500}
            height={300}
            data={data}
            margin={{
              top: 5,
              right: 30,
              left: 10,
              bottom: 20
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="label">
              <Label value="Years" offset={-3} position="insideBottom" />
            </XAxis>
            <YAxis />
            <Tooltip content={renderTooltip} />
            <Line type="monotone" dataKey="value" dot={{ stroke: 'red', strokeWidth: 2 }}/>
            <Line type="monotone" dataKey="total" />
          </LineChart>
        </ResponsiveContainer>
        </div>
        <hr />
        <h2>Second Data Set (Random)</h2>
        <div style={{ width: "100%", height: 400 }}>
        <ResponsiveContainer width={700} height="80%">
          <AreaChart data={yolo}
            margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
            <XAxis dataKey="name" />
            <YAxis />
            <CartesianGrid strokeDasharray="3 3" />
            <Tooltip />
            <ReferenceLine x="Page C" stroke="green" label="Min PAGE" />
            <ReferenceLine y={4000} label="Max" stroke="red" strokeDasharray="3 3" />
            <Area type="monotone" dataKey="uv" stroke="#8884d8" fill="#8884d8" />
          </AreaChart>
        </ResponsiveContainer>        

      
      </div>
      <hr />
      <Summary period={period} data={data} />
    </>
  );
}

export default CompoundInterestChart;
