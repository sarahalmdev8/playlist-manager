import Loader from './components/Loader'
import React, { Suspense, lazy } from 'react'
import { Route, Switch } from 'react-router-dom'

const Home = lazy(() => import('./containers/Home'))
const Playlists = lazy(() => import('./containers/Playlists'))
const PlaylistEditor = lazy(() => import('./containers/PlaylistEditor'))

const App = () => (
  <Switch>
    <Suspense fallback={<Loader fullscreen />}>
      <Route exact path="/playlist/new" component={PlaylistEditor} />
      <Route exact path="/playlist/:id/edit" component={PlaylistEditor} />
      <Route exact path="/playlists" component={Playlists} />
      <Route exact path="/" component={Home} />
    </Suspense>
  </Switch>
)

export default App
