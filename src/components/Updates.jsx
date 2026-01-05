import { useTranslation } from 'react-i18next';
import { Bell } from 'lucide-react';

export default function Updates() {
  const { t } = useTranslation();

  return (
    <section id="updates" className="py-20 bg-stone-50">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-serif text-stone-800 mb-4">{t('updates.title')}</h2>
        </div>
        
        <div className="space-y-6">
          {(t('updates.list', { returnObjects: true }) || []).map((update, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-stone-800">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-xl font-medium text-stone-800">{update.title}</h3>
                <span className="text-sm text-stone-500 bg-stone-100 px-2 py-1 rounded">{update.date}</span>
              </div>
              <p className="text-stone-600">{update.text}</p>
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
