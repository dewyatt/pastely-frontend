import React from 'react'
import ReactDOM from 'react-dom'
import {Router, Route, IndexRoute, useRouterHistory} from 'react-router'
import {createHashHistory} from 'history'

import App from './components/App'

const appHistory = useRouterHistory(createHashHistory)({queryKey: false})

ReactDOM.render((
  <Router history={appHistory}>
    <Route path='/' component={App}>
      <Route path='/:id' component={App} />
    </Route>
  </Router>
), document.getElementById('app-container'));
