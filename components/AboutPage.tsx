
import React from 'react';

const AboutPage: React.FC = () => {
  return (
    <div className="max-w-3xl mx-auto text-center animate-fade-in">
      <div className="bg-white dark:bg-slate-800 p-8 sm:p-12 rounded-lg shadow-lg">
        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">Our Mission</h2>
        <p className="text-lg text-slate-600 dark:text-slate-300 mb-6">
          At ColorizePro, we believe that every old photograph holds a story waiting to be rediscovered. 
          The past, often seen only in monochrome, is filled with the vibrant hues of life. Our mission is to bridge the gap between history and the present by harnessing the power of artificial intelligence.
        </p>
        <div className="w-24 h-1 bg-brand-primary mx-auto my-6 rounded"></div>
        <p className="text-slate-600 dark:text-slate-300 mb-4">
          We've built this tool to make the magic of photo colorization accessible to everyone. Whether you're a historian, a genealogist, or simply someone looking to reconnect with your family's past, ColorizePro offers a simple yet powerful way to breathe new life into your cherished memories.
        </p>
        <p className="text-slate-600 dark:text-slate-300">
          By transforming black and white images into rich, full-color photos, we hope to help you see the past with fresh eyes and connect more deeply with the moments and people that shape your history.
        </p>
        <div className="mt-10">
            <img src="https://picsum.photos/800/400?grayscale" alt="Black and white historical" className="rounded-lg shadow-md"/>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;