// `usePageContext` allows us to access `pageContext` in any React component.
// See https://vite-plugin-ssr.com/pageContext-anywhere

import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import { childrenPropType } from './PropTypeValues'

export { PageContextProvider }
export { usePageContext }

const Context = React.createContext(undefined)

PageContextProvider.propTypes = {
  pageContext: PropTypes.any,
  children: childrenPropType
}
function PageContextProvider({ pageContext, children }) {
  return <Context.Provider value={pageContext}>{children}</Context.Provider>
}

function usePageContext() {
  const pageContext = useContext(Context)
  return pageContext
}
