import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

export default function FAQ() {
  const { t } = useTranslation();
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-20 bg-white">
      <div className="max-w-3xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-serif text-stone-800 mb-4">{t('faq.title')}</h2>
        </div>

        <div className="space-y-4">
          {(t('faq.list', { returnObjects: true }) || []).map((faq, index) => (
            <div 
              key={index} 
              className="border border-stone-200 rounded-lg overflow-hidden transition-all duration-200"
            >
              <button
                className="w-full flex justify-between items-center p-4 bg-stone-50 hover:bg-stone-100 transition-colors text-left"
                onClick={() => toggleFAQ(index)}
              >
                <span className="font-medium text-stone-800 pr-4">{faq.question}</span>
                {openIndex === index ? (
                  <ChevronUp className="w-5 h-5 text-stone-500 flex-shrink-0" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-stone-500 flex-shrink-0" />
                )}
              </button>
              
              {openIndex === index && (
                <div className="p-4 bg-white text-stone-600 border-t border-stone-100">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
