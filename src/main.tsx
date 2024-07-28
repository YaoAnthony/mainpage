import React from 'react'
import ReactDOM from 'react-dom/client'

// global styles
// import './index.css'
import './style.scss'

// App component
import App from './App.tsx'

// Redux
import { Provider } from 'react-redux'
import { store } from './Redux/store.ts'


//AI search
import { SearchResultProvider } from './Context/AISearchContext.tsx'

//motion
import { AnimatePresence } from 'framer-motion'


//translation
import './i18n/i18n';  // 导入 i18n 配置

ReactDOM.createRoot(document.getElementById('root')!).render(
  // <React.StrictMode>
    <Provider store={store}>
      <SearchResultProvider>
        <AnimatePresence>
          <App />
        </AnimatePresence>
      </SearchResultProvider>
    </Provider>
  // </React.StrictMode>,
)
