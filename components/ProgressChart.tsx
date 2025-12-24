
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { HistoryEntry } from '../types';

interface ProgressChartProps {
  data: HistoryEntry[];
  exerciseName: string;
}

export const ProgressChart: React.FC<ProgressChartProps> = ({ data, exerciseName }) => {
  if (!data || data.length === 0) {
    return (
      <div className="flex items-center justify-center h-48 bg-gray-800/50 rounded-lg">
        <p className="text-gray-400 text-sm">Sem dados históricos para {exerciseName}</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-800 p-4 rounded-xl border border-gray-700">
      <h3 className="text-sm font-semibold text-gray-200 mb-4">Evolução: {exerciseName}</h3>
      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis 
              dataKey="date" 
              stroke="#9ca3af" 
              fontSize={10} 
              tickFormatter={(val) => val.split('/')[0] + '/' + val.split('/')[1]}
            />
            <YAxis stroke="#9ca3af" fontSize={10} />
            <Tooltip 
              contentStyle={{ backgroundColor: '#1f2937', border: 'none', borderRadius: '8px', color: '#fff' }}
              itemStyle={{ color: '#10b981' }}
            />
            <Line 
              type="monotone" 
              dataKey="weight" 
              stroke="#10b981" 
              strokeWidth={3} 
              dot={{ fill: '#10b981', r: 4 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
