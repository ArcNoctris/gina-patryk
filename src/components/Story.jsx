import { useTranslation } from 'react-i18next';
import { Heart } from 'lucide-react';

export default function Story() {
  const { t } = useTranslation();

  return (
    <section id="story" className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <Heart className="w-8 h-8 text-stone-400 mx-auto mb-6" />
        <img
          src="https://firebasestorage.googleapis.com/v0/b/yugioh-local-tools.appspot.com/o/Gemini_Generated_Image_kweeufkweeufkwee.png?alt=media&token=d380fe1c-5b27-4195-9781-3c9d637ad7bf"
          alt="Wedding background"
          className="w-full h-full object-cover opacity-50"
        />
        <h2 className="text-3xl font-serif text-stone-800 mb-8">{t('story.title')}</h2>
        <p className="text-lg text-stone-600 leading-relaxed max-w-2xl mx-auto">
          {t('story.text')}
        </p>
      </div>
    </section>
  );
}
