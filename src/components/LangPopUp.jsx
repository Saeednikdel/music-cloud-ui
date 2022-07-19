import React, { useState } from 'react';
import translate from '../translate';
import BtnPrimary from './BtnPrimary';
const LangPopUp = () => {
  const [lang, setlLang] = useState(
    localStorage.getItem('lang') ? localStorage.getItem('lang') : 'en'
  );

  const langList = [
    { title: translate('English'), value: 'en' },
    { title: translate('Farsi'), value: 'fa' },
    { title: translate('Kurdi kurmanji'), value: 'ku' },
    { title: translate('Kurdi sorani'), value: 'so' },
  ];
  const handleLangChange = () => {
    localStorage.setItem('lang', lang);
    switch (lang) {
      case 'en':
      case 'ku':
        localStorage.setItem('direction', 'ltr');
        break;
      case 'fa':
      case 'so':
        localStorage.setItem('direction', 'rtl');
        break;
    }
    document.location.reload();
  };
  return (
    <div className="flex flex-col items-center text-gray-900 dark:text-white">
      <label for="genre" class="block mb-2 text-sm font-medium">
        {translate('choose language')}
      </label>
      <select
        value={lang}
        onChange={(e) => setlLang(e.target.value)}
        id="genre"
        name="genre"
        class="bg-gray-100 dark:bg-slate-800 border mb-3 border-gray-300  text-sm rounded block w-full p-2.5 dark:border-gray-500 dark:placeholder-gray-400 ">
        {langList.map((item) => (
          <option value={item.value}>{item.title}</option>
        ))}
      </select>
      <BtnPrimary onClick={handleLangChange}>{translate('ok')}</BtnPrimary>
    </div>
  );
};

export default LangPopUp;
