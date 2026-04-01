import { useTranslation } from 'react-i18next';
import { Bell } from 'lucide-react';

export default function Updates() {
  const { t } = useTranslation();

  return (
    <section id="updates" className="py-20 bg-porcelan">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-serif text-vintage mb-4">{t('updates.title')}</h2>
        </div>
        
        <div className="space-y-6">
          {(t('updates.list', { returnObjects: true }) || []).map((update, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-gold">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-xl font-medium text-vintage">{update.title}</h3>
                <span className="text-sm text-stone-500 bg-almond/30 px-2 py-1 rounded">{update.date}</span>
              </div>
              <p className="text-stone-600">{update.text}</p>
              {update.colors && (
                <div className="mt-4 flex flex-wrap gap-4">
                  {update.colors.map((color, cIdx) => (
                    <div key={cIdx} className="flex flex-col items-center gap-2">
                      <div 
                        className="w-12 h-12 rounded-full shadow-md border border-stone-200"
                        style={{ backgroundColor: color.hex }}
                        title={color.name}
                      />
                      <span className="text-xs text-stone-500 font-medium">{color.name}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
          {(!t('updates.list', { returnObjects: true }) || t('updates.list', { returnObjects: true }).length === 0) && (
            <div className="bg-white p-8 rounded-lg shadow-sm text-center">
              <Bell className="w-12 h-12 text-stone-300 mx-auto mb-4" />
              <p className="text-stone-600">{t('updates.noUpdates')}</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
