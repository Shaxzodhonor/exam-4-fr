import { getBySelect } from "./Query"
import { useQuery } from "@apollo/client";
import {memo}  from "react"


function Us({sel}){
  

  const {data, error, loading} = useQuery(getBySelect, {
    variables: {filter: sel}
  });
  console.log(data?.userBySelect);

  if (loading) return <h1>loading...</h1>
  if (error) return <h1>error...</h1>
  return (
  <div>
    {data && <ul>
      {data &&
        data.userBySelect.map((e, i) => (
          <div key={i}>
            <h5>{e.first_name}</h5>
            <h6>{e.age}</h6>
            <h6>{e.job}</h6>
            <br />
          </div>
        ))}
    </ul>
    }
  </div>)
}

export default memo(Us);