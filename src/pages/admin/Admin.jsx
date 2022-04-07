import './Admin.scss'
import { useState, useRef } from "react"
import { useQuery, useMutation } from '@apollo/client';
import { createCompany } from '../../Query/Query';

function Admin() {
  const companyRef = useRef()
  const [ newConpanyFunc] = useMutation(createCompany,{
    update: (cache, data) => console.log("qo`shildi")
  })

  // console.log(companyRef.current);
  function handleUser(evt) {
    evt.preventDefault()
    
    const { company } = evt.target.elements;
    newConpanyFunc({
      variables: {
        name: company.value,
      }
    })  
    companyRef.current.value =""

  }
  return (

<div className="admin">
  <div className='container'>
    <div>
    <form  onSubmit={handleUser}>
        <input  ref={companyRef} name='company' type="text" placeholder='New company' />
        <button type='submit'>Submit</button>
      </form>
    </div>
    </div>
  </div>

  );
}

export default Admin;