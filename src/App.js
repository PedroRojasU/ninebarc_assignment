import './App.css';

import AppFooter from './components/navigation/AppFooter';
import AppHeader from './components/navigation/AppHeader';

import QuestionContainer from './components/QuestionContainer';

function App() {
  return (
    <div className="App">
      <AppHeader />
      <div className="app-content">
        <h1>Berlin Ticket Helper</h1>
          <QuestionContainer />
      </div>
      <AppFooter />
    </div>
  );
}

export default App;
