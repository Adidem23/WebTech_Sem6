import './App.css';
import { useState } from 'react';
import axios from 'axios';

const App = () => {

  const [Name, setName] = useState("");
  const [Clicked, setClicked] = useState(false);
  const [Phone, setPhone] = useState("");
  const [UnitsUsed, setUnitsUsed] = useState(0);
  const [CalculatedBill, setCalculatedBill] = useState(0);


  const GenerateBillinBackend = async () => {
    setClicked(true);
    await axios.post("http://localhost:9000/GenBill", { Name: Name, Phone: Phone, UnitsUsed: UnitsUsed }, { withCredentials: true }).then((res) => {
      setCalculatedBill(res.data);
    }).catch((err) => { alert(`${err} is Occured!!`) })
  }

  return (
    <>
      <div class="MainDiv">

        <h1>Electricity Bill Generator</h1>

        <div class="mb-3">
          <label for="exampleFormControlInput1" class="form-label">Name</label>
          <input required type="text" class="form-control" id="exampleFormControlInput1" placeholder="Enter Your Name" name="fullName" onChange={(e)=>setName(e.target.value)} />
        </div>


        <div class="mb-3">
          <label for="exampleFormControlInput1" class="form-label">PhoneNumber</label>
          <input required type="phonenumber" class="form-control" id="exampleFormControlInput2" placeholder="Enter Your Phone Number" name="RollNumber" onChange={(e)=>setPhone(e.target.value)}  />
        </div>

        <div class="mb-3">
          <label for="exampleFormControlInput1" class="form-label">Units Used</label>
          <input  required type="number" class="form-control" id="exampleFormControlInput3" placeholder="Enter Your Units Used " name="Email" onChange={(e)=>setUnitsUsed(e.target.value)}  />
        </div>

        <div class="mb-3" style={{ display: 'block', margin: 'auto', width: 'fit-content' }}>
          <button type="button" class="btn btn-secondary" onClick={GenerateBillinBackend}>Generate</button>
        </div>

        {Clicked ? <div class="mb-3">

          <div class="card" style={{ display: 'block', margin: 'auto', width: 'fit-content' }} id="head3">
            <div class="card-body">
              <p class="card-title"> Name:<span id="nameuser">{Name}</span></p>
              <p class="card-text">PhoneNumber:<span id="phoneuser">{Phone}</span></p>
              <p class="card-text" >Bill is : <span id="bill">{CalculatedBill}</span>Rs</p>
            </div>
          </div>

        </div> : <p style={{ display: 'block', margin: 'auto', width: 'fit-content', fontSize: '30px' }}>Fill Form To Check Bill!!</p>}

      </div>
    </>
  )
}

export default App