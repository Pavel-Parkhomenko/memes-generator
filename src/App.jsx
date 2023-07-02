import './App.css';
import Header from './components/Header';
import Meme from './components/Meme';

export default function App() {
  return (
    <div className="container">
      <p className="side_text">Sometimes I think</p>
      <div className='main--card'>
        <Header />
        <Meme />
      </div>
      <p className="side_text">And then I forget</p>
    </div>
  );
}