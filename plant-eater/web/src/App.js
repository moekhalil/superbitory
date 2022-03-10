import logo from './logo.svg';
import './App.css';
import Excel from 'exceljs';

const readIt = async ({target: { files }}) => {
  // read from a file
  const workbook = new Excel.Workbook();
  /**
   * @type {Blob} file
  */
  const file = files[0];
  console.log(file);
  console.log(workbook);
  await workbook.csv.write(file.arrayBuffer());
  const rows = x.split(/\r\n|\n/).map(x => x.split(',')).map(row => ({
    name: row[0], price: row[1]
  }));
  console.log(workbook);
}

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
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
        <div>
        <input type="file" id="file-selector" onChange={readIt} />
      </div>
      </header>
    </div>
  );
}

export default App;
