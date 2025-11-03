
import React from 'react';
import Card from '../Card';
import Button from '../Button';
import StatusBadge from '../StatusBadge';
import { Campaign } from '../../types';

const mockCampaigns: Campaign[] = [
  { id: '1', name: 'Athletic Greens - Q3 Push', status: 'Active', budget: 50000, impressions: 850234, ctr: 2.1 },
  { id: '2', name: 'Squarespace - Creator Special', status: 'Active', budget: 75000, impressions: 1203456, ctr: 1.8 },
  { id: '3', name: 'BetterHelp - Mental Health Awareness', status: 'Paused', budget: 25000, impressions: 301234, ctr: 2.5 },
  { id: '4', name: 'HelloFresh - Summer Recipes', status: 'Ended', budget: 40000, impressions: 987654, ctr: 1.9 },
  { id: '5', name: 'Manscaped - Holiday Sale', status: 'Ended', budget: 60000, impressions: 1500000, ctr: 2.3 },
];

const Campaigns: React.FC = () => {
  return (
    <Card>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-brand-text">Campaign Management</h2>
        <Button>Create Campaign</Button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="border-b border-brand-accent text-brand-light">
            <tr>
              <th className="p-4">Name</th>
              <th className="p-4">Status</th>
              <th className="p-4">Budget</th>
              <th className="p-4">Impressions</th>
              <th className="p-4">CTR (%)</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {mockCampaigns.map((campaign) => (
              <tr key={campaign.id} className="border-b border-brand-accent hover:bg-brand-accent/20">
                <td className="p-4 font-medium">{campaign.name}</td>
                <td className="p-4">
                  <StatusBadge status={campaign.status} />
                </td>
                <td className="p-4">${campaign.budget.toLocaleString()}</td>
                <td className="p-4">{campaign.impressions.toLocaleString()}</td>
                <td className="p-4">{campaign.ctr.toFixed(1)}</td>
                <td className="p-4">
                  <a href="#" className="text-brand-blue hover:underline">Edit</a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
};

export default Campaigns;
