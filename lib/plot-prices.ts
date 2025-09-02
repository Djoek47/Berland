// Fixed prices for Faberplots (AI-chosen based on location, size, and features)
// These prices are between $40-$80 and will remain consistent

export const FABERPLOT_PRICES: { [key: number]: number } = {
  // Small plots (1-15) - High traffic areas, retail ready
  1: 65,   // Market District - High foot traffic
  2: 58,   // Business District - Corporate area
  3: 72,   // Arts District - Creative hub
  4: 55,   // Entertainment District - Nightlife
  5: 68,   // Central District - Prime location
  6: 62,   // Market District - Retail zone
  7: 59,   // Business District - Office area
  8: 75,   // Arts District - Gallery space
  9: 53,   // Entertainment District - Bar district
  10: 70,  // Central District - Main square
  11: 64,  // Market District - Shopping area
  12: 57,  // Business District - Professional
  13: 73,  // Arts District - Studio space
  14: 56,  // Entertainment District - Restaurant row
  15: 69,  // Central District - Tourist area

  // Medium plots (16-30) - Corporate ready, meeting spaces
  16: 78,  // Market District - Large retail
  17: 71,  // Business District - Conference center
  18: 80,  // Arts District - Exhibition hall
  19: 67,  // Entertainment District - Event venue
  20: 76,  // Central District - Business hub
  21: 74,  // Market District - Shopping center
  22: 79,  // Business District - Corporate HQ
  23: 81,  // Arts District - Performance space
  24: 66,  // Entertainment District - Concert hall
  25: 77,  // Central District - Convention center
  26: 72,  // Market District - Mall space
  27: 75,  // Business District - Executive suite
  28: 82,  // Arts District - Theater
  29: 65,  // Entertainment District - Club venue
  30: 78,  // Central District - Business plaza

  // Large plots (31-47) - Event space, premium location
  31: 85,  // Market District - Mega mall
  32: 88,  // Business District - Skyscraper
  33: 90,  // Arts District - Cultural center
  34: 83,  // Entertainment District - Arena
  35: 87,  // Central District - City center
  36: 84,  // Market District - Superstore
  37: 89,  // Business District - Corporate campus
  38: 92,  // Arts District - Museum complex
  39: 82,  // Entertainment District - Stadium
  40: 86,  // Central District - Government plaza
  41: 85,  // Market District - Shopping district
  42: 88,  // Business District - Financial center
  43: 91,  // Arts District - Creative campus
  44: 84,  // Entertainment District - Entertainment complex
  45: 87,  // Central District - Civic center
  46: 83,  // Market District - Retail park
  47: 89,  // Central District - Premium location
  
  // Premium plot (48) - Ultimate location, flagship property
  48: 95   // Central District - Metaverse Flagship
}

// Function to get price for a specific plot
export function getFaberplotPrice(plotId: number): number {
  return FABERPLOT_PRICES[plotId] || 60 // Default to $60 if not found
}

// Function to get all prices
export function getAllFaberplotPrices(): { [key: number]: number } {
  return FABERPLOT_PRICES
}
