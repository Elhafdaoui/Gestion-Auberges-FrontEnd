import React, { useState,useEffect, useContext } from 'react';
import "./login.scss"
import 'bootstrap/dist/css/bootstrap.min.css';
import {Col,Container,Row,Form,Button} from 'react-bootstrap';
//import userIcon from '../../assets/login1.png';
import Authentification from '../../assets/login2.png'
import Welcome from '../WelcomeHeader/Welcome';
import lockIcon from '../../assets/testLock.png'
import TextField from '@mui/material/TextField';
import { toast, ToastContainer } from "react-toastify";
import {AuthContext} from "../../context/AuthContext";
import LoginFooter from "./LoginFooter"

//import { useNavigate } from 'react-router-dom';
import { Link, Navigate } from 'react-router-dom';
const Login = () => {

    // //Restreindre l'accés d'un admin
    // const navigate=useNavigate()
    // const login=()=>{
    //     localStorage.setItem('admin','admin')
    //     navigate('/dashboard')
    // }
    const initialValues = { email:"" , password:"" }; //Valeures initiales des champs.
    const [formValues,setFormValues] = useState(initialValues);//initialisation des valeurs des champs.
    const [formErrors,setFormErrors] = useState({}); //initialisation des erreurs.
    const [isSubmit,setIsSubmit] = useState(false); //Vérification si le form a été envoyé(submited) ou pas.
    const [isLoggedIn,setIsLoggedIn] = useState(false); // Check if user is authenticated @Zakaria
    const {dispatch}=useContext(AuthContext); //useContext hook pour assurer le protected route vers le dashboard
    const [newUser,setNewUser]=useState([])
    const [utilisateurs,setUtilisateurs]=useState([])

    const handleChange = (e) => {
        const {name,value}=e.target;
        setFormValues({...formValues, [name]:value});
    }

    <ToastContainer closeButton={false} position="left-right" />
    toast.configure({
        autoClose: 2500,
        draggable: true,
      });

      useEffect(()=>{
        fetch("http://localhost:8080/dashboard/users").then(resp=>{
            resp.json().then(r=>{
                setUtilisateurs(r)
            })
        })
      },[])

    //Validation du form lors du submit du formulaire.
    let user=null
    const handleSubmit=(e)=>{
        e.preventDefault();
        setFormErrors(validate(formValues));
        setIsSubmit(true);
        if(Object.keys(formErrors).length===0 && isSubmit){
            // console.log(user)
         
        fetch("http://localhost:8080/login"
        ,{
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify(formValues)
        }).then((resp)=>{
            resp.json().then((r)=>{
                if(r==="null"){
                    setIsLoggedIn(false);
                    // console.log(r)
                    toast.warn("Invalid email or password😕❗  ", {
                        theme:"colored",
                        width:"auto",
                        position: "bottom-right",
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        id:1
                      });
                }
                else{
                    console.log(r.email)
                    utilisateurs.forEach(utilisateur=>{
                        if(utilisateur.email===r.email && utilisateur.password===r.password){
                            user=utilisateur
                            dispatch({type:"LOGIN",payload:user})
                        }
                    })
                    
                    setIsLoggedIn(true);
                    //console.log(r)
                    toast.success("Connecté(e) avec succès 🔓✨", {
                        theme:"colored",
                        width:"auto",
                        position: "bottom-right",
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        id:1
                      });
                }
            })
        })
        
            

        }
        else if(Object.keys(formErrors).length!==0 && isSubmit){
            toast.error("Echec d'authentification 😩 !", {
                theme:"colored",
                position: "bottom-right",
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                id:1
              });
        }
        
    }

    
    //Affichage Erreur côté console.
    useEffect(()=>{
        // console.log(formErrors)
        if(Object.keys(formErrors).length===0 && isSubmit){
            // console.log(formValues);
        }
    },[formErrors])


    //Validation Du Formulaire.
    const validate = (values)=>{
        const errors = {}
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
        if(!values.email){
            errors.email =" L'email est obligatoire! ";
        }
        else if(!regex.test(values.email)){
            errors.email="Format de l'email est invalide!";
        }
        if(!values.password){
            errors.password = "Le mot de passe est obligatoire!";
        }
        else if(values.password.length < 4){
            errors.password="Mot de passe trop court!";
        }
        else if(values.password.length > 20){
            errors.password="Mot de passe trop long!";
        }

        {/*
                if(!values.role)
                            errors.role="Le rôle est obligatoire !";
                        
                        else if(values.role.toLowerCase()!=="admin" && values.role.toLowerCase()!=="gérant")
                            errors.role="Rôle doit être admin ou gérant";
                        y
        */}
     

        return errors;

    }

    
        
    

  return (
    <>
            <Welcome name="Bienvenue ✨🔓 " nom="S'authentifier"/>

            <Container >

                <Row  className='d-flex'>
                    <Col lg={4} md={6} sm={12} className="text-center mt-5 p-5" >
                        <img className='icon-img-Login' src={lockIcon} alt="iconUser" />

                        {Object.keys(formErrors).length===0 && isSubmit ? (<div style={{color:"white",border:"3px solid green", backgroundColor:"#009E60", marginLeft:"25px",width:"80%",borderRadius:"15px",padding:'5px'}}>Données valides ... ✔</div>) : "" }
                        {Object.keys(formErrors).length!==0 && isSubmit ? <div style={{color:"white",border:"2px solid crimson",backgroundColor:"#df4b52", marginLeft:"30px",width:"80%",borderRadius:"15px",padding:'5px'}}>Echec de connexion !</div> :""}
                        
                        <br />
                        
                         <Form onSubmit={handleSubmit} >

                            <Form.Group  className="mb-3" controlId="formBasicEmail">
                                <TextField color={Object.keys(formErrors).length===0?'success':'error'}  variant="standard" label="Email" className='d-flex' name="email" type="text" value={formValues.email} onChange={handleChange} />
                            </Form.Group>
                                <p style={{color:"red"}}> {formErrors.email} </p>

                                <Form.Group className="mb-3" controlId="formBasicPassword">
                                    <TextField color={Object.keys(formErrors).length===0?'success':'error'}  variant="standard" label="Mot de passe" className='d-flex' name="password" type="password" value={formValues.password} onChange={handleChange} />
                                </Form.Group>
                                <p style={{color:"red"}}>{formErrors.password}</p>
                            {/*
                                  <Form.Group className="mb-3" controlId="formBasicRole">
                                    <TextField id="standard-basic" variant="standard" label="Role" className='d-flex' name="role" type="text"  value={formValues.role} onChange={handleChange} />
                                    </Form.Group>
                                <p style={{color:"red"}}>{formErrors.role}</p>

                            */}
                            <div className='buttons'>
                                <Button className="button2" variant="btn btn-outline-primary " /*onClick={login}*/ >
                                    <Link to="/signup"> <span style={{color:"white"}}>S'inscrire</span></Link> 
                                </Button>
                                
                                <Button className="button1" variant="btn btn-outline-primary " type="submit" /*onClick={login}*/ >
                                    
                                    {Object.keys(formErrors).length===0 && isSubmit &&isLoggedIn  ?<Link to="/dashboard"><span style={{color:"white"}}>S'authentifier</span></Link>:"S'authentifier"}  
                                
                                </Button>

                            </div>
                                
                                

                        </Form>
                    </Col>

                    
                    <Col lg={8} className="d-none d-md-block">
                        <img className='authentification' src={Authentification} alt="Erreur : Image n'a pas pu être installer" />
                    </Col>

                </Row>
            </Container>
            <LoginFooter/>

        </>
  )
}

export default Login