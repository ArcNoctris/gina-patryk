import { useTranslation } from 'react-i18next';

export default function Hero() {
  const { t } = useTranslation();

  return (
    <div id="home" className="relative h-screen flex items-center justify-center bg-stone-100 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img 
          src="https://firebasestorage.googleapis.com/v0/b/yugioh-local-tools.appspot.com/o/Gemini_Generated_Image_kweeufkweeufkwee.png?alt=media&token=d380fe1c-5b27-4195-9781-3c9d637ad7bf" 
          alt="Wedding background" 
          className="w-full h-full object-cover opacity-50"
        />
        <div className="absolute inset-0 bg-stone-900/10"></div>
      </div>
      
      <div className="relative z-10 text-center px-4">
        <h1 className="text-5xl md:text-7xl font-serif text-stone-800 mb-6 drop-shadow-sm">
          {t('hero.title')}
        </h1>
        <div className="text-xl md:text-2xl font-light text-stone-800 space-y-2 font-serif">
          <p>{t('hero.date')}</p>
          <div className="w-16 h-px bg-stone-800 mx-auto my-4"></div>
          <p>{t('hero.location')}</p>
        </div>
      </div>
    </div>
  );
}
