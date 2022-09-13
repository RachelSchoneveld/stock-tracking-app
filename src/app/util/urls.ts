export const insiderSentimentUrl = (symbol: string, startDate: string, endDate: string) => `/stock/insider-sentiment?symbol=${symbol}&from=${startDate}&to=${endDate}`;
export const realTimeQuoteUrl = (symbol : string) => `/quote?symbol=${symbol}`;
