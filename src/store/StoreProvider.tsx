'use client'
import { store, persistor } from './Store'
import { SessionProvider } from 'next-auth/react'
import { PersistGate } from 'redux-persist/integration/react'
import { Provider } from 'react-redux'

interface StoreProviderProps {
  children: React.ReactNode
  session: any // Adjust the type as needed
}

const StoreProvider: React.FC<StoreProviderProps> = ({ children, session }) => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <SessionProvider session={session}>{children}</SessionProvider>
      </PersistGate>
    </Provider>
  )
}

export default StoreProvider
