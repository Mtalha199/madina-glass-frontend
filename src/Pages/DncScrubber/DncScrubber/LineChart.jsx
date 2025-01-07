
import { useState } from "react";
import { Line, LineChart as RechartsLineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

const data = [
  { date: "11/10", tmobile: 10, robbo: 5 ,verizon:40 },
  { date: "11/10", tmobile: 40, robbo: 20 ,verizon:20 },
  { date: "11/10", tmobile: 35, robbo: 25  ,verizon:25},
  { date: "11/10", tmobile: 20, robbo: 15 ,verizon:10},
  { date: "11/10", tmobile: 15, robbo: 30 ,verizon:60},
  { date: "11/10", tmobile: 40, robbo: 35 ,verizon:60},
  { date: "11/10", tmobile: 55, robbo: 45 ,verizon:30},
]
const carriers = [
    { name: "tmobile", color: "rgb(34, 197, 94)" },
    { name: "robbo", color: "rgb(239, 68, 68)" },
    { name: "verizon", color: "rgb(204, 204, 1)" },
  ];
export function LineChart() {
    const [selectedCarriers, setSelectedCarriers] = useState(carriers.map((c) => c.name)); // Initially, all carriers are selected

    const toggleCarrier = (carrierName) => {
      setSelectedCarriers((prev) =>
        prev.includes(carrierName)
          ? prev.filter((name) => name !== carrierName) // Remove carrier if already selected
          : [...prev, carrierName] // Add carrier if not selected
      );
    };
  return (
    <>
    <ResponsiveContainer width="100%" height="100%">
      <RechartsLineChart data={data}>
        <XAxis
          dataKey="date"
          stroke="#888888"
          fontSize={12}
          tickLine={true}
          axisLine={true}
        />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={true}
          axisLine={true}
          tickFormatter={(value) => `${value}`}
        />
        <Tooltip />
        {carriers
              .filter((carrier) => selectedCarriers.includes(carrier.name))
              .map((carrier) => (
                <Line
                  key={carrier.name}
                  type="monotone"
                  dataKey={carrier.name}
                  stroke={carrier.color}
                  strokeWidth={1}
                  dot={true}
                />
              ))}
      </RechartsLineChart>
    </ResponsiveContainer>
          <div className="flex justify-between mt-4">
          <div className="flex gap-2">
            {carriers.map((carrier) => (
              <div
                key={carrier.name}
                onClick={() => toggleCarrier(carrier.name)}
                className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold cursor-pointer transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 ${
                  selectedCarriers.includes(carrier.name)
                    ? "border-primary"
                    : "opacity-80"
                }`}
              >
                <span
                  className="mr-1 h-1.5 w-1.5 rounded-full"
                  style={{ backgroundColor: carrier.color }}
                />
                {carrier.name}
              </div>
            ))}
          </div>
        </div>
      </>
  )
}

