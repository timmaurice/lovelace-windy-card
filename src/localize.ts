import { HomeAssistant } from './types';

import ca from './translation/ca.json';
import de from './translation/de.json';
import en from './translation/en.json';
import es from './translation/es.json';
import fr from './translation/fr.json';
import it from './translation/it.json';
import nl from './translation/nl.json';
import zh_Hans from './translation/zh-Hans.json';
import zh_Hant from './translation/zh-Hant.json';

const translations = {
  ca,
  de,
  en,
  es,
  fr,
  it,
  nl,
  'zh-Hans': zh_Hans,
  'zh-CN': zh_Hans,
  zh: zh_Hans,
  'zh-Hant': zh_Hant,
  'zh-TW': zh_Hant,
  'zh-HK': zh_Hant,
};

interface TranslationObject {
  [key: string]: string | TranslationObject;
}

const typedTranslations: { [key: string]: TranslationObject } = translations;

function _getTranslation(language: string, keys: string[]): string | undefined {
  let translation: string | TranslationObject | undefined = typedTranslations[language];
  for (const key of keys) {
    if (typeof translation !== 'object' || translation === null) {
      return undefined;
    }
    translation = translation[key];
  }
  return typeof translation === 'string' ? translation : undefined;
}

export function localize(
  hass: HomeAssistant | undefined,
  key: string,
  placeholders: Record<string, string | number> = {},
): string {
  const lang = hass?.language || 'en';
  const translationKey = key.replace('component.windy-card.', '');
  const keyParts = translationKey.split('.');

  const translation = _getTranslation(lang, keyParts) ?? _getTranslation('en', keyParts);

  if (typeof translation === 'string') {
    let finalString = translation;
    for (const placeholder in placeholders) {
      finalString = finalString.replace(`{${placeholder}}`, String(placeholders[placeholder]));
    }
    return finalString;
  }

  return key;
}
