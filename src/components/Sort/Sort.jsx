import React from 'react'
import fireDb from '../../firebase'
const Sort = ({setSort,setSortedData}) => {
  const handleChange = (e)=>{
      setSort(true)
      fireDb.child("contacts")
      .orderByChild(`${e.target.value}`)
      .on("value", (snapshot)=>{
          let sortedData = [];
          snapshot.forEach((snap)=>{
              sortedData.push(snap.val())
          })
          setSortedData(sortedData)
      })

  }  
  return (
      
    <select className="form-select" aria-label="Default select example" onChange={handleChange}>
        <option >Please select</option>
        <option value="name">Name</option>
        <option value="email">Email</option>
        <option value="number">Contact</option>
        <option value="status">Status</option>
    </select>  
  )
}

export default Sort