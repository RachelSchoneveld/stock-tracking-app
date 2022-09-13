export const insiderSentimentUrl = (symbol: string, startDate: string, endDate: string) => `https://finnhub.io/api/v1/stock/insider-sentiment?symbol=${symbol}&from=${startDate}&to=${endDate}`;
export const realTimeQuoteUrl = (symbol : string) => `https://finnhub.io/api/v1/quote?symbol=${symbol}`;
