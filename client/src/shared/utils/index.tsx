export const getKeyFromEnum = (en: Object) => {
  return Object.keys(en).filter((key) => isNaN(Number(key)));
};

export const handleImageUrl = (url: string) =>
  url ? (!url.startsWith('http://localhost:3000') ? 'http://localhost:3000' + url : url) : '';

export const dataURItoBlob = (dataURI: string) => {
  // convert base64/URLEncoded data component to raw binary data held in a string
  var byteString;
  if (dataURI.split(',')[0].indexOf('base64') >= 0) byteString = atob(dataURI.split(',')[1]);
  else byteString = unescape(dataURI.split(',')[1]);

  // separate out the mime component
  var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

  // write the bytes of the string to a typed array
  var ia = new Uint8Array(byteString.length);
  for (var i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }

  return new Blob([ia], { type: mimeString });
};

export const getYearFromDate = (date: string | Date) =>
  date ? new Date(date).getFullYear() : null;

export const getRuntimeText = (runtime: string | number) => {
  if (!runtime) return null;
  const runtimeNumber = Number(runtime);
  const hours = Math.floor(runtimeNumber / 60);
  const minutes = runtimeNumber - hours * 60;
  const hoursText = hours ? hours + 'h' : '';
  const minutesText = minutes ? minutes + 'm' : '';
  return hoursText + (hours ? ' ' : '') + minutesText;
};
