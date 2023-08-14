import {useState} from 'react'
import { useNavigate } from 'react-router-dom'
const SearchForm = () => {
    const [search, setSearch] = useState("")
    const navigate = useNavigate()

    const handleSubmit = (e)=>{
        e.preventDefault();
        navigate(`/search?name=${search}`)
        setSearch("")

    }
  return (
    <>
    <form onSubmit={handleSubmit}>
        <div className="col-md-6">
            <input type="text" className="form-control "  placeholder="Search by name..." onChange={(e)=>setSearch(e.target.value)} value={search}/>
        </div>
    </form>
  </>
  )
}

export default SearchForm