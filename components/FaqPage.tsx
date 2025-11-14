
import React, { useState } from 'react';

interface FaqItemProps {
  question: string;
  answer: string;
}

const faqs: FaqItemProps[] = [
  {
    question: 'How does the AI colorization work?',
    answer: 'Our application uses a sophisticated deep learning model from Google\'s Gemini API. It has been trained on millions of images to learn the relationships between shapes, textures, and their natural colors. When you upload a black and white photo, the AI analyzes its contents and applies what it has learned to predict and generate realistic colors.'
  },
  {
    question: 'Is my data and are my images secure?',
    answer: 'Absolutely. We prioritize your privacy. Your images are sent securely to the AI model for processing and are not stored on our servers. The entire process is automated, and your photos are not viewed by any human.'
  },
  {
    question: 'How long does the colorization process take?',
    answer: 'Processing time can vary depending on the image size, complexity, and current server load. However, most images are colorized within 30 to 60 seconds. Our use of the powerful Gemini Flash model ensures a fast turnaround.'
  },
  {
    question: 'What kind of images work best?',
    answer: 'For the best results, use high-quality, clear black and white images. Photos with good contrast and well-defined subjects tend to colorize more accurately. While the AI can handle older, lower-quality photos, the results may be less precise.'
  },
  {
    question: 'Is there a limit on the number of images I can colorize?',
    answer: 'Currently, ColorizePro is free to use for a generous number of conversions. We may introduce usage tiers in the future to maintain the quality and speed of our service for everyone. Enjoy the free access while it lasts!'
  },
];

const FaqItem: React.FC<FaqItemProps & { isOpen: boolean; onClick: () => void }> = ({
  question,
  answer,
  isOpen,
  onClick
}) => {
  return (
    <div className="border-b border-slate-200 dark:border-slate-700">
      <button
        onClick={onClick}
        className="w-full flex justify-between items-center text-left py-4 px-2 focus:outline-none"
      >
        <h3 className="text-lg font-medium text-slate-800 dark:text-slate-100">{question}</h3>
        <span className={`transform transition-transform duration-300 ${isOpen ? 'rotate-180' : 'rotate-0'}`}>
          <svg className="w-6 h-6 text-brand-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
        </span>
      </button>
      <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-screen' : 'max-h-0'}`}>
        <p className="p-4 pt-0 text-slate-600 dark:text-slate-300">{answer}</p>
      </div>
    </div>
  );
};

const FaqPage: React.FC = () => {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    const handleClick = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

  return (
    <div className="max-w-3xl mx-auto animate-fade-in">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white">Frequently Asked Questions</h2>
        <p className="mt-2 text-lg text-slate-600 dark:text-slate-300">Find answers to common questions about ColorizePro.</p>
      </div>
      <div className="bg-white dark:bg-slate-800 p-4 sm:p-8 rounded-lg shadow-md">
        {faqs.map((faq, index) => (
          <FaqItem
            key={index}
            question={faq.question}
            answer={faq.answer}
            isOpen={openIndex === index}
            onClick={() => handleClick(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default FaqPage;