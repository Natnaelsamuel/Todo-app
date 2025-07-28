// 'use client';

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
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// const COLORS = ["#10B981", "#3B82F6", "#F59E0B"]; // Green, Blue, Orange

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
//       className="text-xs font-medium"
//     >
//       {`${(percent * 100).toFixed(0)}%`}
//     </text>
//   );
// };

// export function TodoChart({ barData, pieData }: TodoChartProps) {
//   return (
//     <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
//       {/* Bar Chart */}
//       <div className="space-y-4">
//         <CardTitle className="text-lg">Weekly Progress</CardTitle>
//         <div className="h-[350px]">
//           <ResponsiveContainer width="100%" height="100%">
//             <BarChart
//               data={barData}
//               margin={{
//                 top: 20,
//                 right: 30,
//                 left: 20,
//                 bottom: 5,
//               }}
//             >
//               <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
//               <XAxis 
//                 dataKey="name" 
//                 tick={{ fill: '#6B7280' }}
//                 axisLine={{ stroke: '#E5E7EB' }}
//               />
//               <YAxis 
//                 tick={{ fill: '#6B7280' }}
//                 axisLine={{ stroke: '#E5E7EB' }}
//               />
//               <Tooltip 
//                 contentStyle={{
//                   backgroundColor: '#FFFFFF',
//                   border: '1px solid #E5E7EB',
//                   borderRadius: '0.5rem',
//                   boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.1)'
//                 }}
//               />
//               <Legend />
//               <Bar 
//                 dataKey="completed" 
//                 fill={COLORS[0]} 
//                 name="Completed" 
//                 radius={[4, 4, 0, 0]}
//               />
//               <Bar 
//                 dataKey="in_progress" 
//                 fill={COLORS[1]} 
//                 name="In Progress" 
//                 radius={[4, 4, 0, 0]}
//               />
//               <Bar 
//                 dataKey="pending" 
//                 fill={COLORS[2]} 
//                 name="Pending" 
//                 radius={[4, 4, 0, 0]}
//               />
//             </BarChart>
//           </ResponsiveContainer>
//         </div>
//       </div>

//       {/* Pie Chart */}
//       <div className="space-y-4">
//         <CardTitle className="text-lg">Status Distribution</CardTitle>
//         <div className="h-[350px]">
//           <ResponsiveContainer width="100%" height="100%">
//             <PieChart>
//               <Pie
//                 data={pieData}
//                 cx="50%"
//                 cy="50%"
//                 labelLine={false}
//                 label={renderCustomizedLabel}
//                 outerRadius={120}
//                 innerRadius={60}
//                 dataKey="value"
//               >
//                 {pieData.map((entry, index) => (
//                   <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
//                 ))}
//               </Pie>
//               <Tooltip 
//                 formatter={(value: number, name: string) => [
//                   value, 
//                   `${name}: ${((value / pieData.reduce((a, b) => a + b.value, 0)) * 100).toFixed(1)}%`
//                 ]}
//                 contentStyle={{
//                   backgroundColor: '#FFFFFF',
//                   border: '1px solid #E5E7EB',
//                   borderRadius: '0.5rem',
//                   boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.1)'
//                 }}
//               />
//               <Legend 
//                 layout="vertical"
//                 verticalAlign="middle"
//                 align="right"
//               />
//             </PieChart>
//           </ResponsiveContainer>
//         </div>
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
import { COLOR_THEME } from "@/lib/theme";

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
  // Using your primary color theme plus standard semantic colors
  const chartColors = [
    "#10B981", // Green for completed (standard success color)
    "#8B5CF6", // Your primary color for in progress
    "#F59E0B"  // Amber for pending (standard warning color)
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Bar Chart Card */}
      <Card className="hover:shadow-md transition-shadow">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-gray-800 dark:text-white">
            Weekly Progress
          </CardTitle>
        </CardHeader>
        <CardContent>
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
                <CartesianGrid 
                  strokeDasharray="3 3" 
                  stroke="#E5E7EB" 
                  vertical={false}
                />
                <XAxis 
                  dataKey="name" 
                  tick={{ fill: '#6B7280', fontSize: 12 }}
                  axisLine={{ stroke: '#E5E7EB' }}
                  tickLine={false}
                />
                <YAxis 
                  tick={{ fill: '#6B7280', fontSize: 12 }}
                  axisLine={{ stroke: '#E5E7EB' }}
                  tickLine={false}
                />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'white',
                    border: '1px solid #E5E7EB',
                    borderRadius: '6px',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                    fontSize: '14px'
                  }}
                  itemStyle={{ color: '#1F2937' }}
                />
                <Legend 
                  iconType="circle"
                  iconSize={10}
                  wrapperStyle={{ paddingTop: '20px' }}
                />
                <Bar 
                  dataKey="completed" 
                  fill={chartColors[0]} 
                  name="Completed" 
                  radius={[4, 4, 0, 0]}
                />
                <Bar 
                  dataKey="in_progress" 
                  fill={chartColors[1]} 
                  name="In Progress" 
                  radius={[4, 4, 0, 0]}
                />
                <Bar 
                  dataKey="pending" 
                  fill={chartColors[2]} 
                  name="Pending" 
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Pie Chart Card */}
      <Card className="hover:shadow-md transition-shadow">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-gray-800 dark:text-white">
            Status Distribution
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={renderCustomizedLabel}
                  outerRadius={100}
                  innerRadius={50}
                  dataKey="value"
                  paddingAngle={2}
                >
                  {pieData.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={chartColors[index % chartColors.length]} 
                      stroke="white"
                      strokeWidth={2}
                    />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value: number, name: string) => [
                    value, 
                    `${((Number(value) / pieData.reduce((a, b) => a + b.value, 0)) * 100).toFixed(1)}%`
                  ]}
                  contentStyle={{
                    backgroundColor: 'white',
                    border: '1px solid #E5E7EB',
                    borderRadius: '6px',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                    fontSize: '14px'
                  }}
                />
                <Legend 
                  layout="vertical"
                  verticalAlign="middle"
                  align="right"
                  iconType="circle"
                  iconSize={10}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}