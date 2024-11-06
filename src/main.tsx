import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.scss'
import App from './App.tsx'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { persistor, store } from './store/store.ts'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate persistor={persistor}>

    <App />
      </PersistGate>
    </Provider>
  </StrictMode>,
)
