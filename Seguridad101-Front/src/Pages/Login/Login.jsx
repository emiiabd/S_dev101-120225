import React, { useEffect } from "react";
import NavBar from "../../Components/NavBar/NavBar";
import { Footer, LoginForm, PresentationBanner } from "../../Components";
import './Login.css'
import { useNavigate } from "react-router-dom";
import { ParallaxBanner } from "react-scroll-parallax";
import { useGlobalContext } from "../../Context/GlobalContext";
import { useForm } from "../../Hooks";
import { GET, POST } from "../../fetching/http.fetching";
import { useAuthContext } from "../../Context/AuthContext";


const Login = () => {
  // Context
  const navigate = useNavigate();
  const { deleteError, setUser, getter } = useGlobalContext();
  const { validateSchema: validationLogin, validatesFormInputs } = useForm(['username', 'password']);
  const { setIsAuthenticated } = useAuthContext();

  useEffect(() => {
    deleteError('all');
  }, []);

  //Handlers
  const handleLoginSubmit = async (e) => {
    try{
      e.preventDefault();
      const formData = new FormData(e.target)
      validatesFormInputs(validationLogin, formData)
      const loginForm = {
        username: formData.get('username'),
        password: formData.get('password'),
      }
      const response = await POST(`api/auth/login`, loginForm)

      console.log(response)
      if (!response.ok) throw response
      
      const acces_token = response.payload.token
      sessionStorage.setItem('access_token', acces_token)

      const person = await GET(`api/auth/${response.payload.user.refId}`)
      
      const username = {
        ...response.payload.user,
        ...person.payload
      }

      sessionStorage.setItem('username', JSON.stringify(username))
      setUser(username)
      getter()
      
      setIsAuthenticated(true)
      navigate('/log/s101/pending')

    }
    catch(error){
      console.log(error);
    }
  };


  return (
    <>
    <ParallaxBanner layers={[{ image: "./intro_slide_3-30.jpg", speed: 30 }]} className="presentationBanner min-vh-100" >
      <NavBar/>
      <div className="container loginScreen d-flex justify-content-center align-items-center">
      <PresentationBanner from={"login"}/>
      <LoginForm handleLoginSubmit={handleLoginSubmit} title={"Login"} spanTitle={''}/>
      </div>
      
    </ParallaxBanner>
    <Footer/>
    </>
  );
};

export default Login;
