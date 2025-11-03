
import React from 'react';
import Card from '../Card';
import Button from '../Button';
import ToggleSwitch from '../ToggleSwitch';

const iabCategories = [
  'Gambling',
  'Hate Speech',
  'Illegal Drugs',
  'Firearms',
  'Political Content',
  'Sensitive Social Issues',
];

const Monetization: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
            <Card title="Advertiser Connections">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                <div className="flex flex-col items-center p-4 bg-brand-secondary rounded-md">
                    <img src="https://picsum.photos/seed/tradedesk/80/40" alt="The Trade Desk" className="h-10 mb-4 object-contain"/>
                    <Button className="w-full text-sm py-2">Connect</Button>
                </div>
                <div className="flex flex-col items-center p-4 bg-brand-secondary rounded-md">
                    <img src="https://picsum.photos/seed/magnite/80/40" alt="Magnite" className="h-10 mb-4 object-contain"/>
                    <Button className="w-full text-sm py-2">Connect</Button>
                </div>
                <div className="flex flex-col items-center p-4 bg-brand-secondary rounded-md">
                    <img src="https://picsum.photos/seed/xandr/80/40" alt="Xandr" className="h-10 mb-4 object-contain"/>
                    <Button className="w-full text-sm py-2">Connect</Button>
                </div>
                <div className="flex flex-col items-center p-4 bg-brand-secondary rounded-md">
                    <img src="https://picsum.photos/seed/pubmatic/80/40" alt="PubMatic" className="h-10 mb-4 object-contain"/>
                    <Button className="w-full text-sm py-2">Connect</Button>
                </div>
                 <div className="flex flex-col items-center p-4 bg-brand-secondary rounded-md">
                    <img src="https://picsum.photos/seed/openx/80/40" alt="OpenX" className="h-10 mb-4 object-contain"/>
                    <Button className="w-full text-sm py-2">Connect</Button>
                </div>
                 <div className="flex flex-col items-center p-4 bg-brand-secondary rounded-md">
                    <img src="https://picsum.photos/seed/googleadx/80/40" alt="Google AdX" className="h-10 mb-4 object-contain"/>
                    <Button className="w-full text-sm py-2">Connect</Button>
                </div>
            </div>
            </Card>
        </div>
        <div className="lg:col-span-1 space-y-6">
          <Card title="AI Yield Optimizer">
            <p className="text-brand-light mb-2">Recommended CPM Floor</p>
            <p className="text-4xl font-bold text-brand-blue">$22.50</p>
            <p className="text-sm text-gray-400 mt-2">Based on recent content analysis and market demand.</p>
          </Card>
        </div>
      </div>
       <Card title="Brand Safety - IAB Category Blocking">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                {iabCategories.map(cat => <ToggleSwitch key={cat} label={cat} />)}
            </div>
        </Card>
    </div>
  );
};

export default Monetization;
