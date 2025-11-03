
import React, { useState, useEffect } from 'react';
import Card from '../Card';
import Tag from '../Tag';
import { libraryService } from '../../services/libraryService';
import { AnalyzedItem } from '../../types';

interface GroupedContent {
  [showTitle: string]: AnalyzedItem[];
}

const ContentLibrary: React.FC = () => {
  const [library, setLibrary] = useState<AnalyzedItem[]>([]);

  useEffect(() => {
    setLibrary(libraryService.getLibrary());
  }, []);

  const groupedContent = library.reduce((acc, item) => {
    const { showTitle } = item;
    if (!acc[showTitle]) {
      acc[showTitle] = [];
    }
    acc[showTitle].push(item);
    return acc;
  }, {} as GroupedContent);

  const showTitles = Object.keys(groupedContent).sort();

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-brand-text">Content Library</h2>
      
      {showTitles.length === 0 ? (
        <Card>
            <p className="text-brand-light text-center">Your library is empty. Analyze some content to get started!</p>
        </Card>
      ) : (
        showTitles.map(title => (
          <Card key={title} title={title}>
            <div className="divide-y divide-brand-accent">
              {groupedContent[title].map(item => (
                <div key={item.id} className="py-4">
                  <h4 className="font-semibold text-lg text-brand-text">{item.episodeTitle}</h4>
                  <p className="text-sm text-brand-light mb-3">
                    Analyzed on: {new Date(item.analyzedAt).toLocaleDateString()}
                  </p>
                  <div className="flex flex-wrap">
                    {item.thematicCategories.slice(0, 5).map(category => (
                      <Tag key={category}>{category}</Tag>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </Card>
        ))
      )}
    </div>
  );
};

export default ContentLibrary;
