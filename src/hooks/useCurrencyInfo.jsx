import { useEffect, useState } from "react";
import { ArrowUpDown, TrendingUp, DollarSign } from 'lucide-react';

function useCurrencyInfo(currency) {

  const rates = {
  usd: { inr: 86.8, eur: 0.91, gbp: 0.78, jpy: 155.2, cad: 1.36, aud: 1.49, chf: 0.87, cny: 7.15 },
  inr: { usd: 0.0115, eur: 0.0091, gbp: 0.0086, jpy: 1.72, cad: 0.0158, aud: 0.0172, chf: 0.0101, cny: 0.082 },
  eur: { usd: 1.10, inr: 100.4, gbp: 0.86, jpy: 170.4, cad: 1.49, aud: 1.64, chf: 0.96, cny: 7.85 },
  gbp: { usd: 1.28, inr: 115.9, eur: 1.16, jpy: 198.5, cad: 1.73, aud: 1.91, chf: 1.11, cny: 9.11 },
  jpy: { usd: 0.0064, inr: 0.58, eur: 0.0059, gbp: 0.0050, cad: 0.0087, aud: 0.0096, chf: 0.0056, cny: 0.046 },
  cad: { usd: 0.74, inr: 63.2, eur: 0.67, gbp: 0.58, jpy: 114.6, aud: 1.10, chf: 0.64, cny: 5.29 },
  aud: { usd: 0.67, inr: 58.5, eur: 0.61, gbp: 0.52, jpy: 104.4, cad: 0.91, chf: 0.58, cny: 4.79 },
  chf: { usd: 1.15, inr: 99.7, eur: 1.04, gbp: 0.90, jpy: 185.4, cad: 1.56, aud: 1.73, cny: 8.18 },
  cny: { usd: 0.14, inr: 12.2, eur: 0.127, gbp: 0.11, jpy: 22.7, cad: 0.19, aud: 0.21, chf: 0.12 }
};

// Get all available currencies
  const allCurrencies = ['usd', 'inr', 'eur', 'gbp', 'jpy', 'cad', 'aud', 'chf', 'cny'];
  
  // Get the rates for the selected currency and add the base currency with value 1
  const getCurrencyData = (baseCurrency) => {
    const currencyRates = rates[baseCurrency] || {};
    
    // Create object with all currencies, base currency = 1, others from rates
    const allRates = {};
    allCurrencies.forEach(curr => {
      if (curr === baseCurrency) {
        allRates[curr] = 1;
      } else {
        allRates[curr] = currencyRates[curr] || 0;
      }
    });
    
    return allRates;
  };

  return {
    data: getCurrencyData(currency),
    loading: false,
    error: null
  };
}

export default useCurrencyInfo;