import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

export default function BilingualText({ en, ar }) {
  const { language } = useLanguage();
  return <>{language === 'ar' && ar ? ar : en}</>;
}
