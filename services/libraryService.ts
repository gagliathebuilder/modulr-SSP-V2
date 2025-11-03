
import { AnalyzedItem, PodcastAnalysis } from '../types';

const MOCK_LIBRARY: AnalyzedItem[] = [
    {
        id: 'lib_1',
        analyzedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
        link: 'https://example.com/podcast/crime-junkie-1',
        showTitle: 'Crime Junkie',
        episodeTitle: 'MURDERED: Laci Peterson',
        summary: 'A deep dive into the mysterious and tragic disappearance of Laci Peterson on Christmas Eve, 2002, and the subsequent investigation that captivated a nation. The episode explores the evidence, trial, and conviction of her husband, Scott Peterson.',
        thematicCategories: ['True Crime', 'Mystery', 'Investigation', 'Legal', 'Social Commentary'],
        brandSafety: {
            level: 'High Risk',
            explanation: 'Contains detailed discussions of murder, marital infidelity, and a criminal trial. Unsuitable for most family-friendly brands or those sensitive to violent or tragic themes.'
        },
        suggestedAdvertisers: ['Private Investigator Services', 'Legal Services', 'Documentary Streaming Platforms', 'Home Security Systems', 'Book Publishers (True Crime)'],
        sentiment: 'Negative',
        audienceProfile: {
            estimatedAgeRange: '25-45',
            estimatedGenderSplit: '80% Female, 20% Male',
            interests: ['Podcasts', 'True Crime', 'Criminal Justice', 'Documentaries', 'Storytelling']
        },
        advertiserSentiment: [
            {
                topic: 'Law Enforcement',
                sentiment: 'Neutral',
                reasoning: 'The episode presents the facts of the police investigation without strong positive or negative bias, focusing on the procedural aspects of the case.'
            }
        ]
    }
];

class LibraryService {
    private library: AnalyzedItem[] = MOCK_LIBRARY;

    getLibrary(): AnalyzedItem[] {
        return [...this.library].sort((a, b) => new Date(b.analyzedAt).getTime() - new Date(a.analyzedAt).getTime());
    }

    addToLibrary(analysis: PodcastAnalysis, link: string): void {
        if (this.isAnalyzed(link)) {
            console.warn(`Link ${link} has already been analyzed and saved.`);
            return;
        }
        const newItem: AnalyzedItem = {
            id: `lib_${Date.now()}`,
            analyzedAt: new Date().toISOString(),
            link,
            ...analysis,
        };
        this.library.unshift(newItem);
        console.log("Added to library:", newItem);
    }
    
    isAnalyzed(link: string): boolean {
        return this.library.some(item => item.link === link);
    }
}

export const libraryService = new LibraryService();
