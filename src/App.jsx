import { Header } from './components/Header';
import styles from './App.module.css';
import './global.css';

function App() {
  return (
    <>
      <Header />
      <div className={styles.wrapper}>Hello World</div>
    </>
  );
}

export default App;
