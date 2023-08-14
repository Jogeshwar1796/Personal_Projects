import {useState,useEffect} from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import fireDb from '../../firebase'
import { toast } from 'react-toastify'
import './AddEdit.css'

// Defining initial state of the contact 

const initialState = {
    name: "",
    email: "",
    number: "",
    status:""
}
const AddEdit = () => {

    const[contact, setContact] = useState(initialState)
    const[data, setData] = useState({})
    const navigate = useNavigate()
    const{name,email,number,status} = contact
    const {id} = useParams()

    // target an input 
    const handleInputChange = (e)=>{
        const{name,value} = e.target
        setContact({...contact,[name]:value})
        
    }

    // handleSubmit function

    const handleSubmit = (e)=>{ 
        e.preventDefault()
        {!name || !email || !number || !status? 
          toast.warning("Please fill all text fields"):
          !id?
            fireDb.child("contacts").push(contact, (err)=>{
                {err? toast.error(err):toast.success("Contact created successfully")}
            })&& 
            setTimeout(()=>navigate("/"),500):
            fireDb.child(`contacts/${id}`).set(contact, (err)=>{
                {err? toast.error(err):toast.success("Contact updated successfully")}
            })&&
            setTimeout(()=>navigate("/"),500)

    }
  }
    useEffect(() => {
        fireDb.child("contacts").on("value",(snapshot)=>{
            {snapshot.val() !==null?setData({...snapshot.val()}):setData({})}
        })
      return () => {
        setData({})
      }
    }, [id])


    useEffect(() => {
      {id?setContact({...data[id]}):setContact({...initialState})}
    
      return () => {
        setContact({...initialState})
      }
    }, [id,data])
    


  return (
    <div style={{ marginTop: "100px" }}>
      <form
        style={{
          margin: "auto",
          padding: "15px",
          maxWidth: "400px",
          alignContent: "center",
        }}
        onSubmit={handleSubmit}
      >
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          name="name"
          placeholder="Your Name..."
          value={name || ""}
          onChange={handleInputChange}
        />
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Your Email..."
          value={email || ""}
          onChange={handleInputChange}
        />
        <label htmlFor="contact">Contact</label>
        <input
          type="number"
          id="contact"
          name="number"
          placeholder="Your Contact No. ..."
          value={number || ""}
          maxLength={8}
          onChange={handleInputChange}
        />
        <label htmlFor="name">Status</label>
        <input
          type="text"
          id="status"
          name="status"
          placeholder="Your Status..."
          value={status || ""}
          onChange={handleInputChange}
        />
        <input type="submit" value={id ? "Update" : "Save"} />
      </form>
    </div>
  )

}

export default AddEdit