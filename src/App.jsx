import { useState } from 'react'

export default function App() {
  const [income, setIncome] = useState('')

  // 2024 US Federal Tax Brackets (Single filer)
  const brackets = [
    { rate: 0.10, cap: 11600 },
    { rate: 0.12, cap: 47150 },
    { rate: 0.22, cap: 100525 },
    { rate: 0.24, cap: 191950 },
    { rate: 0.32, cap: 243725 },
    { rate: 0.35, cap: 609350 },
    { rate: 0.37, cap: Infinity },
  ]

  const calculateFederalTaxes = (income) => {
    let tax = 0
    let lastCap = 0

    for (const bracket of brackets) {
      if (income > bracket.cap) {
        tax += (bracket.cap - lastCap) * bracket.rate
        lastCap = bracket.cap
      } else {
        tax += (income - lastCap) * bracket.rate
        break
      }
    }
    return tax
  }

  const annualIncome = parseFloat(income) || 0
  const federalTaxes = calculateFederalTaxes(annualIncome)
  const funNumber = federalTaxes * 0.00411817

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-6">
      <h1 className="text-3xl font-bold mb-6">Income Playground</h1>

      {/* Income Input */}
      <div className="bg-white p-6 rounded-2xl shadow-md w-full max-w-md">
        <label className="block text-lg font-medium mb-2">Enter your annual income:</label>
        <input
          type="number"
          className="w-full border rounded-lg px-4 py-2"
          value={income}
          onChange={(e) => setIncome(e.target.value)}
          placeholder="e.g. 60000"
        />
      </div>

      {/* Tax Output */}
      <div className="bg-white p-6 rounded-2xl shadow-md w-full max-w-md mt-6">
        <h2 className="text-xl font-semibold mb-2">Estimated Federal Taxes</h2>
        <p className="text-lg">${federalTaxes.toLocaleString()}</p>
      </div>

      {/* Fun Fact */}
      <div className="bg-green-100 p-6 rounded-2xl shadow-md w-full max-w-md mt-6">
        <h2 className="text-xl font-semibold mb-2">Congratulations!</h2>
        <p className="text-lg">
          You spent <span className="font-bold">${funNumber.toLocaleString()}</span> on aiding Israel's genocideal government!
        </p>
      </div>
    </div>
  )
}