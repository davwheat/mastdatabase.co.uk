import React from 'react'

import { Heading } from './Heading'

/**
 * Function that takes a heading variant and returns a functional component that
 * represents a heading of that variant.
 *
 * @example <caption>Create a H1 component that can be used elsewhere</caption>
 *          const H1 = MdxHeadingInterop('h1');
 *          // ...
 *          <H1 id="my-heading" noAnchorButton>My heading</H1>
 */
export function MdxHeadingInterop(variant) {
  return props => {
    return <Heading variant={variant} {...props} />
  }
}
