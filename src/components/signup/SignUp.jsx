import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Col,Container,Row,Form,Button} from 'react-bootstrap';
// import userIcon from '../../assets/enrollment.png';
import Authentification from '../../assets/Authentification.png'
import './SignUp.scss'
import Welcome from '../WelcomeHeader/Welcome';
import { Link, Navigate} from 'react-router-dom';
import TextField from '@mui/material/TextField';
import { toast, ToastContainer } from "react-toastify";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import{storage} from "../../firebase";

const SignUp = () => {

    //Valeur initiales des champs
const initialValues={
    username:"",
    email:"",
    phone:"",
    password:"",
    confirmation:""
};
const [formValues,setFormValues] = useState(initialValues);//initialisation des valeurs des champs.
const [formErrors,setFormErrors] = useState({}); //initialisation des erreurs.
const [isSubmit,setIsSubmit] = useState(false); //Vérification si le form a été envoyé(submited) ou pas.
const [file, setFile] = useState(""); //Image
    
    const handleChange = (e) => {
        const {name,value}=e.target;
        setFormValues({...formValues, [name]:value});
        console.log(formValues)
    }


    <ToastContainer closeButton={false} position="left-right" />
    toast.configure({
        autoClose: 2500,
        draggable: true,
      });

  
    //Validation du form lors du submit du formulaire.



    const handleSubmit=(e)=>{
        e.preventDefault();
        setIsSubmit(true);
        setFormErrors(validate(formValues));
        const user={formValues}        
        if(Object.keys(formErrors).length===0 && isSubmit){
            console.log(user)
         
        fetch("http://localhost:8080/signup"
        ,{
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify(formValues)
        }).then((resp)=>{
            resp.text().then((r)=>{
                if(r==="Email existe déjà ! "){
                    toast.info("Email existe déjà 😕❗  ", {
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
                    toast.success("Un nouveau utilisateur a été ajouté ✔😁", {
                        theme:"colored",
                        width:"auto",
                        position: "bottom-right",
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        id:1
                      });
                      <Navigate to="../"/>
                }
            })
        })
        
            

        }
        
        else if(Object.keys(formErrors).length!==0 && isSubmit){
            toast.error("Echec d'inscription 😩 !", {
                theme:"colored",
                position: "bottom-right",
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                id:1
              });
        }
    }


    //fonction qui vérifie s'il y'a de l'espace dans le mot ou pas
    function hasWhiteSpace(s) {
        return (/\s/).test(s);
      }

    //Validation Du Formulaire.
    const validate = (values)=>{
        const errors = {}; //tableau d'erreurs
        
        //expression régulière du mail
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
        
        //RegEx phone
        const regexPhone=/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;

        if(!values.username){
            errors.username="Le nom d'utilisateur est obligatoire!";
        }
        else if(values.username.length<3){
            errors.username="Le nom d'utilisateur est trop court!";
        }
        else if(values.username.length>20){
            errors.username="Le nom d'utilisateur est trop long!";
        }
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
        if(!values.confirmation){
            errors.confirmation="La confirmation du mot de passe est obligatoire!";
        }
        else if(values.confirmation!==values.password){
            errors.confirmation="Confirmation de mot de passe incorrecte!";
        }
        if(!values.phone){
            errors.phone="Le numéro est obligatoire!";
        }
        
        else if(hasWhiteSpace(values.phone)===true){
            errors.phone="Veuillez Eliminez les espaces! "
        }
        //Vérification numéro marocain
        else if(!regexPhone.test(values.phone)){
            errors.phone="Le numéro est invalide!";
        }
        if(!values.roles){
            errors.roles="Le rôle est obligatoire !";
        }
        // else if(values.roles.toLowerCase()!=="admin" && values.roles.toLowerCase()!=="gérant"){
        //     errors.roles="Rôle doit être admin ou gérant";
        // }

        return errors;

    }

    useEffect(()=>{
        const uploadFile =()=>{
          const name=new Date().getTime()+file.name
          console.log(name)
          const storageRef = ref(storage, file.name);
    
          const uploadTask = uploadBytesResumable(storageRef, file);
    
    
          uploadTask.on('state_changed', 
          (snapshot) => {
        
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
        switch (snapshot.state) {
          case 'paused':
            console.log('Upload is paused');
            break;
          case 'running':
            console.log('Upload is running');
            break;
            default:
              break;
        }
      }, 
      (error) => {
        console.log(error)
      }, 
      () => {
        
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setFormValues((formValues) => ({...formValues, img:downloadURL}))
        });
      }
    );
    
        }
        file && uploadFile()
      },[file])


    return (
        <>
            <Welcome name="Inscription 🔐" nom="S'inscrire"/>

            <Container>

                <Row  className='d-flex' >
                    <Col lg={4} md={6} sm={12} className="text-center mt-5 p-5" >


    
    {/* <img className='icon-img' src={userIcon} alt="iconUser" /> */}
{/* 
        {Object.keys(formErrors).length===0 && isSubmit ? (<div style={{color:"white",border:"3px solid green", backgroundColor:"#28a752", marginLeft:"25px",width:"80%",borderRadius:"15px",padding:'5px'}}>Données valides ... ✔</div>) : "" }
        {Object.keys(formErrors).length!==0 && isSubmit ? <div style={{color:"white",border:"2px solid crimson",backgroundColor:"#df4b52", marginLeft:"30px",width:"80%",borderRadius:"15px",padding:'5px'}}>Echec de connexion !</div> :""} */}

        <br />

        <Form>

        <div className="newContainer" >
          <div className="left">
            <img className='icon-img' style={{width:"100px",height:"100px",borderRadius:"50%",objectFit:"cover"}}
              src={
                file
                  ? URL.createObjectURL(file)
                  : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
              }
              alt=""
            />
            {Object.keys(formErrors).length===0 && isSubmit ? (<div style={{color:"white",border:"3px solid green", marginTop:"25px" ,backgroundColor:"#009E60", marginLeft:"25px",width:"80%",borderRadius:"15px",padding:'5px'}}>Données valides ... ✔</div>) : "" }
                        {Object.keys(formErrors).length!==0 && isSubmit ? <div style={{color:"white",border:"2px solid crimson",backgroundColor:"#df4b52", marginTop:"25px" ,marginLeft:"30px",width:"80%",borderRadius:"15px",padding:'5px'}}>Echec de connexion !</div> :""}
          </div>
          <div className="right">
              
              <div className="formInput">
                <label htmlFor="img">
                   <DriveFolderUploadOutlinedIcon style={{cursor:"pointer"}} className="icon" />
                </label>
                <input
                  type="file"
                  name='img'
                  id="img"
                  onChange={(e) =>setFile(e.target.files[0])}
                  style={{ display: "none" }}
                />
              </div>

          </div>
      </div>
                             
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <TextField color={Object.keys(formErrors).length===0?'success':'error'} variant="standard" label="Username" className='d-flex' name="username" type="text" value={formValues.username} onChange={handleChange} />
            </Form.Group>
                <p style={{color:"red"}}> {formErrors.username} </p>


            <Form.Group className="mb-3" controlId="formBasicEmail">
                <TextField color={Object.keys(formErrors).length===0?'success':'error'} variant="standard" label="Email" className='d-flex' name="email" type="email" value={formValues.email} onChange={handleChange} />
            </Form.Group>
                <p style={{color:"red"}}> {formErrors.email} </p>
            
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <TextField color={Object.keys(formErrors).length===0?'success':'error'} variant="standard" label="Phone" className='d-flex' name="phone" type="text" value={formValues.phone} onChange={handleChange} />
            </Form.Group>
                <p style={{color:"red"}}> {formErrors.phone} </p>

            <Form.Group className="mb-3" controlId="formBasicPassword">
                <TextField color={Object.keys(formErrors).length===0?'success':'error'} variant="standard" label="Mot de passe" className='d-flex' name="password" type="password" value={formValues.password} onChange={handleChange} />
            </Form.Group>
                <p style={{color:"red"}}> {formErrors.password} </p>
                                    
            <Form.Group className="mb-3" controlId="formBasicPassword">
                <TextField color={Object.keys(formErrors).length===0?'success':'error'} variant="standard" label="Confirmation de mot de passe" className='d-flex' name="confirmation" type="password" value={formValues.confirm} onChange={handleChange} />
            </Form.Group>
                 <p style={{color:"red"}}> {formErrors.confirmation} </p>
{/* 
            <Form.Group className="mb-3" controlId="formBasicRole">
                <TextField color={Object.keys(formErrors).length===0?'success':'error'} variant="standard" label="Role" className='d-flex' name="roles" type="text"  value={formValues.roles} onChange={handleChange} />
            </Form.Group>
                <p style={{color:"red"}}>{formErrors.roles}</p> */}

            <Form.Group className="mb-3" controlId="formBasicRole">
                    <FormControl className='d-flex' variant="standard" sx={{ m: 1, minWidth: 120 }}>
                        <InputLabel color={Object.keys(formErrors).length===0?'success':'error'} id="demo-simple-select-standard-label">Role</InputLabel>
                        <Select
                        name="roles"
                        value={formValues.roles}
                        labelId="demo-simple-select-standard-label"
                        id="demo-simple-select-standard"
                        onChange={handleChange}
                        label="Role"
                    >

                        <MenuItem value={"admin"}>Admin</MenuItem>
                        <MenuItem value={"gérant"}>Gérant</MenuItem>
                    </Select>
                <p style={{color:"red",marginTop:"1rem"}}>{formErrors.roles}</p> 
                </FormControl>
        </Form.Group>
            <Button variant="btn btn-outline-primary" type="submit" onClick={handleSubmit}>
                {Object.values(formErrors).length===0 && isSubmit ? <Link to="/"><span style={{color:"white"}}>S'inscrire</span></Link>:<Link to="#"><span style={{color:"white"}}>S'inscrire</span></Link>}
            </Button>

            <Button variant="btn btn-outline-primary " >
                 <Link to="/"> <span style={{color:"white"}}>Déjà inscrit ?</span></Link>
            </Button>

        </Form>
    </Col>

        <Col lg={8} className="d-none d-md-block">
            <img className='authentificationImg' src={Authentification} alt="Erreur : Image n'a pas pu être installer" />
        </Col>

    </Row>
                
 </Container>

        </>
    )

      
};

export default SignUp;