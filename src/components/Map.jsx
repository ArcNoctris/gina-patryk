import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { useTranslation } from 'react-i18next';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default marker icon in React Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

export default function Map() {
  const { t } = useTranslation();
  const position = [49.64130672524696, 8.361853907920278]; // Kapelle Worms

  return (
    <section id="map" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-serif text-stone-800 mb-4">{t('map.title')}</h2>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="h-[400px] rounded-lg overflow-hidden shadow-md z-0">
            <MapContainer center={position} zoom={13} style={{ height: '100%', width: '100%' }}>
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <Marker position={position}>
                <Popup>
                  Wedding Location <br /> Worms
                </Popup>
              </Marker>
            </MapContainer>
          </div>

          <div className="space-y-6">
            <div className="bg-stone-50 p-6 rounded-lg">
              <h3 className="font-serif text-xl mb-4 text-stone-800">{t('map.hotel')} 1</h3>
              <p className="text-stone-600 mb-2">Dormero Hotel Worms</p>
              <p className="text-sm text-stone-500">Prinz-Carl-Anlage 10, 67547 Worms</p>
              <a href="https://www.dormero.de/hotel-worms/" className="text-stone-800 underline text-sm mt-2 inline-block" target='_blank'>Website</a>
            </div>
            
            <div className="bg-stone-50 p-6 rounded-lg">
              <h3 className="font-serif text-xl mb-4 text-stone-800">{t('map.hotel')} 2</h3>
              <p className="text-stone-600 mb-2">Boutique Hotel</p>
              <p className="text-sm text-stone-500">Beispielweg 5, 10119 Berlin</p>
              <a href="#" className="text-stone-800 underline text-sm mt-2 inline-block">Website</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
