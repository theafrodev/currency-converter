import './App.css'
import HomePage from './components/HomePage';
import { CurrencyProvider } from './hooks/currencyContext';
import ModalProvider from './hooks/ModalContext';


function App() {

  return (
    <ModalProvider>
      <CurrencyProvider>
        <HomePage/>
      </CurrencyProvider>
    </ModalProvider>
  )
}

export default App
