import { useTranslation } from 'react-i18next';
import { Heart } from 'lucide-react';

export default function Story() {
  const { t } = useTranslation();

  return (
    <section id="story" className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <Heart className="w-8 h-8 text-gold mx-auto mb-6" />
        <img
        
          src="https://pub-c6e00ea4235c487e8d8c0300d2819303.r2.dev/gph/dpr%3D1%2Cfit%3Dcover%2Cg%3Dface%2Cw%3D640%2Ch%3D480.avif"
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
