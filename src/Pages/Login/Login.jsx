import { Link } from 'react-router-dom';
import loginImg from '../../assetsss/images/login/login.svg';
import { useContext, useState } from 'react';
import { AuthContext } from '../../providers/AuthProvider';

const Login = () => {

  const {SignIn} = useContext(AuthContext);
  const [success, setSuccess]= useState('');
  const [error, setError] = useState('');
  const handleLogin = e =>{
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password= form.password.value;
    const user = {email, password}
    console.log(user);
    SignIn(email,password)
    .then(result =>{
      const loggedUser = result.user;
      console.log(loggedUser);
      setSuccess('logged in succeessfully');
    })
    .catch(error=> {
      console.log(error);
      setError('user login unsucceessfull');

    })
    
  }
    return (
        <div className="hero min-h-screen ">
  <div className="hero-content flex-col lg:flex-row">
    <div className="mr-12 w-1/2">
      <img src={loginImg} alt="" />
    </div>
    <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
      <div className="card-body">
      <h1 className="text-5xl font-bold text-center">Login</h1>
        <form onSubmit={handleLogin}>
        <div className="form-control">
        
        <label className="label">
          <span className="label-text">Email</span>
        </label>
        <input type="text" placeholder="email" className="input input-bordered" name='email' />
      </div>
      <div className="form-control">
        <label className="label">
          <span className="label-text">Password</span>
        </label>
        <input name='password' type="text" placeholder="password" className="input input-bordered" />
        <label className="label">
          <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
        </label>
      </div>
      <div className="form-control mt-6">
        
        <input className="btn btn-primary" type="submit" value="Login" />
      </div>
        </form>
        <p>New to Car Doctor? <Link className='text-red-400' to='/signUp'>Register Now</Link></p>
        <p>{success}</p>
        <p>{error}</p>
      </div>
    </div>
  </div>
</div>
    );
};

export default Login;