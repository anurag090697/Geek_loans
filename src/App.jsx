/** @format */

import { useState, useEffect } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import "./App.css";

ChartJS.register(ArcElement, Tooltip, Legend);

function App() {
  const [homeValue, setHomeValue] = useState(1000);
  const [downPay, setDownPay] = useState(250);
  const [loanAmnt, setLoanAmnt] = useState(750);
  const [interestR, setInterestR] = useState(5);
  const [tenure, setTenure] = useState(5);
  const [emi, setEmi] = useState(0);

  useEffect(() => {
    setDownPay(Math.ceil(homeValue / 4));
    setLoanAmnt(homeValue - Math.ceil(homeValue / 4));
  }, [homeValue]);

  const handleLoanAmntChange = (value) => {
    setLoanAmnt(value);
    setDownPay(homeValue - value);
  };

  const handleDownPayChange = (value) => {
    setDownPay(value);
    setLoanAmnt(homeValue - value);
  };

  useEffect(() => {
    const monthlyRate = interestR / 100 / 12;
    const numberOfPayments = tenure * 12;
    const emiCalc =
      loanAmnt *
      monthlyRate *
      (Math.pow(1 + monthlyRate, numberOfPayments) /
        (Math.pow(1 + monthlyRate, numberOfPayments) - 1));
    setEmi(emiCalc.toFixed(2));
  }, [loanAmnt, interestR, tenure]);

  const data = {
    labels: ["Principal", "Interest"],
    datasets: [
      {
        label: "Financial Breakdown",
        data:
          loanAmnt > 0
            ? [loanAmnt, emi * tenure * 12 - loanAmnt]
            : [homeValue, 0],
        backgroundColor: ["rgba(255, 99, 132, 0.6)", "rgba(54, 162, 235, 0.6)"],
        borderColor: ["rgba(255, 99, 132, 1)", "rgba(54, 162, 235, 1)"],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className='container'>
      <nav className='bg-green-400 pl-20 py-3 font-medium text-2xl'>
        <h2>Bank of React</h2>
      </nav>
      <div className='flex justify-around items-center'>
        <div className='w-1/2'>
          <div className='py-3 px-6'>
            <h4 className='font-medium text-gray-500'>Home Value</h4>
            <h2 className='text-2xl font-medium '>$ {homeValue}</h2>
            <input
              className='w-full h-2 bg-gray-700 rounded-md appearance-none cursor-pointer'
              type='range'
              min='1000'
              max='10000'
              value={homeValue}
              onChange={(e) => setHomeValue(Number(e.currentTarget.value))}
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
              className='w-full h-2 bg-gray-700 rounded-md appearance-none cursor-pointer'
              type='range'
              min='0'
              max={homeValue}
              value={downPay}
              onChange={(e) =>
                handleDownPayChange(Number(e.currentTarget.value))
              }
            />
            <div className='flex w-full justify-between'>
              <h4 className='font-medium text-gray-500'>$ 0</h4>
              <h4 className='font-medium text-gray-500 ml-5'>
                $ {Math.ceil(homeValue / 3)}
              </h4>
              <h4 className='font-medium text-gray-500 ml-5'>
                $ {Math.ceil((2 * homeValue) / 3)}
              </h4>
              <h4 className='font-medium text-gray-500'>$ {homeValue}</h4>
            </div>
          </div>

          <div className='py-3 px-6'>
            <h4 className='font-medium text-gray-500'>Loan Amount</h4>
            <h2 className='text-2xl font-medium '>$ {loanAmnt}</h2>
            <input
              className='w-full h-2 bg-gray-700 rounded-md appearance-none cursor-pointer'
              type='range'
              min='0'
              max={homeValue}
              value={loanAmnt}
              onChange={(e) =>
                handleLoanAmntChange(Number(e.currentTarget.value))
              }
            />
            <div className='flex w-full justify-between'>
              <h4 className='font-medium text-gray-500'>$ 0</h4>
              <h4 className='font-medium text-gray-500 ml-5'>
                $ {parseInt((homeValue - downPay) / 2.97)}
              </h4>
              <h4 className='font-medium text-gray-500 ml-5'>
                $ {parseInt((homeValue - downPay) / 1.49)}
              </h4>
              <h4 className='font-medium text-gray-500'>
                $ {homeValue - downPay}
              </h4>
            </div>
          </div>
          <div className='py-3 px-6'>
            <h4 className='font-medium text-gray-500'>Interest Rate</h4>
            <h2 className='text-2xl font-medium '> {interestR}%</h2>
            <input
              className='w-full h-2 bg-gray-700 rounded-md appearance-none cursor-pointer'
              type='range'
              min='2'
              max='18'
              value={interestR}
              onChange={(e) => setInterestR(Number(e.currentTarget.value))}
            />
            <div className='flex w-full justify-between'>
              <h4 className='font-medium text-gray-500'>2%</h4>
              <h4 className='font-medium text-gray-500 ml-4'>7%</h4>
              <h4 className='font-medium text-gray-500 ml-12'>13%</h4>
              <h4 className='font-medium text-gray-500'>18%</h4>
            </div>
          </div>
          <div className='px-3 py-6 relative'>
            <label htmlFor='tenure' className='bg-white absolute top-3 left-10'>
              Tenure
            </label>
            <select
              onChange={(e) => setTenure(Number(e.currentTarget.value))}
              name='tenure'
              id='tenure'
              value={tenure}
              className='w-full py-4 px-6 border-2 hover:border-gray-500 focus:border-blue-500 rounded-lg font-medium'
            >
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
