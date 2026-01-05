import { useTranslation } from 'react-i18next';
import { useState, useEffect } from 'react';

export default function RSVP() {
  const { t } = useTranslation();
  const [submitted, setSubmitted] = useState(false);
  const [guestCount, setGuestCount] = useState(1);
  const [guestData, setGuestData] = useState([{ name: '', diet: 'none' }]);
  const [message, setMessage] = useState('');

  // Update guestData array when guestCount changes
  useEffect(() => {
    setGuestData(prevData => {
      const newData = [...prevData];
      if (guestCount > prevData.length) {
        // Add new guests
        for (let i = prevData.length; i < guestCount; i++) {
          newData.push({ name: '', diet: 'none' });
        }
      } else {
        // Remove guests
        newData.splice(guestCount);
      }
      return newData;
    });
  }, [guestCount]);

  const handleGuestChange = (index, field, value) => {
    const newGuestData = [...guestData];
    newGuestData[index][field] = value;
    setGuestData(newGuestData);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ guestCount, guestData, message });
    // In a real app, send data to backend
    setSubmitted(true);
  };

  const dietOptions = [
    { value: 'none', label: t('rsvp.dietOptions.none') },
    { value: 'vegetarian', label: t('rsvp.dietOptions.vegetarian') },
    { value: 'vegan', label: t('rsvp.dietOptions.vegan') },
    { value: 'glutenFree', label: t('rsvp.dietOptions.glutenFree') },
    { value: 'lactoseFree', label: t('rsvp.dietOptions.lactoseFree') },
    { value: 'other', label: t('rsvp.dietOptions.other') },
  ];

  return (
    <section id="rsvp" className="py-20 bg-stone-50">
      <div className="max-w-xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-serif text-stone-800 mb-4">{t('rsvp.title')}</h2>
        </div>

        {submitted ? (
          <div className="bg-green-50 text-green-800 p-8 rounded-lg text-center shadow-sm">
            <p className="text-xl font-medium">{t('rsvp.success')}</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6 bg-white p-8 rounded-lg shadow-sm">
            
            <div>
              <label htmlFor="guests" className="block text-sm font-medium text-stone-700 mb-1">
                {t('rsvp.guests')}
              </label>
              <select
                id="guests"
                value={guestCount}
                onChange={(e) => setGuestCount(parseInt(e.target.value))}
                className="w-full px-3 py-2 border border-stone-300 rounded-md focus:outline-none focus:ring-2 focus:ring-stone-500 bg-white"
              >
                {[1, 2, 3, 4, 5, 6].map(num => (
                  <option key={num} value={num}>{num}</option>
                ))}
              </select>
            </div>

            <div className="space-y-4">
              {guestData.map((guest, index) => (
                <div key={index} className="p-4 bg-stone-50 rounded-md border border-stone-200">
                  <h4 className="font-medium text-stone-800 mb-3">
                    {index === 0 ? t('rsvp.name') : `${t('rsvp.guestName')} ${index + 1}`}
                  </h4>
                  <div className="space-y-3">
                    <div>
                      <input
                        type="text"
                        placeholder={t('rsvp.name')}
                        required
                        value={guest.name}
                        onChange={(e) => handleGuestChange(index, 'name', e.target.value)}
                        className="w-full px-3 py-2 border border-stone-300 rounded-md focus:outline-none focus:ring-2 focus:ring-stone-500 bg-white"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-stone-500 mb-1">
                        {t('rsvp.diet')}
                      </label>
                      <select
                        value={guest.diet}
                        onChange={(e) => handleGuestChange(index, 'diet', e.target.value)}
                        className="w-full px-3 py-2 border border-stone-300 rounded-md focus:outline-none focus:ring-2 focus:ring-stone-500 bg-white text-sm"
                      >
                        {dietOptions.map(option => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-stone-700 mb-1">
                {t('rsvp.message')}
              </label>
              <textarea
                id="message"
                rows="4"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full px-3 py-2 border border-stone-300 rounded-md focus:outline-none focus:ring-2 focus:ring-stone-500 bg-white"
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full bg-stone-800 text-white py-3 px-4 rounded-md hover:bg-stone-700 transition-colors font-medium"
            >
              {t('rsvp.submit')}
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
