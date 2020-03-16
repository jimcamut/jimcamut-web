export const getURLParams = () => {
  try {
    return (window.location.search || '')
      .replace(/^\?/, '')
      .split('&')
      .map(it => {
        if (it) {
          const data = it.split('=');
          if (data && data.length) return { key: data[0], value: data[1] };
        }
        return undefined;
      })
      .filter(it => it);
  } catch (e) {
    console.log(e);
    return [];
  }
};
