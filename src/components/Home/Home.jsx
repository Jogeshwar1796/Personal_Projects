import {useState} from 'react';
import { Link } from 'react-router-dom';
import SearchForm from '../SearchForm/SearchForm';
import Sort from '../Sort/Sort';
import Table from '../Table/Table'

const Home = () => {
  const[sortedData, setSortedData] = useState([])
  const[sort, setSort] = useState(false)
  return (
    <div className='container'>
        <div className="row">
            <div className="col-md-4 my-3 text-left">
                <Link to="/add" className='btn btn-outline-dark'>Add Contact</Link>     
            </div>
            <div className="col-md-4 my-2"><SearchForm/></div>
            <div className="col-md-4 my-3 text-right">
                <Sort setSortedData={setSortedData} setSort={setSort}/>
                    
            </div>
            <div className="my-5 py-5"><Table sortedData={sortedData} sort={sort} setSort={setSort}/></div>

        </div>
    </div>

  );
};

export default Home;