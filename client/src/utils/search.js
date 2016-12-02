const numKeywordsInItem = (item, keywords) => {
  const itemString = Object.values(item).join(' ').toLowerCase();

  return keywords.reduce((acc, keyword) => itemString.indexOf(keyword) >= 0 ? acc + 1 : acc, 0);
};
const compareItemsByKeywordCount = (keywords, item1, item2) =>
  numKeywordsInItem(item1, keywords) > numKeywordsInItem(item2, keywords) ? -1 : 1;

export const searchById = (byId, query) => {
  const keywords = query.split(' ').filter(keyword => keyword).map(keyword => keyword.toLowerCase());
  const items = Object.keys(byId).map(id => ({ id: parseInt(id, 10), ...byId[id] }));

  return query.length === 0
    ? items
    : items.sort(compareItemsByKeywordCount.bind(null, keywords)).filter(item => numKeywordsInItem(item, keywords) > 0);
};
