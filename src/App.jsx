import MainLayout from './components/mainLayout/MainLayout'
import './App.css'
import Navbar from './components/navbar/Navbar'
import { GenreProvider } from './context/GenreProvider'

function App() {

  return (
    <div className='app'>
      <Navbar/>
      <GenreProvider>
        <MainLayout />
      </GenreProvider>
    </div>
  )
}

export default App
