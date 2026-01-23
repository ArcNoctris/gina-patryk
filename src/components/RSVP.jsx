import { useTranslation } from 'react-i18next';
import { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

export default function RSVP() {
  const { t } = useTranslation();
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [guestCount, setGuestCount] = useState(1);
  const [guestNames, setGuestNames] = useState(['']);
  const [attendance, setAttendance] = useState('accept'); // Default to accept? Or null? Let's default to accept or make user choose. User didn't specify default. Let's make it null initially or default to accept. Let's default to 'accept' for positive vibes, or empty. The mockup usually suggests a choice. Let's use 'accept' as default for now to match common patterns, or keep it empty. Let's start with 'accept'.
  const [dietaryRestrictions, setDietaryRestrictions] = useState('');
  const [email, setEmail] = useState('');

  // Update guestNames array when guestCount changes
  useEffect(() => {
    setGuestNames(prevNames => {
      const newNames = [...prevNames];
      if (guestCount > prevNames.length) {
        // Add new guests
        for (let i = prevNames.length; i < guestCount; i++) {
          newNames.push('');
        }
      } else {
        // Remove guests
        newNames.splice(guestCount);
      }
      return newNames;
    });
  }, [guestCount]);

  const handleNameChange = (index, value) => {
    const newNames = [...guestNames];
    newNames[index] = value;
    setGuestNames(newNames);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await addDoc(collection(db, 'rsvps'), {
        guestCount,
        guestNames,
        attendance,
        dietaryRestrictions,
        email,
        timestamp: serverTimestamp(),
        userAgent: navigator.userAgent
      });
      setSubmitted(true);
    } catch (err) {
      console.error("Error adding document: ", err);
      setError(t('rsvp.error'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="rsvp" className="py-20 bg-stone-50">
      <div className="max-w-2xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-serif text-stone-800 mb-4">{t('rsvp.title')}</h2>
        </div>

        {submitted ? (
          <div className="bg-white p-12 rounded-xl shadow-lg text-center transform transition-all duration-500 ease-in-out">
            <div className="mb-6 text-green-600">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-2xl font-serif text-stone-800 mb-2">{t('rsvp.successMessage')}</h3>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="bg-white p-8 md:p-10 rounded-xl shadow-lg space-y-8">
            
            {/* Guest Count */}
            <div>
              <label htmlFor="guestCount" className="block text-sm font-medium text-stone-600 mb-2 uppercase tracking-wide">
                {t('rsvp.guestsLabel')}
              </label>
              <select
                id="guestCount"
                value={guestCount}
                onChange={(e) => setGuestCount(parseInt(e.target.value))}
                className="w-full px-4 py-3 border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-stone-400 bg-stone-50 transition-colors"
              >
                {[1, 2, 3, 4, 5].map(num => (
                  <option key={num} value={num}>{num}</option>
                ))}
              </select>
            </div>

            {/* Guest Names */}
            <div className="space-y-4">
              <label className="block text-sm font-medium text-stone-600 uppercase tracking-wide">
                {guestCount === 1 ? t('rsvp.nameLabel') : t('rsvp.nameLabel') + 's'}
              </label>
              {guestNames.map((name, index) => (
                <div key={index} className="relative">
                  <input
                    type="text"
                    placeholder={`${t('rsvp.nameLabel')} ${index + 1}`}
                    required
                    value={name}
                    onChange={(e) => handleNameChange(index, e.target.value)}
                    className="w-full px-4 py-3 border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-stone-400 bg-stone-50 transition-colors"
                  />
                </div>
              ))}
            </div>

            {/* Attendance Status */}
            <div>
              <label className="block text-sm font-medium text-stone-600 mb-3 uppercase tracking-wide">
                {t('rsvp.statusLabel')}
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <label className={`relative cursor-pointer p-4 rounded-lg border-2 transition-all duration-200 ${attendance === 'accept' ? 'border-stone-800 bg-stone-50' : 'border-stone-200 hover:border-stone-300'}`}>
                  <input
                    type="radio"
                    name="attendance"
                    value="accept"
                    checked={attendance === 'accept'}
                    onChange={() => setAttendance('accept')}
                    className="absolute opacity-0 w-full h-full top-0 left-0 cursor-pointer"
                  />
                  <div className="flex items-center space-x-3">
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${attendance === 'accept' ? 'border-stone-800' : 'border-stone-300'}`}>
                      {attendance === 'accept' && <div className="w-2.5 h-2.5 rounded-full bg-stone-800" />}
                    </div>
                    <span className="font-medium text-stone-800">{t('rsvp.statusAccept')}</span>
                  </div>
                </label>

                <label className={`relative cursor-pointer p-4 rounded-lg border-2 transition-all duration-200 ${attendance === 'decline' ? 'border-stone-800 bg-stone-50' : 'border-stone-200 hover:border-stone-300'}`}>
                  <input
                    type="radio"
                    name="attendance"
                    value="decline"
                    checked={attendance === 'decline'}
                    onChange={() => setAttendance('decline')}
                    className="absolute opacity-0 w-full h-full top-0 left-0 cursor-pointer"
                  />
                  <div className="flex items-center space-x-3">
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${attendance === 'decline' ? 'border-stone-800' : 'border-stone-300'}`}>
                      {attendance === 'decline' && <div className="w-2.5 h-2.5 rounded-full bg-stone-800" />}
                    </div>
                    <span className="font-medium text-stone-800">{t('rsvp.statusDecline')}</span>
                  </div>
                </label>
              </div>
            </div>

            {/* Diet & Allergies */}
            <div>
              <label htmlFor="diet" className="block text-sm font-medium text-stone-600 mb-2 uppercase tracking-wide">
                {t('rsvp.dietLabel')}
              </label>
              <textarea
                id="diet"
                rows="3"
                value={dietaryRestrictions}
                onChange={(e) => setDietaryRestrictions(e.target.value)}
                placeholder={t('rsvp.dietPlaceholder')}
                className="w-full px-4 py-3 border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-stone-400 bg-stone-50 transition-colors"
              ></textarea>
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-stone-600 mb-2 uppercase tracking-wide">
                {t('rsvp.emailLabel')}
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-stone-400 bg-stone-50 transition-colors"
              />
              <p className="mt-2 text-xs text-stone-500">{t('rsvp.emailHint')}</p>
            </div>

            {/* Error Message */}
            {error && (
              <div className="text-red-600 text-sm text-center">
                {error}
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-4 px-6 rounded-lg text-white font-medium text-lg shadow-md transition-all duration-200 transform hover:-translate-y-0.5
                ${loading ? 'bg-stone-400 cursor-not-allowed' : 'bg-stone-800 hover:bg-stone-700 hover:shadow-lg'}`}
            >
              {loading ? t('rsvp.submitLoading') : t('rsvp.submit')}
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
