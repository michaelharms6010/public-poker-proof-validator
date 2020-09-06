import React from 'react';
import './App.scss';



function App() {
  const [form, setForm] = React.useState({deckString: "", hashCount: 1})
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
      <h1>Blake3 Hasher</h1>
      <form>
        <label>Text to hash:</label>
        <textarea
        name="deckString"
        value={form.deckString}
        onChange={handleChange}/>
        <div className="form-pair">
          <label>Number of times to hash:</label>
          <input
          name="hashCount"
          value={form.hashCount}
          onChange={handleChange}/>
        </div>
        <button type="button" onClick={calculate}>Calculate</button>

      </form>
      <div className="proof-display">
        <p>Expected Proof Hash:</p>
        {result && <p>{result}</p>}
      </div>
    </div>
  );
}

export default App;
