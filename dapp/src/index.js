import React, { useEffect } from 'react'
import ReactDOM from 'react-dom'
import { Router } from './router'
import { ThemeProvider } from './contexts/ThemeContext'
import theme from './theme.json'
import { GlobalProvider } from './contexts/GlobalContext'
import { ToastsProvider } from './contexts/ToastsContext'
import { WalletProvider } from './contexts/WalletContext'
import { ContractProvider } from './contexts/ContractContext'

import store from './store'
import { Provider } from 'react-redux'

/**
 * Theme images
 */

theme.imageTypeList = [
  'tif', 'tiff', 'png', 'svg', 'jpg', 'jpeg', 'bmp', 'gif', 'eps', 'raw', 'cr2', 'nef', 'orf', 'sr2'
]

const RouteApp = () => {
  return (
    <Provider store={store}>
      <GlobalProvider>
        <ThemeProvider theme={theme}>
          <ToastsProvider>
            <WalletProvider>
              <ContractProvider>
                <Router />
              </ContractProvider>
            </WalletProvider>
          </ToastsProvider>
        </ThemeProvider>
      </GlobalProvider>
    </Provider>
  )
}

const wrapper = document.getElementById('root')
ReactDOM.render(<RouteApp />, wrapper)
