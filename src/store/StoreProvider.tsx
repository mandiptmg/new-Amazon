'use client'
import { FC } from 'react'
import { PersistGate } from 'redux-persist/integration/react'
import { Provider } from 'react-redux'
import { SessionProvider } from 'next-auth/react'
import { store, persistor } from './Store'

interface StoreProviderProps {
  children: React.ReactNode
  session: any // Update with the actual type for session
}

const StoreProvider: FC<StoreProviderProps> = ({ children, session }) => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <SessionProvider session={session}>{children}</SessionProvider>
      </PersistGate>
    </Provider>
  )
}

export default StoreProvider
