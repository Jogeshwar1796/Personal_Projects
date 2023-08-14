import {useState,useEffect} from 'react'
import { useLocation,Link } from 'react-router-dom'

import fireDb from '../../firebase'

const Search = () => {
    const [data, setData] = useState({})
    const useQuery = ()=>{
        return new URLSearchParams(useLocation().search)
    }

    let query = useQuery();
    let search = query.get("name")

    useEffect(() => {
        searchData()

    }, [search])
    
   const searchData  = ()=>{
       fireDb.child("contacts")
       .orderByChild("name")
       .equalTo(search)
       .on("value", (snapshot)=>{
           if (snapshot.val()){
               const data = snapshot.val();
               setData(data)
           }
       })
   } 
  return (
    <>
            <div className='col-md-10 mx-auto my-4'>
                {Object.keys(data).length===0?(<div className="col-md-4 mx-auto my-8"><h2>No Contacts found!!</h2></div>):(
                <table className="table table-hover">
                    <thead className="text-white bg-dark text-center">
                        <tr> 
                            <th scope='col'>No.</th>  
                            <th scope='col'>Name</th>
                            <th scope='col'>Email</th>
                            <th scope='col'>Number</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Object.keys(data).map((id,index)=>{
                            return(
                                <tr key={id}>
                                    <th>{index+1}</th>
                                    <td className='text-center'>{data[id].name}</td>
                                    <td className='text-center'>{data[id].email}</td>
                                    <td className='text-center'>{data[id].number}</td>
                                </tr>                             
                            )
                        })}
                    </tbody>
                </table>
                )}
                   <Link to="/" className='btn btn-outline-dark mx-auto'>Go Back</Link>
        </div>
        
        
    </>
  
  )
  
}

export default Search