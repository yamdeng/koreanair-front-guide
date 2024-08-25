export const formatFileSize = (bytes) => {
  if (bytes === 0) return '0 KB';

  const kb = bytes / 1024;
  const roundedKb = Math.floor(kb); // 소수점 이하를 제거합니다.
  const formattedSize = roundedKb.toLocaleString(); // 천 단위 구분 기호를 추가합니다.

  return `${formattedSize} KB`;
};

export const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const pickupOptionsLanguage = (dataObject, language) => {
  return dataObject.map((item) => ({
    key: item.key,
    text: item.text[language] || item.text.en, // Fallback to English if language not available
  }));
};
