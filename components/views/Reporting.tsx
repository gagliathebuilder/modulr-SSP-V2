
import React from 'react';
import Card from '../Card';
import StatCard from '../StatCard';
import StatusBadge from '../StatusBadge';
import { AuctionLog } from '../../types';
import { ReportingIcon, MonetizationIcon, DashboardIcon } from '../Icons';

const mockLogs: AuctionLog[] = [
  { id: '1', timestamp: '10:45:12', episode: 'The Daily - Ep. 345', advertiser: 'AdCo', bidPrice: 21.50, status: 'Win', winningBid: 21.50 },
  { id: '2', timestamp: '10:45:11', episode: 'Crime Junkie - Ep. 211', advertiser: 'Media Inc', bidPrice: 18.00, status: 'Loss', winningBid: 19.25 },
  { id: '3', timestamp: '10:45:11', episode: 'The Daily - Ep. 345', advertiser: 'BrandX', bidPrice: 20.75, status: 'Loss', winningBid: 21.50 },
  { id: '4', timestamp: '10:45:10', episode: 'Huberman Lab - Ep. 98', advertiser: 'Health LLC', bidPrice: 25.00, status: 'Win', winningBid: 25.00 },
  { id: '5', timestamp: '10:45:09', episode: 'Crime Junkie - Ep. 211', advertiser: 'Direct Ads', bidPrice: 19.25, status: 'Win', winningBid: 19.25 },
  { id: '6', timestamp: '10:45:08', episode: 'SmartLess - Ep. 150', advertiser: 'Comedy Ads', bidPrice: 22.10, status: 'Win', winningBid: 22.10 },
  { id: '7', timestamp: '10:45:07', episode: 'Huberman Lab - Ep. 98', advertiser: 'Supplements Co', bidPrice: 24.80, status: 'Loss', winningBid: 25.00 },
];

const Reporting: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <StatCard title="Total Bid Requests" value="2,845,980" icon={<ReportingIcon />} />
        <StatCard title="Win Rate" value="41.2%" icon={<DashboardIcon />} />
        <StatCard title="Average Winning CPM" value="$21.78" icon={<MonetizationIcon />} />
      </div>

      <Card>
        <h2 className="text-2xl font-bold text-brand-text mb-6">Real-Time Auction Log</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="border-b border-brand-accent text-brand-light">
              <tr>
                <th className="p-4">Timestamp</th>
                <th className="p-4">Episode</th>
                <th className="p-4">Advertiser</th>
                <th className="p-4">Bid Price</th>
                <th className="p-4">Status</th>
                <th className="p-4">Winning Bid</th>
              </tr>
            </thead>
            <tbody>
              {mockLogs.map((log) => (
                <tr key={log.id} className="border-b border-brand-accent hover:bg-brand-accent/20">
                  <td className="p-4 font-mono text-sm text-brand-light">{log.timestamp}</td>
                  <td className="p-4 font-medium">{log.episode}</td>
                  <td className="p-4">{log.advertiser}</td>
                  <td className="p-4">${log.bidPrice.toFixed(2)}</td>
                  <td className="p-4">
                    <StatusBadge status={log.status} />
                  </td>
                  <td className="p-4 font-semibold">${log.winningBid.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};

export default Reporting;
