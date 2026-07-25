import { Fragment } from 'react';
import { useTranslation } from 'react-i18next';
import { Bell } from 'lucide-react';

const INLINE_PATTERN = /\[([^\]]+)\]\(([^)]+)\)|\*\*([^*]+)\*\*|\*([^*]+)\*/g;

function formatInline(text, keyPrefix) {
  const nodes = [];
  let lastIndex = 0;
  let match;
  let idx = 0;

  INLINE_PATTERN.lastIndex = 0;
  while ((match = INLINE_PATTERN.exec(text)) !== null) {
    if (match.index > lastIndex) {
      nodes.push(text.slice(lastIndex, match.index));
    }
    if (match[1] !== undefined) {
      nodes.push(
        <a
          key={`${keyPrefix}-${idx++}`}
          href={match[2]}
          target="_blank"
          rel="noopener noreferrer"
          className="text-vintage underline hover:text-gold transition-colors"
        >
          {match[1]}
        </a>
      );
    } else if (match[3] !== undefined) {
      nodes.push(
        <strong key={`${keyPrefix}-${idx++}`} className="font-semibold text-vintage">
          {match[3]}
        </strong>
      );
    } else {
      nodes.push(<em key={`${keyPrefix}-${idx++}`}>{match[4]}</em>);
    }
    lastIndex = INLINE_PATTERN.lastIndex;
  }
  if (lastIndex < text.length) {
    nodes.push(text.slice(lastIndex));
  }
  return nodes;
}

function formatUpdateText(text, keyPrefix) {
  return text.split(/\n\n+/).map((paragraph, pIdx) => {
    const lines = paragraph.split('\n');
    return (
      <p key={`${keyPrefix}-p${pIdx}`} className="mb-3 last:mb-0">
        {lines.map((line, lIdx) => (
          <Fragment key={`${keyPrefix}-p${pIdx}-l${lIdx}`}>
            {lIdx > 0 && <br />}
            {formatInline(line, `${keyPrefix}-p${pIdx}-l${lIdx}`)}
          </Fragment>
        ))}
      </p>
    );
  });
}

export default function Updates() {
  const { t } = useTranslation();

  return (
    <section id="updates" className="py-20 bg-porcelan">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-serif text-vintage mb-4">{t('updates.title')}</h2>
        </div>
        
        <div className="space-y-6">
          {(t('updates.list', { returnObjects: true }) || []).map((update, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-gold">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-xl font-medium text-vintage">{update.title}</h3>
                <span className="text-sm text-stone-500 bg-almond/30 px-2 py-1 rounded">{update.date}</span>
              </div>
              <div className="text-stone-600">{formatUpdateText(update.text, `update-${index}`)}</div>
              {update.colors && (
                <div className="mt-4 flex flex-wrap gap-4">
                  {update.colors.map((color, cIdx) => (
                    <div key={cIdx} className="flex flex-col items-center gap-2">
                      <div 
                        className="w-12 h-12 rounded-full shadow-md border border-stone-200"
                        style={{ backgroundColor: color.hex }}
                        title={color.name}
                      />
                      <span className="text-xs text-stone-500 font-medium">{color.name}</span>
                    </div>
                  ))}
                </div>
              )}
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
