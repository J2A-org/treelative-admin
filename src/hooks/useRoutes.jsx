import React, { useEffect, useState } from 'react'

import match from 'utils/match'

export default function useRoutes (routes, defaultRoute = '/') {
  const [pathname, setPathname] = useState(window.location.pathname)

  useEffect(() => {
    const onLocationChange = () => {
      setPathname(window.location.pathname)
    }
    window.addEventListener('popstate', onLocationChange)
    return () => {
      window.removeEventListener('popstate', onLocationChange)
    }
  }, [])

  for (const [path, [Component, props]] of Object.entries(routes)) {
    const isMatch = match(path, pathname)
    if (isMatch.matches) {
      const params = isMatch.params
        ? Object.keys(isMatch.params).reduce((obj, param) => ({ ...obj, [param]: decodeURIComponent(isMatch.params[param]) }), {})
        : {}
      return <Component {...props} {...params} />
    }
  }

  const [DefaultComponent, props] = routes[defaultRoute]

  return <DefaultComponent {...props} />
}

export const navigate = (event, to) => {
  if (event) {
    // if ctrl or meta key are held on click, allow default behavior of opening link in new tab
    if (event.metaKey || event.ctrlKey) {
      return
    }
    // prevent full page reload
    event.preventDefault()
  }
  // update url
  window.history.pushState({}, '', to)
  // communicate to routes that URL has changed
  const navEvent = new window.PopStateEvent('popstate')
  window.dispatchEvent(navEvent)
}
