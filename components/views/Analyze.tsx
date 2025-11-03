
import React, { useState, useEffect, useRef } from 'react';
import Card from '../Card';
import Button from '../Button';
import Tag from '../Tag';
import { startAnalysisJob, getAnalysisStatus } from '../../services/backendService';
import { libraryService } from '../../services/libraryService';
import { PodcastAnalysis } from '../../types';
import Spinner from '../Spinner';

const AnalysisResult: React.FC<{ analysis: PodcastAnalysis, link: string }> = ({ analysis, link }) => {
    const [isSaved, setIsSaved] = useState(false);

    useEffect(() => {
        setIsSaved(libraryService.isAnalyzed(link));
    }, [link]);

    const handleSave = () => {
        libraryService.addToLibrary(analysis, link);
        setIsSaved(true);
    };

    return (
        <div className="space-y-6 mt-8">
            <div className="flex justify-end">
                <Button onClick={handleSave} disabled={isSaved}>
                    {isSaved ? 'Saved to Library' : 'Save to Library'}
                </Button>
            </div>
            <Card title="Summary">
                <p className="text-brand-light">{analysis.summary}</p>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Card title="Overall Sentiment">
                    <p className="text-2xl font-bold">{analysis.sentiment}</p>
                </Card>
                <Card title="Brand Safety">
                    <p className={`text-2xl font-bold ${
                        analysis.brandSafety.level === 'Safe' ? 'text-green-400' :
                        analysis.brandSafety.level === 'Moderate Risk' ? 'text-yellow-400' : 'text-red-400'
                    }`}>
                        {analysis.brandSafety.level}
                    </p>
                    <p className="text-sm text-brand-light mt-1">{analysis.brandSafety.explanation}</p>
                </Card>
                <Card title="Audience: Age Range">
                    <p className="text-2xl font-bold">{analysis.audienceProfile.estimatedAgeRange}</p>
                    <p className="text-sm text-brand-light mt-1">{analysis.audienceProfile.estimatedGenderSplit}</p>
                </Card>
            </div>

            <Card title="Audience Interests">
                <div className="flex flex-wrap">
                    {analysis.audienceProfile.interests.map(interest => <Tag key={interest}>{interest}</Tag>)}
                </div>
            </Card>
            
            <Card title="Thematic Categories">
                <div className="flex flex-wrap">
                    {analysis.thematicCategories.map(category => <Tag key={category}>{category}</Tag>)}
                </div>
            </Card>

            <Card title="Suggested Advertisers">
                <div className="flex flex-wrap">
                    {analysis.suggestedAdvertisers.map(advertiser => <Tag key={advertiser}>{advertiser}</Tag>)}
                </div>
            </Card>

            <Card title="Advertiser Topic Sentiment">
            <div className="space-y-4">
                {analysis.advertiserSentiment.map(item => (
                <div key={item.topic} className="p-3 bg-brand-secondary rounded-md">
                    <div className="flex justify-between items-center">
                    <p className="font-semibold">{item.topic}</p>
                    <p className={`font-bold ${
                        item.sentiment === 'Positive' ? 'text-green-400' :
                        item.sentiment === 'Neutral' ? 'text-gray-400' : 'text-red-400'
                    }`}>{item.sentiment}</p>
                    </div>
                    <p className="text-sm text-brand-light mt-1">{item.reasoning}</p>
                </div>
                ))}
            </div>
            </Card>
        </div>
    )
};

const statusMessages: { [key: string]: string } = {
    pending: '✅ Job submitted. Awaiting processing...',
    transcribing: '🎤 Transcription in progress... this may take a moment.',
    analyzing: '🧠 Analyzing content with Gemini...',
    failed: '❌ Analysis failed. Please try again.',
};

const Analyze: React.FC = () => {
  const [link, setLink] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [analysis, setAnalysis] = useState<PodcastAnalysis | null>(null);
  const [jobId, setJobId] = useState<string | null>(null);
  const [jobStatus, setJobStatus] = useState<string | null>(null);
  const pollingInterval = useRef<number | null>(null);
  
  const [currentLink, setCurrentLink] = useState('');

  const cleanupPolling = () => {
      if (pollingInterval.current) {
          clearInterval(pollingInterval.current);
          pollingInterval.current = null;
      }
  };

  useEffect(() => {
    return cleanupPolling;
  }, []);

  useEffect(() => {
    if (jobId && !pollingInterval.current) {
      pollingInterval.current = window.setInterval(async () => {
        try {
          const { status, result } = await getAnalysisStatus(jobId);
          setJobStatus(status);

          if (status === 'completed') {
            setAnalysis(result);
            setJobId(null);
            cleanupPolling();
          } else if (status === 'failed') {
            setError('The analysis job failed. Please check the console and try again.');
            setJobId(null);
            cleanupPolling();
          }
        } catch (err) {
            setError('Failed to poll for job status.');
            setJobId(null);
            cleanupPolling();
        }
      }, 3000);
    }
  }, [jobId]);

  const handleAnalyzeLink = async () => {
    if (!link.trim()) {
      setError("Podcast link cannot be empty.");
      return;
    }
    cleanupPolling();
    setError(null);
    setAnalysis(null);
    setJobId(null);
    setJobStatus('pending');
    setCurrentLink(link);

    try {
      const { jobId } = await startAnalysisJob(link);
      setJobId(jobId);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unknown error occurred launching job.");
      setJobStatus(null);
    }
  };

  const isProcessing = !!jobStatus && jobStatus !== 'completed' && jobStatus !== 'failed';

  return (
    <div className="max-w-4xl mx-auto">
      <Card>
        <h2 className="text-2xl font-bold text-brand-text mb-4">Analyze Podcast Content</h2>
        <p className="text-brand-light mb-6">
            Paste a podcast link below to get a deep contextual analysis powered by the Gemini API. The results can be saved to your Content Library.
        </p>
        <input
        type="text"
        value={link}
        onChange={(e) => setLink(e.target.value)}
        className="w-full p-4 bg-brand-secondary border border-brand-accent rounded-md focus:ring-2 focus:ring-brand-blue focus:outline-none text-brand-text"
        placeholder="Paste a podcast link (e.g., Spotify, Apple Podcasts)..."
        disabled={isProcessing}
        />
        <div className="mt-6 flex justify-end">
            <Button onClick={handleAnalyzeLink} isLoading={isProcessing} disabled={!link.trim() || isProcessing}>
                Analyze Link
            </Button>
        </div>
      </Card>

      {error && 
        <Card className="mt-8 bg-red-500/10 border-red-500/30">
            <p className="text-red-400 text-center font-medium">{error}</p>
        </Card>
      }
      
      {isProcessing && 
        <Card className="mt-8 text-center">
            <div className="flex items-center justify-center">
                <Spinner />
                <p className="text-brand-light ml-3">{statusMessages[jobStatus || 'pending']}</p>
            </div>
        </Card>
      }
      
      {analysis && <AnalysisResult analysis={analysis} link={currentLink} />}
    </div>
  );
};

export default Analyze;