import React from 'react';
import Quiz from './components/Quiz'

function App() {
  const [started, setStarted] = React.useState(false)

  const toggle= () => {
    setStarted(!started)
  }
  return (
    <main>
      {!started && <div className="start-screen">
          <h1>Trivia Game</h1>
          <button onClick={toggle}>Start Quiz</button>
        </div>}
      {started && <Quiz />}
    </main>
  );
}

export default App;
