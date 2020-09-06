import React from 'react';
import logo from './logo.svg';
import './App.css';



function App() {
  const [form, setForm] = React.useState({deckString: "", hashCount: 0})
  const [result, setResult] = React.useState("")
  const [calculating, setCalculating] = React.useState(false)

  const handleChange = e => setForm({...form, [e.target.name]: e.target.value})

  const calculate = _ => {
    if (!calculating) {
      setCalculating(true)
    
      let hash = form.deckString;
      console.log(hash)
      import('blake3/browser').then(blake3 => {
        
        for (let i = 0; i < +form.hashCount; i++) {
          hash = blake3.hash(hash);
        }
          console.log(+form.hashCount)
          setResult(hash.toString("hex"))
          setCalculating(false)
      })
  }
    
  }

  return (
    <div className="App">

      <textarea
        name="deckString"
        value={form.deckString}
        onChange={handleChange}/>

      <input
        name="hashCount"
        value={form.hashCount}
        onChange={handleChange}/>

      <button type="button" onClick={calculate}>Calculate</button>
      <p>Expected Proof Hash:</p>
      {result && <p>{result}</p>}
    </div>
  );
}

export default App;
