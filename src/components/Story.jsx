import { useTranslation } from 'react-i18next';
import { Heart } from 'lucide-react';

export default function Story() {
  const { t } = useTranslation();

  return (
    <section id="story" className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <Heart className="w-8 h-8 text-gold mx-auto mb-6" />
        <img
        
          src="https://firebasestorage.googleapis.com/v0/b/yugioh-local-tools.appspot.com/o/PXL_20250808_114759054.jpg?alt=media&token=330a9042-3f75-464e-ab0f-d31e6e986811"
          alt="Gina & Patryk"
          className="w-full h-auto object-cover rounded-lg shadow-md mb-8 border-2 border-almond/30"
        />
        <h2 className="text-3xl font-serif text-vintage mb-8">{t('story.title')}</h2>
        <p className="text-lg text-stone-600 leading-relaxed max-w-2xl mx-auto">
          {t('story.text')}
        </p>
      </div>
    </section>
  );
}
