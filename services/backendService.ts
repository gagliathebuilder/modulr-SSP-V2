
import { analyzePodcastContent } from './geminiService';
import { PodcastAnalysis } from '../types';

// In a real backend, this would be a database (e.g., Redis, PostgreSQL).
const jobStore: Map<string, { status: string; result: PodcastAnalysis | null }> = new Map();

const MOCK_TRANSCRIPT = `
    Tristan Harris and Aza Raskin discuss the catastrophic risks posed by rapidly advancing artificial intelligence. They frame the issue not as a distant sci-fi problem, but as an imminent threat that humanity is unprepared to handle. The core argument is that AI represents a new kind of power—an intelligence that is not human—and its exponential development outpaces our ability to create the necessary social and political guardrails.

    They draw a powerful analogy to the dawn of the nuclear age, suggesting that we are in a similar pivotal moment. Just as nuclear weapons introduced an existential risk that required global coordination and new institutions to manage, AI presents a comparable, if not more complex, challenge. The speakers warn that unlike nuclear weapons, which are difficult to build and deploy, AI tools can be replicated and distributed globally with ease, creating an unstable, multipolar arms race where corporations and nations compete to build ever-more-powerful models without adequate safety checks.

    The discussion highlights several specific catastrophic risks. First, the erosion of truth and the complete collapse of a shared reality. AI can generate infinite personalized content, including highly convincing fake news, propaganda, and deepfakes, making it impossible to distinguish what is real. This could destabilize democracies and shatter social cohesion.

    Second, the risk of automated, autonomous warfare. AI-powered weapons systems could make decisions at speeds beyond human comprehension, leading to rapid, uncontrollable escalations of conflict.

    Third, the potential for AI to be used by bad actors to engineer novel bioweapons or launch devastating cyberattacks. The knowledge required to create these threats could be democratized by powerful AI models.

    Harris and Raskin argue that the immediate goal should be a global pause on the training of AI models more powerful than GPT-4. This pause would provide a crucial window for society to develop robust safety protocols, international agreements, and regulatory bodies capable of overseeing AI development. They stress that the goal isn't to stop AI progress forever, but to ensure that our wisdom and foresight can catch up with our technical capabilities. They urge listeners to recognize the gravity of the situation and advocate for a more cautious, coordinated, and globally responsible approach to developing this transformative technology.
`;

const getMockAnalysis = (): PodcastAnalysis => ({
    showTitle: 'Center for Humane Technology',
    episodeTitle: 'The AI Dilemma',
    summary: 'The speakers, Tristan Harris and Aza Raskin, discuss the catastrophic and imminent risks of advanced artificial intelligence. They compare the current moment to the dawn of the nuclear age, warning of AI\'s potential to erode truth, enable autonomous warfare, and democratize the creation of bioweapons. They advocate for a global pause on training powerful AI models to allow time for developing safety protocols and international regulations.',
    thematicCategories: ['Artificial Intelligence', 'Technology', 'Existential Risk', 'AI Safety', 'Ethics', 'Geopolitics', 'Public Policy'],
    brandSafety: {
      level: 'Moderate Risk',
      explanation: 'The content discusses serious and alarming topics, including existential threats, societal collapse, autonomous warfare, and bioweapons. While the discussion is intellectual and not graphic, the grave and cautionary tone may be unsuitable for brands with a lighthearted or optimistic image.'
    },
    suggestedAdvertisers: ['Cybersecurity Services', 'Technology Publications', 'Higher Education Institutions', 'Online Learning Platforms (Tech & Ethics)', 'Non-Profit Organizations (Policy & Tech Ethics)', 'Financial Planning Services', 'Documentary Streaming Services'],
    sentiment: 'Negative',
    audienceProfile: {
      estimatedAgeRange: '25-45',
      estimatedGenderSplit: '65% Male, 35% Female',
      interests: ['Technology', 'Artificial Intelligence', 'Future Studies', 'Ethics', 'Philosophy', 'Geopolitics', 'Cybersecurity']
    },
    advertiserSentiment: [
      {
        topic: 'Artificial Intelligence',
        sentiment: 'Negative',
        reasoning: 'The entire discussion frames advanced AI as a catastrophic, existential threat to humanity that is developing faster than our ability to control it. The sentiment is deeply cautionary and focused on potential negative outcomes.'
      }
    ]
});


// Simulates submitting a job to the backend.
export const startAnalysisJob = (url: string): Promise<{ jobId: string }> => {
  return new Promise((resolve) => {
    console.log(`[Backend] Received request to analyze URL: ${url}`);
    const jobId = `job_${Date.now()}`;
    jobStore.set(jobId, { status: 'pending', result: null });
    
    // Simulate the time it takes to download and start transcription
    setTimeout(() => {
        jobStore.set(jobId, { status: 'transcribing', result: null });
        console.log(`[Backend] Job ${jobId} status updated to: transcribing`);
    }, 2000);

    // Simulate the time it takes to finish transcription and start Gemini analysis
    setTimeout(() => {
        console.log(`[Backend] Job ${jobId} transcription finished. Analyzing with Gemini...`);
        jobStore.set(jobId, { status: 'analyzing', result: null });
        
        // This is where the actual call to the AI happens on the backend.
        // We are using a mock transcript for this simulation.
        // In a real app, you would extract content from the 'url'.
        
        // To simulate a real call, we can use the geminiService, but for stability, we use a static mock.
        // If the API call fails, the job status will be set to 'failed'.
        try {
            const result = getMockAnalysis(); // Using a static mock for consistent results
             jobStore.set(jobId, { status: 'completed', result });
             console.log(`[Backend] Job ${jobId} status updated to: completed`);
        } catch (error) {
             console.error(`[Backend] Job ${jobId} failed.`, error);
             jobStore.set(jobId, { status: 'failed', result: null });
        }

    }, 5000); // 5 seconds to simulate transcription

    console.log(`[Backend] Job ${jobId} created and processing started.`);
    resolve({ jobId });
  });
};

// Simulates polling the status of a job.
export const getAnalysisStatus = (jobId: string): Promise<{ status: string; result: PodcastAnalysis | null }> => {
    return new Promise((resolve) => {
        const job = jobStore.get(jobId) || { status: 'not_found', result: null };
        setTimeout(() => resolve(job), 500); // Simulate network latency
    });
};