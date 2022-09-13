export const insiderSentimentUrl = (symbol: string, startDate: string, endDate: string) => `/api/stock/insider-sentiment?symbol=${symbol}&from=${startDate}&to=${endDate}`;
export const realTimeQuoteUrl = (symbol : string) => `/api/quote?symbol=${symbol}`;
