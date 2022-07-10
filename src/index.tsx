import React from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { store } from './app/store'
import App from './App'
import reportWebVitals from './reportWebVitals'
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom"
import { People } from './features/people/People'
import { CharacterView } from './features/people/CharacterView'
import { Planets } from './features/planets/Planets'
import { Starships } from './features/starships/Starships'
import './index.css'

const container = document.getElementById('root')!
const root = createRoot(container)

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />}>
            <Route index element={<People />} />
            <Route path="people/:id" element={<CharacterView />} />
            <Route path="people" element={<People />} />
            <Route path="planets" element={<Planets />} />
            <Route path="starships" element={<Starships />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
