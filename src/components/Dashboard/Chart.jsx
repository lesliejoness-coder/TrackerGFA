// components/Chart.jsx
import React from "react";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";

const data = [
  { name: "Réseau", value: 40 },
  { name: "Électricité", value: 25 },
  { name: "Logiciel", value: 20 },
  { name: "Matériel", value: 15 },
];

const COLORS = ["#1e3a8a", "#3b82f6", "#93c5fd", "#bfdbfe"];

const Chart = () => {
  return (
    <div className="w-full">
      <h3 className="font-semibold text-gray-900 mb-4">Types de problèmes</h3>
      <ResponsiveContainer width="100%" height={220}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={55}
            outerRadius={80}
            paddingAngle={3}
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip formatter={(value) => [`${value}%`, ""]} />
          <Legend
            iconType="circle"
            iconSize={8}
            formatter={(value) => (
              <span style={{ fontSize: 12, color: "#6b7280" }}>{value}</span>
            )}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Chart;
