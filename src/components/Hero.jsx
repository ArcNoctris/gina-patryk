import { useTranslation } from 'react-i18next';

export default function Hero() {
  const { t } = useTranslation();

  return (
    <div id="home" className="relative h-screen flex items-center justify-center bg-porcelan overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img 
          src="https://pub-c6e00ea4235c487e8d8c0300d2819303.r2.dev/gph/Gemini_Generated_Image_kweeufkweeufkwee.png" 
          alt="Wedding background" 
          className="w-full h-full object-cover opacity-50"
        />
        <div className="absolute inset-0 bg-stone-900/10"></div>
      </div>
      
      <div className="relative z-10 text-center px-4">
        <h1 className="text-5xl md:text-7xl font-serif text-vintage mb-6 drop-shadow-sm">
          {t('hero.title')}
        </h1>
        <div className="text-xl md:text-2xl font-light text-stone-800 space-y-2 font-serif">
          <p>{t('hero.date')}</p>
          <div className="w-16 h-px bg-gold mx-auto my-4"></div>
          <p>{t('hero.location')}</p>
        </div>
      </div>
    </div>
  );
}
