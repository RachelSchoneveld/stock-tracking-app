export const insiderSentimentUrl = (symbol: string, startDate: string, endDate: string) => `https://finnhub.io/docs/api/insider-sentiment?symbol=${symbol}&from=${startDate}&to=${endDate}`;
export const realTimeQuoteUrl = (symbol : string) => `https://finnhub.io/docs/api/quote?symbol=${symbol}`;
