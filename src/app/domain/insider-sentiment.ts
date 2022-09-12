import {Stock} from "./stock";

export interface InsiderSentiment {
  data: Stock[],
  symbol: string
}
