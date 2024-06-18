import { ServerRespond } from './DataStreamer';

export interface Row {
  ratio: number,
  upper_bound: number,
  lower_bound: number,
  trigger_alert: number,
  price_abc: number,
  price_def: number,
  timestamp: Date,
}

export class DataManipulator {
  static generateRow(serverResponds: ServerRespond[]): Row {
    const price_abc = serverResponds[0].top_ask && serverResponds[0].top_ask.price || 0;
    const price_def = serverResponds[1].top_ask && serverResponds[1].top_ask.price || 0;

    const ratio = price_abc && price_def ? price_abc / price_def : 0;
    const upper_bound = 1.1;
    const lower_bound = 0.99;
    const trigger_alert = ratio > upper_bound || ratio < lower_bound ? ratio : NaN;

    return {
      ratio,
      upper_bound,
      lower_bound,
      trigger_alert,
      price_abc,
      price_def,
      timestamp: serverResponds[0].timestamp > serverResponds[1].timestamp ?
        serverResponds[0].timestamp : serverResponds[1].timestamp,
    };
  }
}
