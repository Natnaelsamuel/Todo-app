// "use client";

// import {
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   Legend,
//   ResponsiveContainer,
//   PieChart,
//   Pie,
//   Cell,
//   PieLabelRenderProps
// } from "recharts";

// const COLORS = ["#0088FE", "#00C49F", "#FFBB28"];

// interface BarData {
//   name: string;
//   completed: number;
//   in_progress: number;
//   pending: number;
// }

// interface PieData {
//   name: string;
//   value: number;
// }

// interface TodoChartProps {
//   barData: BarData[];
//   pieData: PieData[];
// }

// const renderCustomizedLabel = ({
//   cx,
//   cy,
//   midAngle,
//   innerRadius,
//   outerRadius,
//   percent,
//   name
// }: PieLabelRenderProps) => {
//   if (!percent) return null;

//   const radius = Number(innerRadius) + (Number(outerRadius) - Number(innerRadius)) * 0.5;
//   const x = Number(cx) + radius * Math.cos(-midAngle * Math.PI / 180);
//   const y = Number(cy) + radius * Math.sin(-midAngle * Math.PI / 180);

//   return (
//     <text
//       x={x}
//       y={y}
//       fill="white"
//       textAnchor="middle"
//       dominantBaseline="central"
//     >
//       {`${name}: ${(percent * 100).toFixed(0)}%`}
//     </text>
//   );
// };

// export function TodoChart({ barData, pieData }: TodoChartProps) {
//   return (
//     <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
//       {/* Bar Chart */}
//       <div className="h-[400px]">
//         <ResponsiveContainer width="100%" height="100%">
//           <BarChart
//             data={barData}
//             margin={{
//               top: 5,
//               right: 30,
//               left: 20,
//               bottom: 5,
//             }}
//           >
//             <CartesianGrid strokeDasharray="3 3" />
//             <XAxis dataKey="name" />
//             <YAxis />
//             <Tooltip />
//             <Legend />
//             <Bar dataKey="completed" fill="#8884d8" name="Completed" />
//             <Bar dataKey="in_progress" fill="#82ca9d" name="In Progress" />
//             <Bar dataKey="pending" fill="#ffc658" name="Pending" />
//           </BarChart>
//         </ResponsiveContainer>
//       </div>

//       {/* Pie Chart */}
//       <div className="h-[400px]">
//         <ResponsiveContainer width="100%" height="100%">
//           <PieChart>
//             <Pie
//               data={pieData}
//               cx="50%"
//               cy="50%"
//               labelLine={false}
//               label={renderCustomizedLabel}
//               outerRadius={120}
//               fill="#8884d8"
//               dataKey="value"
//             >
//               {pieData.map((entry, index) => (
//                 <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
//               ))}
//             </Pie>
//             <Tooltip 
//               formatter={(value: number, name: string) => [
//                 value, 
//                 `${name}: ${((value / pieData.reduce((a, b) => a + b.value, 0)) * 100).toFixed(1)}%`
//               ]}
//             />
//             <Legend />
//           </PieChart>
//         </ResponsiveContainer>
//       </div>
//     </div>
//   );
// }

'use client';

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  PieLabelRenderProps
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const COLORS = ["#10B981", "#3B82F6", "#F59E0B"]; // Green, Blue, Orange

interface BarData {
  name: string;
  completed: number;
  in_progress: number;
  pending: number;
}

interface PieData {
  name: string;
  value: number;
}

interface TodoChartProps {
  barData: BarData[];
  pieData: PieData[];
}

const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  name
}: PieLabelRenderProps) => {
  if (!percent) return null;

  const radius = Number(innerRadius) + (Number(outerRadius) - Number(innerRadius)) * 0.5;
  const x = Number(cx) + radius * Math.cos(-midAngle * Math.PI / 180);
  const y = Number(cy) + radius * Math.sin(-midAngle * Math.PI / 180);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor="middle"
      dominantBaseline="central"
      className="text-xs font-medium"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

export function TodoChart({ barData, pieData }: TodoChartProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Bar Chart */}
      <div className="space-y-4">
        <CardTitle className="text-lg">Weekly Progress</CardTitle>
        <div className="h-[350px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={barData}
              margin={{
                top: 20,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis 
                dataKey="name" 
                tick={{ fill: '#6B7280' }}
                axisLine={{ stroke: '#E5E7EB' }}
              />
              <YAxis 
                tick={{ fill: '#6B7280' }}
                axisLine={{ stroke: '#E5E7EB' }}
              />
              <Tooltip 
                contentStyle={{
                  backgroundColor: '#FFFFFF',
                  border: '1px solid #E5E7EB',
                  borderRadius: '0.5rem',
                  boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.1)'
                }}
              />
              <Legend />
              <Bar 
                dataKey="completed" 
                fill={COLORS[0]} 
                name="Completed" 
                radius={[4, 4, 0, 0]}
              />
              <Bar 
                dataKey="in_progress" 
                fill={COLORS[1]} 
                name="In Progress" 
                radius={[4, 4, 0, 0]}
              />
              <Bar 
                dataKey="pending" 
                fill={COLORS[2]} 
                name="Pending" 
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Pie Chart */}
      <div className="space-y-4">
        <CardTitle className="text-lg">Status Distribution</CardTitle>
        <div className="h-[350px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={renderCustomizedLabel}
                outerRadius={120}
                innerRadius={60}
                dataKey="value"
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip 
                formatter={(value: number, name: string) => [
                  value, 
                  `${name}: ${((value / pieData.reduce((a, b) => a + b.value, 0)) * 100).toFixed(1)}%`
                ]}
                contentStyle={{
                  backgroundColor: '#FFFFFF',
                  border: '1px solid #E5E7EB',
                  borderRadius: '0.5rem',
                  boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.1)'
                }}
              />
              <Legend 
                layout="vertical"
                verticalAlign="middle"
                align="right"
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}