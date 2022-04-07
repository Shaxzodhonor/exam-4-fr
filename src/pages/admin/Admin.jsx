import './Admin.scss'
import { useRef } from "react"
import { useQuery, useMutation } from '@apollo/client';

import { createCompany, createComplex,createHouse } from '../../Query/Query';
import {  Company, AllComplex } from '../../Query/Query';

function Admin() {

  // company
  const companyRef = useRef()
  const [ newCompanyFunc] = useMutation(createCompany,{
    update: (cache, data) => console.log("qo`shildi")
  })  
  function handleCompany(evt) {
    // evt.preventDefault()
    const { company } = evt.target.elements;
    newCompanyFunc({
      variables: {
        name: company.value,
      }
    })  
    companyRef.current.value =""
  }


  // complex
  const { data : company,} = useQuery(Company);

  const complexNameRef = useRef()

  const [ newComplexFunc] = useMutation(createComplex,{
    update: (cache, data) => console.log(cache, data)
  })
  function handleComplex(evt) {
    evt.preventDefault()
    
    const { complex, reference } = evt.target.elements;   
    newComplexFunc({
      variables: {
        name: complex.value,
        reference: reference.value
      }
    })  
    complexNameRef.current.value =""
  }

  const houseRooms = useRef()
  const houseSize = useRef()
  const houseLocation = useRef()
  const housePrice = useRef()

  const { data : complex } = useQuery(AllComplex);
  const [ newHouseFunc] = useMutation(createHouse,{
    update: (cache, data) => console.log("qo`shildi")
  })
  function handleHouse(evt){  
    // evt.preventDefault()
    
    const { rooms, size, price, location, reference } = evt.target.elements;

    console.log(rooms.value, reference.value, size.value, price.value, location.value);
    newHouseFunc({
      variables:{
        price: Number(price.value),
        rooms: Number(rooms.value),
        size: Number(size.value),
        location: String(location.value),
        reference: String(reference.value)
      }
    })
  }

  return (

  <div className="admin">
    <div className='container'>
      <div className="admin-wrap">
        <div className='company column'>
        <form  onSubmit={handleCompany}>
            <input  ref={companyRef} name='company' type="text" placeholder='New company' />
            <button type='submit'>Submit</button>
          </form>
        </div>
        <div className='complex column'>
          <form  onSubmit={handleComplex}>
            <input  ref={complexNameRef} name='complex' type="text" placeholder='Complex name' />
            <select name='reference' defaultValue={''}>
              <option value="" disabled>Choose</option>
              {
                company?.company?.length > 0 && company.company.map((e,i) =>(
                  <option value={e.id} key={i}>
                    {e.name}
                  </option>
                ))
              }
            </select>
            <button type='submit'>Submit</button>
          </form>
        </div>
        <div className='house column'>
          <form  onSubmit={handleHouse}>
            <input  ref={houseRooms} name='rooms' type="number" placeholder='House rooms' />
            <input  ref={houseSize} name='size' type="number" placeholder='kv/m' />
            <input  ref={housePrice} name='price' type="number" placeholder='So`m' />
            <input  ref={houseLocation} name='location' type="text" placeholder='address' />
            <select name='reference' defaultValue={''}>
              <option value="" disabled>Choose</option>
              {
                complex?.allComplex?.length > 0 && complex.allComplex.map((e,i) =>(
                  <option value={e.complex_id} key={i}>
                    {e.complex_name}
                  </option>
                ))
              }
            </select>
            <button type='submit'>Submit</button>
          </form>
        </div>
      </div>
    </div>
  </div>

  );
}

export default Admin;