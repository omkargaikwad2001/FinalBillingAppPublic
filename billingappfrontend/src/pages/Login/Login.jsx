import { useContext, useState } from "react";
import "./Login.css";
import toast from "react-hot-toast";
import { login } from "../../Service/AuthService";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../context/AppContext";

const Login = () => {

    const {setAuthData} = useContext(AppContext)

    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState({
        email:"",
        password:"",
    })

    const onChangeHandler = (e) =>{
        const name = e.target.name;
        const value = e.target.value;
        setData((data)=>({...data,[name]:value}));
    }

    const onSubmitHandler = async (e)=>{
        e.preventDefault();
        setLoading(true);
        try {
            const response = await login(data);
            if(response.status===200){
                toast.success("Login successfull");
                localStorage.setItem("token",response.data.token);
                localStorage.setItem("role",response.data.role);
                setAuthData(response.data.token,response.data.role);
                navigate("/dashboard");
            }
        } catch (error) {
            console.log(error);
            toast.error("Email or password is invalid");
        }finally{
            setLoading(false);
        }
    }

  return (
    <div className="login-container">
      <div className="form-box">
        <h2>Sign in</h2>
        <p className="subtitle">Sign in below to access your account</p>
        <form onSubmit={onSubmitHandler}>
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="yourname@example.com"
            required
            onChange={onChangeHandler}
            value={data.email}
          />

          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="**********"
            required
            onChange={onChangeHandler}
            value={data.password}
          />

          <button type="submit">Sign in</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
