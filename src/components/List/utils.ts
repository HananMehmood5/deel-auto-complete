export const getStatusText = (error: string = '', loading: boolean, products: number, query: string): string => {
  let text = '';
  if (loading) {
    text = 'Loading...';
  } else if (error) {
    text = error;
  } else if ((products === 0) && query.length > 0) {
    text = `No results found for the query "${query}". Try "Gloves"? 🤔`;
  }

  return text;
};
