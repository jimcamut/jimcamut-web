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
    // console.log(e);
    return [];
  }
};

export const getURLParamsValue = key => {
  const urlParams = getURLParams() || [];
  return ((urlParams || []).find(it => it && it.key === key) || {}).value;
};

export const dataNeedsReset = (data, daysAgo) => {
  const now = new Date();
  const hasRecentData =
    data.data &&
    data.data.length &&
    data.fetched &&
    new Date(data.fetched).getTime() >
      new Date(now).setDate(now.getDate() - daysAgo);

  return !hasRecentData;
};
