import { useTranslation } from 'react-i18next';
import { Menu, X, Globe } from 'lucide-react';
import { useState } from 'react';

export default function Navbar() {
  const { t, i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  const toggleLanguage = () => {
    const newLang = i18n.language.startsWith('de') ? 'pl' : 'de';
    i18n.changeLanguage(newLang);
  };

  const currentLang = i18n.language.startsWith('de') ? 'DE' : 'PL';

  const navItems = [
    { key: 'home', href: '#home' },
    { key: 'story', href: '#story' },
    { key: 'updates', href: '#updates' },
    { key: 'map', href: '#map' },
    { key: 'faq', href: '#faq' },
    { key: 'rsvp', href: '#rsvp' },
  ];

  return (
    <nav className="fixed w-full bg-white/90 backdrop-blur-sm z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex-shrink-0 flex items-center">
            <span className="text-2xl font-serif text-stone-800">G & P</span>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <a
                key={item.key}
                href={item.href}
                className="text-stone-600 hover:text-stone-900 px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                {t(`nav.${item.key}`)}
              </a>
            ))}
            <button
              onClick={toggleLanguage}
              className="flex items-center space-x-1 text-stone-600 hover:text-stone-900 px-3 py-2 rounded-md text-sm font-medium"
            >
              <Globe size={18} />
              <span>{currentLang}</span>
            </button>
          </div>

          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-stone-600 hover:text-stone-900 p-2"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-white border-t border-stone-200">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navItems.map((item) => (
              <a
                key={item.key}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className="block text-stone-600 hover:text-stone-900 hover:bg-stone-50 px-3 py-2 rounded-md text-base font-medium"
              >
                {t(`nav.${item.key}`)}
              </a>
            ))}
            <button
              onClick={() => {
                toggleLanguage();
                setIsOpen(false);
              }}
              className="w-full text-left flex items-center space-x-2 text-stone-600 hover:text-stone-900 hover:bg-stone-50 px-3 py-2 rounded-md text-base font-medium"
            >
              <Globe size={18} />
              <span>{currentLang === 'DE' ? 'Polski' : 'Deutsch'}</span>
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
