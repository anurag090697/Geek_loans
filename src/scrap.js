/** @format */

import { useState, useEffect } from "react";
import PieChart from "./PieChart.jsx";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

import "./App.css";

function App() {
  const [homeValue, setHomevalue] = useState(1000);
  const [downPay, setDownPay] = useState(600);
  const [loanAmnt, setLoanAmnt] = useState(0);
  const [interestR, setInterestR] = useState(5);
  const [tenure, setTenure] = useState(1);
  const [emi, setEmi] = useState(0);

  ChartJS.register(ArcElement, Tooltip, Legend);
  let principle = (loanAmnt - downPay) * interestR;
  let interest = ((principle * interestR) / 100) * (tenure * 12);
  const data = {
    labels: ["Principle", "Interest"],
    datasets: [
      {
        label: "Financial Breakdown",
        data: [principle, interest],
        backgroundColor: [
          "rgba(255, 99, 132, 0.6)",
          "rgba(54, 162, 235, 0.6)",
          "rgba(255, 206, 86, 0.6)",
          "rgba(75, 192, 192, 0.6)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className='container '>
      <nav className='bg-green-400 pl-20 py-3 font-medium text-2xl'>
        <h2>Bank of React</h2>
      </nav>
      <div className='flex justify-around items-center'>
        <div className='w-1/2'>
          <div className='py-3 px-6'>
            <h4 className='font-medium text-gray-500'>Home Value</h4>
            <h2 className='text-2xl font-medium '>$ {homeValue}</h2>
            <input
              className='w-full h-2 bg-gray-700 rounded-md appearance-none cursor-pointer '
              type='range'
              min='1000'
              max='10000'
              value={homeValue}
              onChange={(e) => setHomevalue(e.currentTarget.value)}
            />
            <div className='flex w-full justify-between'>
              <h4 className='font-medium text-gray-500'>$ 1000</h4>
              <h4 className='font-medium text-gray-500'>$ 4000</h4>
              <h4 className='font-medium text-gray-500 ml-4'>$ 7000</h4>
              <h4 className='font-medium text-gray-500'>$ 10000</h4>
            </div>
          </div>

          <div className='py-3 px-6'>
            <h4 className='font-medium text-gray-500'>Down Payment</h4>
            <h2 className='text-2xl font-medium '>$ {downPay}</h2>
            <input
              className='w-full h-2 bg-gray-700 rounded-md appearance-none cursor-pointer '
              type='range'
              min='0'
              max='3000'
              value={downPay}
              onChange={(e) => setDownPay(e.currentTarget.value)}
            />
            <div className='flex w-full justify-between'>
              <h4 className='font-medium text-gray-500'>$ 0</h4>
              <h4 className='font-medium text-gray-500 ml-5'>$ 1000</h4>
              <h4 className='font-medium text-gray-500 ml-5'>$ 2000</h4>
              <h4 className='font-medium text-gray-500'>$ 3000</h4>
            </div>
          </div>

          <div className='py-3 px-6'>
            <h4 className='font-medium text-gray-500'>Loan Amount</h4>
            <h2 className='text-2xl font-medium '>$ {loanAmnt}</h2>
            <input
              className='w-full h-2 bg-gray-700 rounded-md appearance-none cursor-pointer '
              type='range'
              min='0'
              max={homeValue}
              value={loanAmnt}
              onChange={(e) => setLoanAmnt(e.currentTarget.value)}
            />
            <div className='flex w-full justify-between'>
              <h4 className='font-medium text-gray-500'>$ 0</h4>
              <h4 className='font-medium text-gray-500 ml-5'>
                $ {parseInt(homeValue / 2.97)}
              </h4>
              <h4 className='font-medium text-gray-500 ml-5'>
                $ {parseInt(homeValue / 1.49)}
              </h4>
              <h4 className='font-medium text-gray-500'>$ {homeValue}</h4>
            </div>
          </div>
          <div className='py-3 px-6'>
            <h4 className='font-medium text-gray-500'>Interest Rate</h4>
            <h2 className='text-2xl font-medium '>% {interestR}</h2>
            <input
              className='w-full h-2 bg-gray-700 rounded-md appearance-none cursor-pointer '
              type='range'
              min='2'
              max='18'
              value={interestR}
              onChange={(e) => setInterestR(e.currentTarget.value)}
            />
            <div className='flex w-full justify-between'>
              <h4 className='font-medium text-gray-500'>% 2</h4>
              <h4 className='font-medium text-gray-500 mr-6'>% 7</h4>
              <h4 className='font-medium text-gray-500 ml-6'>% 13</h4>
              <h4 className='font-medium text-gray-500'>% 18</h4>
            </div>
          </div>
          <div className='px-3 py-6 relative'>
            <label htmlFor='tenure' className='bg-white absolute top-3 left-10'>
              Tenure
            </label>
            <select
              onChange={(e) => setTenure(e.currentTarget.value)}
              name='tenure'
              id='tenure'
              value={tenure}
              className='w-full py-4 px-6 border-2 hover:border-gray-500 focus:border-blue-500 rounded-lg font-medium'
            >
              {" "}
              <option value='0' selected disabled>
                Select Tenure
              </option>
              <option value='5'>5 years</option>
              <option value='10'>10 years</option>
              <option value='15'>15 years</option>
              <option value='20'>20 years</option>
              <option value='25'>25 years</option>
            </select>
          </div>
        </div>

        <div>
          <div className='w-80 my-6'>
            <div className='text-center text-2xl font-medium'>
              <h1>Monthly Payment : $ {emi}</h1>
            </div>
            <Pie data={data} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
