
export enum View {
  Dashboard,
  Campaigns,
  Analyze,
  Monetization,
  Reporting,
  ContentLibrary,
}

export interface Campaign {
  id: string;
  name: string;
  status: 'Active' | 'Paused' | 'Ended';
  budget: number;
  impressions: number;
  ctr: number;
}

export interface BrandSafety {
  level: 'Safe' | 'Moderate Risk' | 'High Risk';
  explanation: string;
}

export interface AudienceProfile {
  estimatedAgeRange: string;
  estimatedGenderSplit: string;
  interests: string[];
}

export interface AdvertiserSentiment {
  topic: string;
  sentiment: 'Positive' | 'Neutral' | 'Negative';
  reasoning: string;
}

export interface PodcastAnalysis {
  showTitle: string;
  episodeTitle: string;
  summary: string;
  thematicCategories: string[];
  brandSafety: BrandSafety;
  suggestedAdvertisers: string[];
  sentiment: 'Positive' | 'Neutral' | 'Negative';
  audienceProfile: AudienceProfile;
  advertiserSentiment: AdvertiserSentiment[];
}

export interface AnalyzedItem extends PodcastAnalysis {
  id: string;
  analyzedAt: string;
  link: string;
}


export interface AuctionLog {
  id: string;
  timestamp: string;
  episode: string;
  advertiser: string;
  bidPrice: number;
  status: 'Win' | 'Loss';
  winningBid: number;
}

// Augment the global Window interface to include Recharts
declare global {
  interface Window {
    Recharts?: any;
  }
}