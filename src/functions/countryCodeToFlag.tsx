import React from 'react'

const letterA = 'a'.codePointAt(0)!
const regionalIndicatorA = '🇦'.codePointAt(0)!

function charToRegionalIndicator(char: string) {
  return String.fromCodePoint(char.codePointAt(0)! - letterA + regionalIndicatorA)
}

function getTwemojiUrl(codepoint: string): string {
  return `https://twemoji.maxcdn.com/2/svg/${codepoint}.svg`
}

/**
 * Converts a two-letter ISO country code into a flag emoji for that country.
 */
export default function countryCodeToFlag(countryCode: string): React.ReactNode {
  const regionalIndicators = countryCode.toLowerCase().split('').map(charToRegionalIndicator)

  const codepoint = regionalIndicators.map(c => c.codePointAt(0)!.toString(16)).join('-')

  return <img src={getTwemojiUrl(codepoint)} alt={regionalIndicators.join('')} className="emoji" />
}
