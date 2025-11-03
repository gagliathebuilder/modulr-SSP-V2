
import React, { useState, useEffect } from 'react';
import Card from '../Card';
import StatCard from '../StatCard';
import { MonetizationIcon, ReportingIcon, CampaignIcon, DashboardIcon } from '../Icons';

const revenueData = [
  { name: 'Jan', Revenue: 4000 },
  { name: 'Feb', Revenue: 3000 },
  { name: 'Mar', Revenue: 5000 },
  { name: 'Apr', Revenue: 4500 },
  { name: 'May', Revenue: 6000 },
  { name: 'Jun', Revenue: 5500 },
];

const impressionsData = [
  { name: 'Week 1', Impressions: 2400 },
  { name: 'Week 2', Impressions: 1398 },
  { name: 'Week 3', Impressions: 9800 },
  { name: 'Week 4', Impressions: 3908 },
  { name: 'Week 5', Impressions: 4800 },
  { name: 'Week 6', Impressions: 3800 },
];


const ChartSkeleton: React.FC = () => (
    <div className="animate-pulse bg-brand-accent h-full w-full rounded-md"></div>
);

const Dashboard: React.FC = () => {
    const [rechartsLoaded, setRechartsLoaded] = useState(false);

    useEffect(() => {
        if (window.Recharts) {
            setRechartsLoaded(true);
            return;
        }
        const interval = setInterval(() => {
            if (window.Recharts) {
                setRechartsLoaded(true);
                clearInterval(interval);
            }
        }, 100);
        return () => clearInterval(interval);
    }, []);

    const { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } = window.Recharts || {};

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Total Revenue" value="$45,231.89" icon={<MonetizationIcon />} />
        <StatCard title="Total Impressions" value="1.2M" icon={<ReportingIcon />} />
        <StatCard title="Average Fill Rate" value="87.5%" icon={<DashboardIcon />} />
        <StatCard title="Active Campaigns" value="12" icon={<CampaignIcon />} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card title="Monthly Revenue">
          <div className="h-80">
            {rechartsLoaded ? (
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={revenueData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#415A77" />
                    <XAxis dataKey="name" stroke="#E0E1DD" />
                    <YAxis stroke="#E0E1DD" />
                    <Tooltip contentStyle={{ backgroundColor: '#1B263B', border: '1px solid #415A77' }} />
                    <Legend />
                    <Bar dataKey="Revenue" fill="#3b82f6" />
                    </BarChart>
                </ResponsiveContainer>
            ) : <ChartSkeleton />}
          </div>
        </Card>
        <Card title="Recent Impressions">
          <div className="h-80">
             {rechartsLoaded ? (
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={impressionsData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#415A77" />
                    <XAxis dataKey="name" stroke="#E0E1DD" />
                    <YAxis stroke="#E0E1DD" />
                    <Tooltip contentStyle={{ backgroundColor: '#1B263B', border: '1px solid #415A77' }} />
                    <Legend />
                    <Line type="monotone" dataKey="Impressions" stroke="#3b82f6" activeDot={{ r: 8 }} />
                    </LineChart>
                </ResponsiveContainer>
             ) : <ChartSkeleton />}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
