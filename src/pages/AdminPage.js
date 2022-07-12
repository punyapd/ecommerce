import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
        
import { userList  ,deleteUser} from "../actions/userAction";
import { Link, useNavigate } from "react-router-dom";
import Loader from "../components/Loader";

function AdminPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const usersList = useSelector((state) => state.usersList);
  const { users, error, loading } = usersList;

  const loginuser = useSelector((state) => state.loginuser);
  const {userInfo} = loginuser

  const userDelete = useSelector(state => state.userDelete)
  const { success } = userDelete
 

  useEffect(() => {
    if (userInfo && userInfo.isAdmin){
       dispatch(userList())
      } else{
          
          navigate('/login')
      }
     
  }, [ dispatch, success ,  userInfo ]);

  const handleDelete = (id) => {
  if(window.confirm("Are you sure you want to delte this user ")){
    dispatch(deleteUser(id))
  }
   
  }
  


  

  

  return loading ? (
    <Loader />
  ) : error ? (
    <div className="alert alert-danger mt-5">{error}</div>
  ) : (
    <div className="container">
      <div className="row">
        <div className="col-md-10 col-sm-12 mx-auto">
          <h5 className="text-center mb-4 mt-5">USERS</h5>
          <table className="table table-dark table-striped">
            <thead>
              <tr>
                <th scope="col">Id</th>
                <th scope="col">email</th>
                <th scope="col">Name</th>
                <th scope="col">Admin</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id}>
                  <td>{user._id}</td>
                  <td>{user.email}</td>
                  <td>{user.name}</td>
                  <td>
                    {user.isAdmin ? (
                      <i
                        className="fas fa-check"
                        style={{ color: "green" }}
                      ></i>
                    ) : (
                      <i className="fas fa-times" style={{ color: "red" }} />
                    )}
                  </td>
                  <td>
                    <Link to = {`/admin/user/${user._id}/edit`}>
                    <button className="btn-sm"
                  >
                      <i className="fa-solid fa-pen-to-square"></i>
                    </button></Link>
                    <button className="btn-sm" 
                    onClick={() => handleDelete(user._id)}>
                      <i
                        className="fa-solid fa-trash-can"b
                        style={{ color: "red" }}
                      ></i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
export default AdminPage;
