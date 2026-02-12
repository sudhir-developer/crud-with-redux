import { useState, useEffect} from "react";

interface User {
  id:string,
  name:string,
  email:string,
  address:Adress,
}
interface Adress{
street:string
} 

export default function Learn(){
  const [user, setUser] = useState<User[]>([]);
  const [loading, setLoading]= useState(false);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 3;
  const fetchUser = async()=>{
    try{
    setLoading(true);
    const res = await fetch("https://jsonplaceholder.typicode.com/users");
    const data = await res.json();
    setUser(data);
    setLoading(false);
    }
    catch(error){
        console.log(error);
        setLoading(false);
    }
  }
useEffect(()=>{
    fetchUser();
},[])


const searchData = user.filter((item)=>
    item.name.toLowerCase().includes(search) || item.email.toLowerCase().includes(search));
     
// 📄 Pagination Logic
const indexOfLastUser = currentPage * usersPerPage;
const indexOfFirstUser = indexOfLastUser - usersPerPage;
const currentUsers = searchData.slice(
  indexOfFirstUser,
  indexOfLastUser
);
const totalPages = Math.ceil(searchData.length / usersPerPage);
// 📄 Pagination




    return(
        <>
       <div>
        <h1 style={{fontSize:'20px', fontWeight:'bold', marginTop:'20px'}}>Learn search and pagination</h1>
         
         {loading ? (<p>Loading...</p>):
         (<div>
            <input type="text" value={search} onChange={(e)=>setSearch(e.target.value)}/>
            <br/><br/>
            <table width="100%">
            <thead>
                    <tr style={{background:"#000", color:"#fff", padding:'20px'}}>
                        <th>Sr.No.</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Address</th>
                    </tr>
                    </thead>
                <tbody>
                {currentUsers?.map((u,index)=>(
                    <tr key={index}>
                    <td>{index +1}</td>
                    <td>{u.name}</td>
                    <td>{u.email}</td>
                    <td>{u.address.street}</td>
                    </tr>
                ))}
            </tbody>
             </table>
             <div>
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index}
                onClick={() => setCurrentPage(index + 1)}
                style={{
                  margin: "5px",
                  fontWeight:
                    currentPage === index + 1 ? "bold" : "normal",
                }}
              >
                {index + 1}
              </button>
            ))}
          </div>
         </div>) 
         }

       </div>
        </>
    );
}