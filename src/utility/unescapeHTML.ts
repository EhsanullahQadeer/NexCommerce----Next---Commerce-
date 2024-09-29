const unescapeHTML = (html: string): string => {
    const doc = new DOMParser().parseFromString(html, 'text/html');
    return doc.documentElement.textContent || "";
  };
  
  export default unescapeHTML;
  