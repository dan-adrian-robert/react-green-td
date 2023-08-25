import React from 'react';
import './App.css';
import {MessageProvider} from "./components/MessageProvider";
import {GameView} from "./components/GameView";

function App() {

    return (
        <MessageProvider>
            <GameView/>
        </MessageProvider>
  );
}

export default App;
