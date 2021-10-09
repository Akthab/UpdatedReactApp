import './App.css';
import axios from "axios";
import React, { useEffect, useState } from 'react';

function App () {

     const[users, setUsers] = useState([]);
     const[id, setId] = useState(0);
     const[brandName, setBrandName] = useState('');
     const[vehicleNumber, setVehicleNumber] = useState('');
     const[chasisNumber, setChasisNumber] = useState('');
     
     

    useEffect(() => {
      axios.get("http://localhost:8080/api/")
      .then((response)=>{
          setUsers(response.data)
          setId(0)
          setBrandName('')
          setVehicleNumber('')
          setChasisNumber('')
      });
    },[id])

    function submit(event){
        event.preventDefault();

        if(id===0){
            axios.post("http://localhost:8080/api/",{
                brandName: brandName,
                vehicleNumber: vehicleNumber,
                chasisNumber: chasisNumber
            })
            .then((response) =>{
              setId()
            })
        }else{
             axios.put("http://localhost:8080/api/",{
             id: {id}, 
             brandName: {brandName},
             vehicleNumber: {vehicleNumber},
             chasisNumber: {chasisNumber}
            })        
            .then((response) =>{
               setId()
            })
        }
    }
        
    function deleteRecord(id){
        axios.delete(`http://localhost:8080/api/${id}`)
        .then((response) =>{
            setId()  
        })
    }

    function editRecord(id){
        axios.get(`http://localhost:8080/api/${id}`)
        .then((response) => {
            setId(response.data.id)
            setBrandName(response.data.brandName)
            setVehicleNumber(response.data.vehicleNumber)
            setChasisNumber(response.data.chasisNumber)
        })
    }

      
      return(        
        <div className="container">
            <div className="firstDiv">              
                <form onSubmit={(e)=> submit(e,id)}>             
                    <div className="col s12">                 
                          <div className="input-field col s12">     

                            <i className="material-icons prefix">desktop_windows</i>
                            <input 
                                onChange={ e=> setBrandName(e.target.value)}                             
                                value={brandName} 
                                type="text" 
                                id="autocomplete-input" 
                                className="autocomplete"
                            />
                            <label htmlfor="autocomplete-input">Brand Name</label>                             
                         </div>                      
                    </div>

                    <div className="col s12">                 
                          <div className="input-field col s12">
                             <i className="material-icons prefix">directions_car</i>
                             <input 
                                onChange={(e)=> setVehicleNumber(e.target.value)} 
                                value={vehicleNumber} 
                                type="text" 
                                id="autocomplete-input" 
                                className="autocomplete"
                            />                        
                            <label htmlfor="autocomplete-input">Vehicle Number</label>                             
                         </div>                    
                    </div>

                    <div className="col s12">                 
                          <div className="input-field col s12">
                            <i className="material-icons prefix">vpn_key</i>
                            <input 
                                onChange={(e)=> setChasisNumber(e.target.value)} 
                                value={chasisNumber} 
                                type="text" 
                                id="autocomplete-input" 
                                className="autocomplete"
                            />
                            <label htmlfor="autocomplete-input">Chasis Number</label>                             
                      </div>                      
                  </div>
                  
                  <button className="btn waves-effect waves-light" style={{marginTop: "10px"}}type="submit" name="action">Submit
                      <i className="material-icons right">send</i>
                  </button>

              </form>
            </div>                 
              <table style={{ width:"100%" }}>
                <thead>
                  <tr>
                      <th>Id</th>
                      <th>Brand Name</th>
                      <th>Vehicle Number</th>
                      <th>Chasis Number</th>
                      <th>Edit</th>
                      <th>Delete</th>
                  </tr>
                </thead>
                <tbody>
                    {
                        users.map(
                        user =>
                        <tr key = {user.id}>
                            <td>{user.id}</td>
                            <td>{user.brandName}</td>
                            <td>{user.vehicleNumber}</td>
                            <td>{user.chasisNumber}</td>                                                
                    
                        <td>
                            <button onClick={(e)=> editRecord(user.id)} className="btn waves-effect waves-light" type="submit" name="action">Edit
                                <i className="material-icons right">edit</i>
                            </button>
                        </td>

                        <td>
                            <button onClick={(e)=> deleteRecord(user.id)} className="btn waves-effect waves-light" type="submit" name="action">Delete
                                    <i className="material-icons right">delete</i>
                            </button>
                        </td>
                    </tr>
                        )
                    }                                    
                </tbody>
              </table>
          </div>
    );                
}

export default App;