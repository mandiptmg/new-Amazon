'use client'
import { store, persistor } from './Store'
import { PersistGate } from 'redux-persist/integration/react'
import { Provider } from 'react-redux'
import { SessionProvider } from 'next-auth/react'


const StoreProvider = ({ children}:{children: React.ReactNode}) => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <SessionProvider>
        {children}
        </SessionProvider>
      </PersistGate>
    </Provider>
  )
}

export default StoreProvider
