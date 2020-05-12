import React from 'react';
import logo from './logo.svg';
import  defaultStyle from './App.module.scss';
import { Button } from 'antd';

function App() {
  return (
    <div className={defaultStyle.App}>
      <header className={defaultStyle.AppHeader}>
        <img src={logo} className={defaultStyle.AppLogo} alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className={defaultStyle.AppLink}
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <Button type="primary">Button</Button>
      </header>
    </div>
  );
}

export default App;
