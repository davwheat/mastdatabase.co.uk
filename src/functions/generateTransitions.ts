export const Durations = {
  verylong: 750,
  long: 250,
  medium: 200,
  short: 125,
} as const

export const DefaultDuration = Durations.medium
export const DefaultEasing = 'ease-in-out'

/**
 * Generates a transition object to be used for CSS-in-JS.
 *
 * Implement with a `...` spread operator on the function.
 *
 * @example { "myCoolClass": { ...generateTransition("color", "medium", "ease-out") } }
 */
export default function generateTransitions(
  property: string | ReadonlyArray<string>,
  duration: (keyof typeof Durations | number) | ReadonlyArray<keyof typeof Durations | number> = 'medium',
  easing: string | ReadonlyArray<string> = 'ease-in-out',
): { transition: string } {
  const propsIsArray = Array.isArray(property)
  const durationIsArray = Array.isArray(duration)
  const easingIsArray = Array.isArray(easing)

  if (propsIsArray) {
    // we have multiple transitions to generate
    const endTransition = { transition: '' }

    property.forEach((prop: string, i: string | number) => {
      let _easing = easing || DefaultEasing
      let _duration: number

      /*
        if we have multiple easing/duration values, use, in desc. order:
      
        1. value at same index as this property
        2. last value
        3. default value
      */

      if (durationIsArray) {
        // use manual ms input, failing that use string-based values as explained above
        _duration =
          typeof duration[i] === 'number' ? duration[i] : Durations[duration[i]] || Durations[easing[easing.length - 1]] || DefaultDuration
      } else {
        _duration = typeof duration === 'number' ? duration : Durations[duration as string] || DefaultDuration
      }

      if (easingIsArray) _easing = easing[i] || easing[easing.length - 1] || DefaultEasing

      const thisTrans = createTransitionValue(prop, _duration, _easing as string)

      // append this transition's string value, with comma if there has been values before it
      endTransition.transition = endTransition.transition + (endTransition.transition === '' ? thisTrans : `, ${thisTrans}`)
    })

    return endTransition
  } else {
    // only one value to transition

    let _easing = easing || DefaultEasing
    let _duration: number

    /*
      if we have multiple easing/duration values, use, in desc. order:
    
      1. value at same index 0
      2. default value
    */

    if (durationIsArray) {
      // use manual ms input, failing that use string-based values as explained above
      _duration = typeof duration[0] === 'number' ? duration[0] : Durations[duration[0]] || DefaultDuration
    } else {
      _duration = typeof duration === 'number' ? duration : Durations[duration as string] || DefaultDuration
    }

    if (easingIsArray) _easing = easing[0] || DefaultEasing

    return {
      transition: createTransitionValue(property as string, _duration, _easing as string),
    }
  }
}

function createTransitionValue(property: string, durationMs: number, easing: string) {
  if (durationMs < 5) console.warn('`createTransitionValue` called with duration < 5ms. Are you sure this was passed in milliseconds?')

  return `${property} ${durationMs}ms ${easing}`
}
