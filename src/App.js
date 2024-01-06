
import './App.css';
import AppContent from './components/AppContent';
import Title from './components/Title';
import AppHeader from './components/AppHeader';

function App() {


  return (
    <div className="App">
        <Title/>
        <div className='app__wrapper'> 
          <AppHeader></AppHeader>
          <AppContent></AppContent>        
        </div>
    </div>
  );
}

export default App;
