import fa from './assets/fa';
import so from './assets/so';
import ku from './assets/ku';
export default function translate(text) {
  let lang = localStorage.getItem('lang') ? localStorage.getItem('lang') : 'en';
  localStorage.getItem('lang') == null && localStorage.setItem('lang', 'en');

  switch (lang) {
    case 'fa':
      return fa[text];
    case 'so':
      return so[text];
    case 'ku':
      return ku[text];
    case 'en':
      return text;
    default:
      return text;
  }
}
