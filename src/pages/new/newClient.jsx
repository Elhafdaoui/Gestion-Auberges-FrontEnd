import "./new.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useState, useEffect} from "react";
import { toast} from "react-toastify";
import TextField from '@mui/material/TextField';
import{storage} from "../../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';

const New = ({ inputs, title }) => {
  const [file, setFile] = useState(""); //Image
  const [data,setData] = useState({}); //data des champs du form
  const [formErrors,setFormErrors] = useState({}); //initialisation des erreurs.
  const [isSubmit,setIsSubmit] = useState(false); //Vérification si le form a été envoyé(submited) ou pas.
  const [clients,setClients]=useState({})

  useEffect(()=>{
    fetch("http://localhost:8080/dashboard/clients").then(res=>{
      res.json().then(r=>{
        setClients(r)
      })
    })
  },[])

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
      setData((data) => ({...data, img:downloadURL}))
    });
  }
);

    }
    file && uploadFile()
  },[file])
  console.log(data)
  
  function hasWhiteSpace(s) {
    return (/\s/).test(s);
  }

     //Validation Du Formulaire.
     const validate = (values)=>{

      const errors = {}
      const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i; //regexMail
      const regexPhone=/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im; //regexPhone
      const regexDate=/^(0[1-9]|1\d|2\d|3[01])\/(0[1-9]|1[0-2])\/(19|20)\d{2}$/; // format : dd/mm/yyyy

        
        /* Vérification Clients */

      if(!values.email){
          errors.email ="L'email est obligatoire! ";
      }
      else if(!regex.test(values.email)){
          errors.email="Format de l'email est invalide!";
      }

      clients.forEach(client=>{
        if(!values.cin){
          errors.cin = "Le cin est obligatoire!";
      }
      
      else if(values.cin.length!==7){
          errors.cin= "Le cin doit contenir 7 symboles!"
      }
      else if(client.cin===values.cin){
        errors.cin= "Ce client existe déjà!"
      }
      })

      if(!values.phone){
        errors.phone="Le numéro est obligatoire!";
    }
    
    else if(hasWhiteSpace(values.phone)===true){
        errors.phone="Veuillez Eliminez les espaces! "
    }
    else if(!regexPhone.test(values.phone)){
        errors.phone="Le numéro est invalide!";
    }

    //Vérification du format de la date d'arrivée
    if(!values.dateArrivee){
      errors.dateArrivee="La date d'arrivée est obligatoire!";
    }
  
    else if(hasWhiteSpace(values.dateArrivee)===true){
      errors.dateArrivee="Veuillez Eliminez les espaces! "
    }
    else if(!regexDate.test(values.dateArrivee)){
      errors.dateArrivee="Le format de la date est invalide!";
    }

     //Vérification du format de la date de sortie
     if(!values.dateSortie){
      errors.dateSortie="Le date de sortie est obligatoire!";
    }
  
    else if(hasWhiteSpace(values.dateSortie)===true){
      errors.dateSortie="Veuillez Eliminez les espaces! "
    }
    else if(!regexDate.test(values.dateSortie)){
      errors.dateSortie="Le format de la date est invalide!";
    }
    else if(parseInt(values.dateSortie.split('/',2)[1])<parseInt(values.dateArrivee.split('/',2)[1]) || parseInt(values.dateSortie.split('/')[2]) < parseInt(values.dateArrivee.split('/')[2]) || (parseInt(values.dateSortie.split('/',2)[1]) === parseInt(values.dateArrivee.split('/',2)[1]) && parseInt(values.dateSortie.split('/',2)[0]) < parseInt(values.dateArrivee.split('/',2)[0]) )   ){
      errors.dateSortie="Cette date est invalide!"
    }

    // Vérification du type de client : Avec ou sans réservation
    if(!values.type){
      errors.type="Veuillez préciser le type du client!";
    }
    else if(values.type!=="Avec réservation" && values.type!=="Sans réservation"){
      errors.type="Type du client doit être : Avec réservation ou Sans réservation!";
    }

     //Validation du total saisies
    if(!values.total){
      errors.total="Le total payé est doit être mensionner!";
    }
  
    else if(hasWhiteSpace(values.total)===true){
      errors.total="Veuillez Eliminez les espaces! "
    }
    else if(values.total<0){
      errors.total="Le total ne peut pas être négative!";
    }

  //Vérification du nom client saisies
    if(!values.client){
      errors.client="Le nom complet du client est obligatoire!";
    }
    else if(values.client.length<3){
      errors.client="Nom client trop court! "
    }
    else if(values.client.length>30){
      errors.client="Nom client trop long!";
    }

    //Vérification statut client
    if(!values.statut){
      errors.statut="Le statut est obligatoire!";
    }
    // else if(values.statut!=="Active" && values.statut!=="Passive" && values.statut!=="En cours"){
    //   errors.statut="Statut doit être soit Active, Passive ou En cours!";
    // }
    //Vérification de l'age client
    if(!values.age){
      errors.age="L'age est obligatoire!";
    }
    else if(values.age<=0){
      errors.age="Ce client n'est pas né(e) 🙄!";
    }
    else if(values.age>0  && values.age<10){
      errors.age="Ce client est encore mineur🙄!";
    }
    else if(values.age>130){
      errors.age="L'age est trop grand!";
    }
    //Vérification de l'adress client
    if(!values.adresse){
      errors.adresse="L'adresse du client est obligatoire!";
    }
    //Vérification de la nationalité du client
    if(!values.nationalite){
      errors.nationalite="La nationalité du client est obligatoire!";
    }
    //Vérification de l'origine du client
    if(!values.origine){
      errors.origine="L'origine du client est obligatoire!";
    }
    else if(values.origine.toLowerCase()!=="booking" && values.origine.toLowerCase()!=="agence de voyage" && values.origine.toLowerCase()!=="particulier"){
      errors.origine="L'origine du client doit être soit booking, agence de voyage ou particulier!";
    }

    return errors;

  }

  console.log(formErrors)


      useEffect(()=>{
        //console.log(formErrors)
        if(Object.keys(formErrors).length===0 && isSubmit){
            console.log(data);
        }
    },[formErrors])

      //handleChange pour les données
      const handleChange = (e)=>{
        const id=e.target.id
        const value=e.target.value
        setFormErrors(validate(data));
        setData({...data,[id]:value});
      };

      console.log(data)

    toast.configure({
        autoClose: 2500,
        draggable: true,
      });
      const handleSubmit=(e)=>{
        e.preventDefault()
        setFormErrors(validate(data));
        setIsSubmit(true)
        const user={data}
        console.log(user)
        if(Object.keys(formErrors).length===0 && isSubmit){
          console.log(user)
       
      fetch("http://localhost:8080/dashboard/clients/new"
      ,{
          method:"POST",
          headers:{"Content-Type":"application/json"},
          body:JSON.stringify(data)
      }).then((resp)=>{
          resp.text().then((r)=>{
            console.log(r)
              if(r==="ajouter avec succès"){
                  toast.success("Nouveau client créer 🥳 ", {
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
                toast.warn("Ce client existe déjà 🤭  ", {
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
      toast.error("Formulaire incomplet 😩 ", {
          theme:"colored",
          position: "bottom-right",
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          id:1
        });
  }

}

  

  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>{title}</h1>
        </div>
        <div className="bottom">
          <div className="left">
            <img
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
            <form onSubmit={handleSubmit}>
              
              <div className="formInput">
                <label htmlFor="img">
                  Image: <DriveFolderUploadOutlinedIcon className="icon" />
                </label>
                <input
                  type="file"
                  id="img"
                  onChange={(e) =>setFile(e.target.files[0])}
                  style={{ display: "none" }}
                />
              </div>

              {inputs.map((input) => (
                <div className="formInput" key={input.id}>
                      <TextField id={input.id} placeholder={input.placeholder} color={Object.keys(formErrors).length===0?'success':'error'} variant="standard" label={input.label} className='d-flex' type={input.type} value={data[input[input.id]]} onChange={handleChange} />
                  <p style={{color:"red"}}> {formErrors[input.id]} </p>
                </div>
              ))}

                {/*Statut*/}
              <div className="formInput" >
                <FormControl className='d-flex' variant="standard" sx={{ m: 1, minWidth: 120 }}>
                        <InputLabel  color={Object.keys(formErrors).length===0?'success':'error'} id="demo-simple-select-standard-label">Statut</InputLabel>
                        <Select
                        value={data.statut}
                        id="statut"
                        onChange={(e)=>{
                          setFormErrors(validate(data));
                          setData({...data,statut:e.target.value})
                        }}
                    >
                        <MenuItem value={"Active"}>Active</MenuItem>
                        <MenuItem value={"Passive"}>Passive</MenuItem>
                        <MenuItem value={"En cours"}>En cours</MenuItem>
                        </Select>
                     <p style={{color:"red"}}>{formErrors.statut}</p> 
                 </FormControl>
              </div>

                {/* Type */}
              <div className="formInput" >
                <FormControl className='d-flex' variant="standard" sx={{ m: 1, minWidth: 120 }}>
                        <InputLabel  color={Object.keys(formErrors).length===0?'success':'error'} id="demo-simple-select-standard-label">Type</InputLabel>
                        <Select
                        value={data.type}
                        id="type"
                        onChange={(e)=>{
                          setFormErrors(validate(data));
                          setData({...data,type:e.target.value})
                        }}
                    >
                        <MenuItem value={"Avec réservation"}>Avec réservation</MenuItem>
                        <MenuItem value={"Sans réservation"}>Sans réservation</MenuItem>
                        </Select>
                     <p style={{color:"red"}}>{formErrors.type}</p> 
                 </FormControl>
              </div>

              {/* Origine */}
              <div className="formInput" >
                <FormControl className='d-flex' variant="standard" sx={{ m: 1, minWidth: 120 }}>
                        <InputLabel  color={Object.keys(formErrors).length===0?'success':'error'} id="demo-simple-select-standard-label">Origine</InputLabel>
                        <Select
                        value={data.origine}
                        id="origine"
                        onChange={(e)=>{
                          setFormErrors(validate(data));
                          setData({...data,origine:e.target.value})
                        }}
                    >
                        <MenuItem value={"Agence de voyage"}>Agence de voyage</MenuItem>
                        <MenuItem value={"Booking"}>Booking</MenuItem>
                        <MenuItem value={"Particulier"}>Particulier</MenuItem>
                        </Select>
                     <p style={{color:"red"}}>{formErrors.type}</p> 
                 </FormControl>
              </div>

              
                 <button type='submit' className="buttonAjouter"> Ajouter </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default New;
