const unescapeHTML = (html: string): string => {
  let doc = new DOMParser().parseFromString(html, 'text/html');
  let decodedString = doc.documentElement.textContent || "";

  // Recursively decode if the string still contains HTML entities
  while (decodedString !== html) {
    html = decodedString;
    doc = new DOMParser().parseFromString(html, 'text/html');
    decodedString = doc.documentElement.textContent || "";
  }

  return decodedString;
};

export default unescapeHTML;
