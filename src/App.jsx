// App.jsx
import { useState } from 'react'
import CountUp from 'react-countup'

export default function App() {
  const [income, setIncome] = useState(60000)

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

  // Add this near the top of App.jsx
  const weaponCosts = [
  { name: '5.56x45mm NATO Rifle Cartridges', manufacturer: 'Winchester Ammunition', cost: 1.20 },
  { name: 'F-15IA Multi-Role Fighter Aircraft', manufacturer: 'Boeing Corporation', cost: 208_000_000 },
  { name: 'AIM-120C-8 Advanced Medium Range Air-to-Air Missile (AMRAAM)', manufacturer: 'RTX Corporation', cost: 3_416_666 },
  { name: '120mm Tank Cartridges', manufacturer: 'General Dynamics     ', cost: 23_644 },
  { name: 'M933A1 120mm High Explosive Mortar Cartridges', manufacturer: 'General Dynamics', cost: 1_222 },
  { name: 'AGM-114 Hellfire Missile', manufacturer: 'Lockheed Martin', cost: 150_000 },
]

const aidOrganizations = [
  { name: 'UNICEF ', website: 'https://help.unicef.org/ob/donate-to-children' },
  { name: 'Palestine Children\'s Relief Fund', website: 'https://www.pcrf.net/' },
  { name: 'Direct to Families in Gaza Option 1', website: 'https://gazafunds.com/' },
  { name: 'Direct to Families in Gaza Option 2', website: 'https://lifeline4gaza.com/' },
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

  const reactionText =
    annualIncome > 500000
      ? '💸 Big spender alert!'
      : annualIncome > 150000
      ? '📈 Nice income!'
      : '💪 Keep grinding!'

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-gradient-to-br from-purple-400 via-pink-300 to-yellow-200">
      <h1 className="text-4xl md:text-5xl font-extrabold mb-8 text-white drop-shadow-lg text-center">
        Income Tax Genocide Calculator
      </h1>

      {/* Income Input Card */}
      <div className="bg-white/60 backdrop-blur-md p-6 rounded-2xl shadow-lg w-full max-w-md hover:shadow-2xl transition-shadow duration-300">
        <label className="block text-lg font-semibold mb-2">Enter your annual income in 2024:</label>
        <input
          type="number"
          className="w-full border border-gray-300 rounded-lg px-4 py-2 mb-4"
          value={income}
          onChange={(e) => setIncome(e.target.value)}
          min={0}
        />
        <input
          type="range"
          min={0}
          max={1000000}
          step={1000}
          value={income}
          onChange={(e) => setIncome(e.target.value)}
          className="w-full accent-purple-500"
        />
        <p className="mt-2 text-gray-700 font-medium">Income: ${annualIncome.toLocaleString()}</p>
      </div>

      {/* Tax Output Card */}
      <div className="bg-white/60 backdrop-blur-md p-6 rounded-2xl shadow-lg w-full max-w-md mt-6 hover:shadow-2xl transition-shadow duration-300">
        <h2 className="text-2xl font-semibold mb-2">Estimated Federal Taxes</h2>
        <p className="text-xl font-bold text-purple-700">
          <CountUp end={federalTaxes} duration={1.5} separator="," prefix="$" />
        </p>
      </div>

      {/* Fun Fact Card */}
      <div className="bg-green-100/70 backdrop-blur-md p-6 rounded-2xl shadow-lg w-full max-w-md mt-6 hover:shadow-2xl transition-shadow duration-300">
        <h2 className="text-2xl font-semibold mb-2">Congratulations!</h2>
        <p className="text-lg">
          You spent{' '}
          <span className="font-bold text-green-800">
            <CountUp end={funNumber} duration={1.5} separator="," prefix="$" />
          </span>{' '}
          in 2024 on aiding Israel's genocidal government!
        </p>
        <p className="mt-2 text-xl">{reactionText}</p>
      </div>

    {/* Weapon Cost Card */}
    <div className="bg-white/60 backdrop-blur-md p-6 rounded-2xl shadow-lg w-full max-w-md mt-6 hover:shadow-2xl transition-shadow duration-300">
      <h2 className="text-2xl font-semibold mb-4">Your Contribution May Have Bought...</h2>
      <ul className="list-disc list-inside space-y-1 text-gray-800">
        {weaponCosts.map((weapon) => {
          const units = funNumber / weapon.cost
          return (
            <li key={weapon.name}>
              {units.toFixed(7)} {weapon.name.padEnd(10, '\u00A0')} | <span className="italic">{weapon.manufacturer}</span>
            </li>
          )
        })}
      </ul>
    </div>

    {/* Aid Organizations Card */}
    <div className="bg-white/60 backdrop-blur-md p-6 rounded-2xl shadow-lg w-full max-w-md mt-6 hover:shadow-2xl transition-shadow duration-300">
      <h2 className="text-2xl font-semibold mb-4">How You Can Help...</h2>
      <p className="text-lg">
          Consider donating at least as much as you gave to the IDF
      </p>
      <ul className="list-disc list-inside space-y-1 text-gray-800">
        {aidOrganizations.map((org) => {
          return (
            <li key={org.name}>
              {org.name} | <a 
                href={org.website} 
                target="_blank" 
                rel="noopener noreferrer"
                className="italic text-blue-600 hover:text-blue-800 underline"
              >
                {org.website}
              </a>
            </li>
          )
        })}
      </ul>
    </div>

    </div>

  )
}