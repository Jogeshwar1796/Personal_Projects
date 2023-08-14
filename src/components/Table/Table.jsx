import { useState,useEffect } from "react";
import fireDb from '../../firebase'
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const Table = ({sortedData,sort,setSort}) => {
    const [data, setData] = useState({})

    useEffect(() => {
        fireDb.child("contacts").on("value",(snapshot)=>{
            {snapshot.val() !==null?setData({...snapshot.val()}):setData({})}
        })
      return () => {
        setData({})
      }
    }, [])


    // Delete Functionality
    const onDelete = (id)=>{
        fireDb.child(`contacts/${id}`).remove((err)=>{
            if(err){
                toast.error(err)
            }
        })

        toast.success(`${data[id].name} has been removed `)
    }


    // Filtering data b/w "Active" and "Inactive"

    const filterData = (value)=>{
        fireDb.child("contacts").orderByChild("status").equalTo(value).on("value", (snapshot)=>{
            if(snapshot.val()){
                const data = snapshot.val();
                setData(data)
            }
        })
    }


    const handleReset = ()=>{
        fireDb.child("contacts").on("value",(snapshot)=>{
            {snapshot.val() !==null?setData({...snapshot.val()}):setData({})}
        })
        setSort(false)
      }
    
    

    return (
        <div className='col-md-10 mx-auto my-4'>
            <div className="mx-3 my-3 text-center">
                <div className="btn btn-lg btn-primary mx-3"onClick={()=>filterData("Active")} >Active</div>
                <div className="btn btn-lg btn-warning mx-3"onClick={()=>filterData("Inactive")}>Inactive</div>
                <button type="button" className="btn btn-lg btn-success mx-3" onClick={handleReset}>Reset</button> 
            </div>
            <table className="table table-hover">
                <thead className="text-white bg-dark text-center">
                    <tr> 
                        <th scope='col'>No.</th>  
                        <th scope='col'>Name</th>
                        <th scope='col'>Email</th>
                        <th scope='col'>Number</th>
                        <th scope='col'>Status</th>
                        {!sort&&(<th scope='col'>Action</th>)}
                    </tr>
                </thead>
                {!sort&&(
                <tbody>
                    {Object.keys(data).map((id,index)=>{
                        return(
                            <tr key={id}>
                                <th>{index+1}</th>
                                <td className='text-center'>{data[id].name}</td>
                                <td className='text-center'>{data[id].email}</td>
                                <td className='text-center'>{data[id].number}</td>
                                <td className='text-center'>{data[id].status}</td>
                                <td className=' text-center'>
                                    <Link to={`/edit/${id}`} className="btn btn-info" >Update</Link>
                                    <button type="button" className="btn  btn-danger mx-3 " onClick={()=>onDelete(id)}>Delete</button>
                                </td>
                            </tr>                             
                        )
                    })}
                </tbody>
                )}
                {sort&&(
                    sortedData.map((item,index)=>{
                        return(
                            <tbody>
                                <tr key={index}>
                                    <th>{index+1}</th>
                                    <td className='text-center'>{item.name}</td>
                                    <td className='text-center'>{item.email}</td>
                                    <td className='text-center'>{item.number}</td>
                                    <td className='text-center'>{item.status}</td>
                                    {/* <td className=' text-center'>
                                        <Link to={`/edit/${id}`} className="btn btn-info" >Update</Link>
                                        <button type="button" className="btn btn-sm btn-danger mx-3 " onClick={()=>onDelete(id)}>Delete</button>
                                    </td> */}
                                </tr>   
                            </tbody>
                       
                        )
                    })
                )}
            </table>
        </div>
      );
}

export default Table