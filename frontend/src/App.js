import logo from './logo.svg';
import './App.css';
import StudentCreator from './components/getStudent.js'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        
        {/* 2. RENDER the component where you want it to appear */}
        {/* You render it using JSX syntax, like a custom HTML tag. */}
        <StudentCreator /> 
        
        {/* The rest of the original content */}
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
