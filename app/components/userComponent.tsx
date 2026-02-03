"use client";
import { useEffect,useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers , addUser, deleteUser,updateUser} from "../store/userSlice";
import { RootState, AppDispatch } from "../store/store";


export default function UserComponent() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");
  const [editId, setEditId] = useState<string | null>(null);

  const dispatch = useDispatch<AppDispatch>();
  const { users, loading } = useSelector(
    (state: RootState) => state.users
  );

  const handleAdd = () => {
    dispatch(addUser({ name, email, contact }));
    setName("");
    setEmail("");
    setContact("");
  };



  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);





  if (loading) return <p>Loading...</p>;

  return (

<>
<table width="100%">
<tbody>
  <tr>
    <td><input value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" style={{border:'1px solid #000', padding:'10px 10px', width:'100%'}}/></td>
    <td><input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" style={{border:'1px solid #000', padding:'10px 10px', width:'100%'}} /></td>
    <td><input value={contact} onChange={(e) => setContact(e.target.value)} placeholder="Contact" style={{border:'1px solid #000', padding:'10px 10px', width:'100%'}} /></td>
    <td>
      {editId ? <><button className="update_btn"
       onClick={() =>
          dispatch(
          updateUser({
            id: editId!,
            data: { name, email, contact },
          })
           )
         }>
        Update
     </button></> : <><button onClick={handleAdd} className="add_btn">Add</button></>}
    
    
</td>
  </tr>
  </tbody>
</table>

    <table width="100%">
      <tbody>
      {users.map((u) => (
        <tr key={u._id}>
          <td></td>
          <td>{u.name}</td>
          <td>{u.email}</td>
          <td>{u.contact}</td>
          <td><button onClick={() => dispatch(deleteUser(u._id))} className="delete_btn">Delete</button></td>
          <td><button className="update_btn" onClick={() => {
  setEditId(u._id);
  setName(u.name);
    setEmail(u.email);
    setContact(u.contact);
}}>
  Update
</button></td>
          </tr>
      ))}
      </tbody>
    </table>
    </>
  );
}
