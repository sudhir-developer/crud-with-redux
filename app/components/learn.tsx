import { useState, useEffect} from "react";

interface User {
  id:string,
  name:string,
  email:string
}

export default function Learn(){
const [users, setUsers] = useState<User[]>([]);
const [loading, setLoading] = useState(false);
const [search, setSearch] = useState('');
const [currentPage, setCurrentPage] = useState(1);
const usersPerPage = 3;

    const fetchData = async ()=>{
        try{
        setLoading(true);
        const res = await fetch('https://jsonplaceholder.typicode.com/users');
        const data = await res.json();
        setUsers(data);
        setLoading(false);
        // console.log(data);
        }catch(error){
            console.log(error);
            setLoading(false);
        }
    }
    useEffect(()=>{
        fetchData();
       },[]);

  const searchTerm = search.toLowerCase();
  const filteredUsers = users.filter((item) =>
    item.name.toLowerCase().includes(searchTerm) ||
    item.email.toLowerCase().includes(searchTerm)
  );
// 📄 Pagination Logic
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(
    indexOfFirstUser,
    indexOfLastUser
  );
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);
// 📄 Pagination
  





    return(
        <>
       {loading ?(<p>Loading...</p>):
       (<div>
        <input type="text" value={search} onChange={(e)=>setSearch(e.target.value)}/>
        <hr/>
        <table>
            <tbody>
            {currentUsers?.map((s, index)=>(
             <tr key={index}>
               <td> {s.name}</td>
               <td> {s.email}</td>
            </tr>
            
            ))}
            </tbody>
        </table>
        {/* Pagination Buttons */}
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
        <hr/>
        <ul>
            {users?.map((u)=>(
             <li key={u.id}>{u.name}</li>
            ))}
        </ul>
       </div>)
        }
       
        </>
    );
}