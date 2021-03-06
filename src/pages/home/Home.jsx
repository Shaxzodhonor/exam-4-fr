import './Home.scss';

import { useState } from "react"
import { useQuery, useMutation } from '@apollo/client';
import { Company, getComplex, getHouse, getBank, getCalculate} from '../../Query/Query';

function Home () {
  const [ companyId, setCompanyId ] = useState(null)
  const [ complexId, setComplexId ] = useState(null)
  const [ houseId, setHouseId ] = useState(null)
  const [ bankDuration, setBankDuration ] = useState(null)

  const { data : company, error : companyError, loading: companyLoading } = useQuery(Company);

  const {data : allComplex, error : complexError, loading : complexLoading} = useQuery(getComplex, {
     variables: {companyid: companyId}
  });
  const {data : allHouse, error : houseError, loading : houseLoading} = useQuery(getHouse, {
    variables: complexId && {complexid: complexId}
  });
  const {data : bank, error : bankError, loading : bankLoading} = useQuery(getBank, {
    variables: houseId && {id: houseId}
  });
  const {data : calculation, error : calculateError, loading : calculateLoading} = useQuery(getCalculate, {
    variables: bankDuration && {duration: Number(bankDuration), houseId: houseId, bankId: bank?.bank[0].id }
  });
  return (
    <div className="home">
      <div className='container'>
        <h1 className='homeHeading'>Choose a house by filtering</h1>
        <div className="home-loading">
          {companyLoading && <h3>Loading... </h3>}
        </div>
        <div className='choose-wrapper'>
          <div className='choose'>
            <select defaultValue={''} onChange={(e)=>  setCompanyId(e.target.value)}>
            <option value="" disabled>Choose Building company</option>
            {
              company?.company?.length > 0 && company.company.map((e,i) =>(
                <option value={e.id} key={i}>
                  {e.name}
                </option>
              ))
            }
          </select> 
          </div>
          <div className='choose'>
            <select defaultValue={''} onChange={(e => setComplexId(e.target.value))}>
            <option value="" disabled>Choose Complex</option>
              {
                allComplex?.complex.length > 0 && allComplex.complex.map((e,i) =>(
                <option className='option' value={e.id} key={i}>
                  {e.name}</option>
                ))
              }
              </select>
          </div>
          <div className='choose'>
            <select defaultValue={''} onChange={(e => setHouseId(e.target.value))}>
            <option value="" disabled>Number of rooms</option>
              {
                allHouse?.house.length > 0 && allHouse.house.map((e,i) =>(
                <option className='option' value={e.id} key={i}>
                  {e.rooms}</option>
                ))
              }
              </select>
          </div>
          <div className='choose'>
            <select defaultValue={''} onChange={(e => setBankDuration(e.target.value))}>
            <option value="" disabled>Mortgage duration</option>
              {
                bank && bank.bank[0].duration.map((e,i) =>(
                <option value={e} key={i}>
                  {e} years
                </option>
                ))
              }
              </select>
          </div>
        </div>
      </div>
      <div className="container output-card">
      <div className='output-wrap'>
          <div className="house output-card">
            <div className='company'>
              {complexLoading && <h3>Loading... </h3>}
              {!complexLoading && <h2>{company?.company.find(company => company.id == companyId)?.name}</h2>}
            </div>
            <div className='complex'>
              {houseLoading && <h3>Loading... </h3>}
              {!houseLoading && <h3>{allComplex?.complex.find(complex => complex.id == complexId)?.name}</h3>}
            </div>
            <div className='house'>
              {houseId && allHouse?.house.filter(complex => complex.id == houseId).map(e => (
                <div key={e.id}>
                  <h3>{e.price} so`m <small>kv/m</small></h3>
                  <h3>{e.rooms} xona</h3>
                  <h3>{e.size} <sup>m2</sup></h3>
                  <address>{e.location}</address>
                </div>
              ))}
            </div>
          </div>
          <div className='bank output-card'>
            {bankDuration && <div>
                <h2 style={{textAlign: "center"}}>{bank?.bank[0].name}</h2>
                <h3>Overall money: {bank?.bank[0].upto} <small>so`m</small></h3>
                <h3>Starting payment: {bank?.bank[0].starting_payment} %</h3>
                <h3>Duration: {bankDuration} </h3>
              </div>}
          </div>
          <div className='calculate output-card'>
          {bankDuration && <div>
                <h3>House overall price: {calculation?.calculate.overall_price} <small>so`m</small></h3>
                <h3>Starting payment: {calculation?.calculate.starting_payment} <small>so`m</small></h3>
                <h3>Monthly payment: {calculation?.calculate.monthly_payment} <small>so`m</small></h3>
                <h3>Service: {calculation?.calculate.bank_service} <small>so`m</small></h3>
              </div>}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;