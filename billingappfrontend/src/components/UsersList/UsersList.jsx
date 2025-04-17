import { useState } from "react"
import { deleteUser } from "../../Service/UserService";
import toast from "react-hot-toast";

const UsersList = ({users, setUsers}) => {

  const [searchTerm, setSearchTerm] = useState("");

  const filteredUsers = users.filter(user=>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const deleteByUserId = async (id) =>{

    try {

      const response = await deleteUser(id)
      if(response.status===204){
        const updatedUsers=users.filter(user=>user.userId !== id);
        setUsers(updatedUsers)
        toast.success("User deleted")
      }
      else{
        toast.error("Unable to delete user")
      }

    } catch (error) {
        console.log(error)
        toast.error("Unable to delete user")
    }

  }
  
  return (
    <div className="category-list-container" style={{height:`100vh`, overflowY:`auto`, overflowX:`hidden`}}>
      <div className="row pe-2">
        <div className="input-group mb-3">
          <input type="text" 
          name="keyword" 
          id="keyword" 
          placeholder="Search by keyword" 
          onChange={(e)=>setSearchTerm(e.target.value)}
          value={searchTerm}
          className="form-control">
          </input>
          <span className="input-group-text bg-warning">
            <i className="bi bi-search"></i>
          </span>
        </div>
      </div>

      <div className="row g-3 pe-2">
        {
          filteredUsers.map((user,index) => (
            <div key={index} className="col-12">
            <div className="card-p3">
              <div className="d-flex align-item-center bg-dark" style={{padding: "10px", borderRadius: "8px" }}>
                <div className="flex-grow-1">
                  <h5 className="mb-1 text-white">{user.name}</h5>
                  <p className="mb-0 text-white">{user.email}</p>
                </div>
                <div className="p-3">
                  <button className="btn btn-danger btn-sm"
                  onClick={()=>deleteByUserId(user.userId)}>
                    <i className="bi bi-trash"></i>
                  </button>
                </div>
              </div>
            </div>
            </div>
          ))
        }
      </div>

    </div>
  )
}

export default UsersList