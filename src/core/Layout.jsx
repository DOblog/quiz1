import React from 'react';

export default ({ children }) => (
  <div className="wrapper">
    <header className="header">Лучшие тесты по джаваскрипту</header>
    <main className="content">{children}</main>
    <footer className="footer">Д. Облог © 2018</footer>
  </div>
);
