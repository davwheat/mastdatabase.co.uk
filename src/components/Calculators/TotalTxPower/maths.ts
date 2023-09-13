/**
 * Equation:
 *
 * TX Power = RSP + 10log10(TX ports) + 10log10(12 * RB count) - 10log10(1 + p-b)
 */

export function calculateTotalPower(rsp: number, txPorts: number, rbCount: number, pb: number): number {
  return rsp + 10 * Math.log10(txPorts) + 10 * Math.log10(12 * rbCount) - 10 * Math.log10(1 + pb)
}

export function calculateRsp(totalPower: number, txPorts: number, rbCount: number, pb: number): number {
  return (
    (-10 * Math.log(12 * rbCount) + totalPower * Math.log(5) + totalPower * Math.log(2) - 10 * Math.log(txPorts) + 10 * Math.log(1 + pb)) /
    Math.log(10)
  )
}

export function calculateTxPorts(totalPower: number, rsp: number, rbCount: number, pb: number): number {
  return Math.round(((1 / 3) * (pb + 1) * 2 ** (0.1 * (totalPower - rsp - 20)) * 5 ** (0.1 * (totalPower - rsp))) / rbCount)
}

export function calculateRbCount(totalPower: number, rsp: number, txPorts: number, pb: number): number {
  return ((1 / 3) * (pb + 1) * (2 ** (0.1 * (totalPower - rsp - 20)) * 5 ** (0.1 * (totalPower - rsp)))) / txPorts
}

export function calculatePb(totalPower: number, rsp: number, txPorts: number, rbCount: number): number {
  return Math.round(3 * rbCount * txPorts * 2 ** (0.1 * (-totalPower + rsp + 20)) * 5 ** (0.1 * (rsp - totalPower)) - 1)
}

export function dBmToWatts(dBm: number): number {
  return 10 ** (dBm / 10) / 1000
}

export function wattsToDbm(watts: number): number {
  return 10 * Math.log10(watts * 1000)
}

export function getRbsForBandwidth(bandwidth: number): number {
  switch (bandwidth) {
    case 1.4:
      return 6
    case 3:
      return 15
    case 5:
      return 25
    case 10:
      return 50
    case 15:
      return 75
    case 20:
      return 100
    default:
      return 0
  }
}

export function getBandwidthForRbs(rbs: number): number {
  if (rbs < 11) return 1.4
  if (rbs < 20) return 3
  if (rbs < 35) return 5
  if (rbs < 68) return 10
  if (rbs < 85) return 15
  return 20
}
