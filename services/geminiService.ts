
import { GoogleGenAI, Type } from "@google/genai";
import { PodcastAnalysis } from '../types';

const analysisSchema = {
    type: Type.OBJECT,
    properties: {
        showTitle: { type: Type.STRING, description: "The title of the overall podcast show or series." },
        episodeTitle: { type: Type.STRING, description: "The title of the specific podcast episode." },
        summary: { type: Type.STRING, description: "A concise summary of the content." },
        thematicCategories: { 
            type: Type.ARRAY, 
            items: { type: Type.STRING }, 
            description: "A list of tags identifying the main themes of the episode." 
        },
        brandSafety: {
            type: Type.OBJECT,
            properties: {
                level: { type: Type.STRING, description: "A brand safety indicator: 'Safe', 'Moderate Risk', or 'High Risk'." },
                explanation: { type: Type.STRING, description: "A brief explanation for the brand safety assessment." }
            },
            required: ['level', 'explanation']
        },
        suggestedAdvertisers: { 
            type: Type.ARRAY, 
            items: { type: Type.STRING }, 
            description: "AI-recommended advertiser categories that are a good fit for the content." 
        },
        sentiment: { 
            type: Type.STRING, 
            description: "The general sentiment of the episode: 'Positive', 'Neutral', or 'Negative'." 
        },
        audienceProfile: {
            type: Type.OBJECT,
            properties: {
                estimatedAgeRange: { type: Type.STRING, description: "The estimated age range of the target audience (e.g., '25-34')." },
                estimatedGenderSplit: { type: Type.STRING, description: "The estimated gender split (e.g., '60% Male, 40% Female')." },
                interests: { 
                    type: Type.ARRAY, 
                    items: { type: Type.STRING }, 
                    description: "A list of key interests of the listeners." 
                }
            },
            required: ['estimatedAgeRange', 'estimatedGenderSplit', 'interests']
        },
        advertiserSentiment: {
            type: Type.ARRAY,
            items: {
                type: Type.OBJECT,
                properties: {
                    topic: { type: Type.STRING, description: "The specific topic being analyzed (e.g., 'Artificial Intelligence')." },
                    sentiment: { type: Type.STRING, description: "Sentiment towards the topic: 'Positive', 'Neutral', or 'Negative'." },
                    reasoning: { type: Type.STRING, description: "The reasoning behind the sentiment analysis for this topic." }
                },
                required: ['topic', 'sentiment', 'reasoning']
            }
        }
    },
    required: [
        'showTitle',
        'episodeTitle',
        'summary', 
        'thematicCategories', 
        'brandSafety', 
        'suggestedAdvertisers', 
        'sentiment', 
        'audienceProfile', 
        'advertiserSentiment'
    ]
};


export const analyzePodcastContent = async (content: string): Promise<PodcastAnalysis> => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    throw new Error("API_KEY environment variable not set.");
  }
  
  const ai = new GoogleGenAI({ apiKey });

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-pro',
      contents: {
          parts: [{
              text: `Please analyze the following podcast transcript or summary. Identify the show and episode title. Based on the content, provide a detailed contextual analysis for ad targeting purposes, including an estimated audience profile and sentiment towards specific advertiser-relevant topics. Here is the content: "${content}"`
          }]
      },
      config: {
        responseMimeType: "application/json",
        responseSchema: analysisSchema,
      }
    });

    const jsonText = response.text.trim();
    const analysisResult: PodcastAnalysis = JSON.parse(jsonText);
    return analysisResult;
  } catch (error) {
    console.error("Error analyzing content with Gemini API:", error);
    throw new Error("Failed to analyze content. Please check the console for more details.");
  }
};