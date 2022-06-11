interface DLArfcnCalcData {
  /**
   * Minimum downstream frequency for the band
   */
  dlFreqLow: number
  /**
   * Maximum downstream frequency for the band
   */
  dlFreqHigh: number
  /**
   * Offset for DL ARFCN
   */
  dlArfcnOffset: number
}

interface ULArfcnCalcData {
  ulFreqLow: number
  /**
   * Maximum upstream frequency for the band
   */
  ulFreqHigh: number
  /**
   * Offset for UL ARFCN
   */
  ulArfcnOffset: number
}

type ArfcnCalcData = DLArfcnCalcData | ULArfcnCalcData | (DLArfcnCalcData & ULArfcnCalcData)

export const earfcnCalcData: Record<number, ArfcnCalcData> = {
  1: {
    dlFreqLow: 2110,
    dlFreqHigh: 2170,
    ulFreqLow: 1920,
    ulFreqHigh: 1980,
    dlArfcnOffset: 0,
    ulArfcnOffset: 18000,
  },
  2: {
    dlFreqLow: 1930,
    dlFreqHigh: 1990,
    ulFreqLow: 1850,
    ulFreqHigh: 1910,
    dlArfcnOffset: 600,
    ulArfcnOffset: 18600,
  },
  3: {
    dlFreqLow: 1805,
    dlFreqHigh: 1880,
    ulFreqLow: 1710,
    ulFreqHigh: 1785,
    dlArfcnOffset: 1200,
    ulArfcnOffset: 19200,
  },
  4: {
    dlFreqLow: 2110,
    dlFreqHigh: 2155,
    ulFreqLow: 1710,
    ulFreqHigh: 1755,
    dlArfcnOffset: 1950,
    ulArfcnOffset: 19950,
  },
  5: {
    dlFreqLow: 869,
    dlFreqHigh: 894,
    ulFreqLow: 824,
    ulFreqHigh: 849,
    dlArfcnOffset: 2400,
    ulArfcnOffset: 20400,
  },
  7: {
    dlFreqLow: 2620,
    dlFreqHigh: 2690,
    ulFreqLow: 2500,
    ulFreqHigh: 2570,
    dlArfcnOffset: 2750,
    ulArfcnOffset: 20750,
  },
  8: {
    dlFreqLow: 925,
    dlFreqHigh: 960,
    ulFreqLow: 880,
    ulFreqHigh: 915,
    dlArfcnOffset: 3450,
    ulArfcnOffset: 21450,
  },
  11: {
    dlFreqLow: 1475.9,
    dlFreqHigh: 1495.9,
    ulFreqLow: 1427.9,
    ulFreqHigh: 1447.9,
    dlArfcnOffset: 4750,
    ulArfcnOffset: 22750,
  },
  12: {
    dlFreqLow: 728,
    dlFreqHigh: 746,
    ulFreqLow: 699,
    ulFreqHigh: 716,
    dlArfcnOffset: 5000,
    ulArfcnOffset: 23000,
  },
  13: {
    dlFreqLow: 746,
    dlFreqHigh: 756,
    ulFreqLow: 777,
    ulFreqHigh: 787,
    dlArfcnOffset: 5180,
    ulArfcnOffset: 23180,
  },
  14: {
    dlFreqLow: 758,
    dlFreqHigh: 768,
    ulFreqLow: 788,
    ulFreqHigh: 798,
    dlArfcnOffset: 5280,
    ulArfcnOffset: 23280,
  },
  17: {
    dlFreqLow: 734,
    dlFreqHigh: 746,
    ulFreqLow: 704,
    ulFreqHigh: 716,
    dlArfcnOffset: 5730,
    ulArfcnOffset: 23730,
  },
  18: {
    dlFreqLow: 860,
    dlFreqHigh: 875,
    ulFreqLow: 815,
    ulFreqHigh: 830,
    dlArfcnOffset: 5850,
    ulArfcnOffset: 23850,
  },
  19: {
    dlFreqLow: 875,
    dlFreqHigh: 890,
    ulFreqLow: 830,
    ulFreqHigh: 845,
    dlArfcnOffset: 6000,
    ulArfcnOffset: 24000,
  },
  20: {
    dlFreqLow: 791,
    dlFreqHigh: 821,
    ulFreqLow: 832,
    ulFreqHigh: 862,
    dlArfcnOffset: 6150,
    ulArfcnOffset: 24150,
  },
  21: {
    dlFreqLow: 1495.9,
    dlFreqHigh: 1510.9,
    ulFreqLow: 1447.9,
    ulFreqHigh: 1462.9,
    dlArfcnOffset: 6450,
    ulArfcnOffset: 24450,
  },
  22: {
    dlFreqLow: 3510,
    dlFreqHigh: 3590,
    ulFreqLow: 3410,
    ulFreqHigh: 3490,
    dlArfcnOffset: 6600,
    ulArfcnOffset: 24600,
  },
  24: {
    dlFreqLow: 1525,
    dlFreqHigh: 1559,
    ulFreqLow: 1626.5,
    ulFreqHigh: 1660.5,
    dlArfcnOffset: 7700,
    ulArfcnOffset: 25700,
  },
  25: {
    dlFreqLow: 1930,
    dlFreqHigh: 1995,
    ulFreqLow: 1850,
    ulFreqHigh: 1915,
    dlArfcnOffset: 8040,
    ulArfcnOffset: 26040,
  },
  26: {
    dlFreqLow: 859,
    dlFreqHigh: 894,
    ulFreqLow: 814,
    ulFreqHigh: 849,
    dlArfcnOffset: 8690,
    ulArfcnOffset: 26690,
  },
  27: {
    dlFreqLow: 852,
    dlFreqHigh: 869,
    ulFreqLow: 807,
    ulFreqHigh: 824,
    dlArfcnOffset: 9040,
    ulArfcnOffset: 27040,
  },
  28: {
    dlFreqLow: 758,
    dlFreqHigh: 809,
    ulFreqLow: 703,
    ulFreqHigh: 748,
    dlArfcnOffset: 9210,
    ulArfcnOffset: 27210,
  },
  29: {
    dlFreqLow: 717,
    dlFreqHigh: 728,
    dlArfcnOffset: 9210,
    ulArfcnOffset: 27210,
  },
  30: {
    dlFreqLow: 2350,
    dlFreqHigh: 2360,
    ulFreqLow: 2305,
    ulFreqHigh: 2315,
    dlArfcnOffset: 9770,
    ulArfcnOffset: 27660,
  },
  31: {
    dlFreqLow: 462.5,
    dlFreqHigh: 467.5,
    ulFreqLow: 452.5,
    ulFreqHigh: 457.5,
    dlArfcnOffset: 9870,
    ulArfcnOffset: 27760,
  },
  32: {
    dlFreqLow: 462.5,
    dlFreqHigh: 467.5,
    dlArfcnOffset: 9870,
  },
  33: {
    dlFreqLow: 1900,
    dlFreqHigh: 1920,
    dlArfcnOffset: 36000,
  },
  34: {
    dlFreqLow: 2010,
    dlFreqHigh: 2025,
    dlArfcnOffset: 36000,
  },
  35: {
    dlFreqLow: 1850,
    dlFreqHigh: 1910,
    dlArfcnOffset: 36350,
  },
  36: {
    dlFreqLow: 1930,
    dlFreqHigh: 1990,
    dlArfcnOffset: 36950,
  },
  37: {
    dlFreqLow: 1910,
    dlFreqHigh: 1930,
    dlArfcnOffset: 37550,
  },
  38: {
    dlFreqLow: 2570,
    dlFreqHigh: 2620,
    dlArfcnOffset: 37750,
  },
  39: {
    dlFreqLow: 1880,
    dlFreqHigh: 1920,
    dlArfcnOffset: 38250,
  },
  40: {
    dlFreqLow: 2300,
    dlFreqHigh: 2400,
    dlArfcnOffset: 38650,
  },
  41: {
    dlFreqLow: 2496,
    dlFreqHigh: 2690,
    dlArfcnOffset: 39650,
  },
  42: {
    dlFreqLow: 3400,
    dlFreqHigh: 3600,
    dlArfcnOffset: 41590,
  },
  43: {
    dlFreqLow: 3600,
    dlFreqHigh: 3800,
    dlArfcnOffset: 43590,
  },
  44: {
    dlFreqLow: 709,
    dlFreqHigh: 803,
    dlArfcnOffset: 45590,
  },
  45: {
    dlFreqLow: 1447,
    dlFreqHigh: 1467,
    dlArfcnOffset: 45590,
  },
  46: {
    dlFreqLow: 5150,
    dlFreqHigh: 5925,
    dlArfcnOffset: 46790,
  },
  47: {
    dlFreqLow: 5855,
    dlFreqHigh: 5925,
    dlArfcnOffset: 54540,
  },
  48: {
    dlFreqLow: 3550,
    dlFreqHigh: 3700,
    dlArfcnOffset: 55240,
  },
  49: {
    dlFreqLow: 3550,
    dlFreqHigh: 3700,
    dlArfcnOffset: 56740,
  },
  50: {
    dlFreqLow: 1432,
    dlFreqHigh: 1517,
    dlArfcnOffset: 58240,
  },
  51: {
    dlFreqLow: 1427,
    dlFreqHigh: 1432,
    dlArfcnOffset: 59090,
  },
  52: {
    dlFreqLow: 3300,
    dlFreqHigh: 3400,
    dlArfcnOffset: 59140,
  },
  53: {
    dlFreqLow: 2483.5,
    dlFreqHigh: 2495,
    dlArfcnOffset: 60140,
  },
  65: {
    dlFreqLow: 2110,
    dlFreqHigh: 2200,
    ulFreqLow: 1920,
    ulFreqHigh: 2010,
    dlArfcnOffset: 65536,
    ulArfcnOffset: 131972,
  },
  66: {
    dlFreqLow: 2110,
    dlFreqHigh: 2200,
    ulFreqLow: 1710,
    ulFreqHigh: 1780,
    dlArfcnOffset: 66436,
    ulArfcnOffset: 131972,
  },
  67: {
    dlFreqLow: 738,
    dlFreqHigh: 758,
    dlArfcnOffset: 67336,
  },
  68: {
    dlFreqLow: 753,
    dlFreqHigh: 783,
    ulFreqLow: 698,
    ulFreqHigh: 728,
    dlArfcnOffset: 67536,
    ulArfcnOffset: 132672,
  },
  69: {
    dlFreqLow: 2570,
    dlFreqHigh: 2620,
    dlArfcnOffset: 67836,
  },
  70: {
    dlFreqLow: 1995,
    dlFreqHigh: 2020,
    ulFreqLow: 1695,
    ulFreqHigh: 1710,
    dlArfcnOffset: 68336,
    ulArfcnOffset: 132972,
  },
  71: {
    dlFreqLow: 617,
    dlFreqHigh: 652,
    ulFreqLow: 663,
    ulFreqHigh: 698,
    dlArfcnOffset: 68586,
    ulArfcnOffset: 133122,
  },
  72: {
    dlFreqLow: 461,
    dlFreqHigh: 466,
    ulFreqLow: 451,
    ulFreqHigh: 456,
    dlArfcnOffset: 68936,
    ulArfcnOffset: 133472,
  },
  73: {
    dlFreqLow: 460,
    dlFreqHigh: 465,
    ulFreqLow: 450,
    ulFreqHigh: 455,
    dlArfcnOffset: 68986,
    ulArfcnOffset: 133522,
  },
  74: {
    dlFreqLow: 1475,
    dlFreqHigh: 1518,
    ulFreqLow: 1427,
    ulFreqHigh: 1470,
    dlArfcnOffset: 69036,
    ulArfcnOffset: 133572,
  },
  75: {
    dlFreqLow: 1432,
    dlFreqHigh: 1517,
    dlArfcnOffset: 69466,
  },
  76: {
    dlFreqLow: 1427,
    dlFreqHigh: 1432,
    dlArfcnOffset: 70316,
  },
  85: {
    dlFreqLow: 728,
    dlFreqHigh: 746,
    ulFreqLow: 698,
    ulFreqHigh: 716,
    dlArfcnOffset: 70366,
    ulArfcnOffset: 134002,
  },
  87: {
    dlFreqLow: 420,
    dlFreqHigh: 425,
    ulFreqLow: 410,
    ulFreqHigh: 415,
    dlArfcnOffset: 70546,
    ulArfcnOffset: 134182,
  },
  88: {
    dlFreqLow: 422,
    dlFreqHigh: 427,
    ulFreqLow: 412,
    ulFreqHigh: 417,
    dlArfcnOffset: 70596,
    ulArfcnOffset: 134232,
  },
  103: {
    dlFreqLow: 757,
    dlFreqHigh: 758,
    ulFreqLow: 787,
    ulFreqHigh: 788,
    dlArfcnOffset: 70646,
    ulArfcnOffset: 134282,
  },
}

export function arfcnToFreq(rat: 'lte' | 'nr' | 'umts' | 'gsm', arfcn: number, type: 'dl' | 'ul'): number | null {
  if (rat === 'lte') {
    const data = Object.values(earfcnCalcData).find(v => {
      if (!(`${type}FreqLow` in v)) return false

      const bw = v[`${type}FreqHigh`] - v[`${type}FreqLow`]

      return arfcn >= v[`${type}ArfcnOffset`] && arfcn < v[`${type}ArfcnOffset`] + 10 * bw
    })

    if (data === undefined) return null

    return data[`${type}FreqLow`] + 0.1 * (arfcn - data[`${type}ArfcnOffset`])
  }
}
