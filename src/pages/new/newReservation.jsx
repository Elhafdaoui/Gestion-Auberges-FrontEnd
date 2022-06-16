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

const NewReservation = ({ inputs, title }) => {
  const [file, setFile] = useState(""); //Image
  const [data,setData] = useState({}); //data des champs du form
  const [formErrors,setFormErrors] = useState({}); //initialisation des erreurs.
  const [isSubmit,setIsSubmit] = useState(false); //Vérification si le form a été envoyé(submited) ou pas.

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

  function hasWhiteSpace(s) {
    return (/\s/).test(s);
  }

     //Validation Du Formulaire.
     const validate = (values)=>{

      const errors = {}
      const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i; //regexMail
      const regexPhone=/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im; //regexPhone
      const regexDate=/^(0[1-9]|1\d|2\d|3[01])\/(0[1-9]|1[0-2])\/(19|20)\d{2}$/; // format : dd/mm/yyyy

        
        /* Vérification Réservations */

    //Vérification Chambre
    if(!values.chambre || values.chambre.length<4 || values.chambre.length>20 ) {
      if(!values.chambre)
        errors.chambre="Le nom de la chambre est obligatoire!";

      else if(values.chambre.length<4)
        errors.chambre="Le nom de la chambre est trop court!";

      else if(values.chambre.length>13)
        errors.chambre="Le nom de la chambre est trop long!";
    }
   
     //Vérification de l'état des chambres
     if(!values.etat){
      errors.etat="L'état de la chambre est obligatoire!";
    }
    
    // else if(values.etat!=="Excellente" && values.etat!=="Sale" && values.etat!=="Hors service"){
    //   errors.etat="L'état de la chambre doit être soit Excellente, Sale ou Hors service!";
    // }

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

    //Vérification phone
    if(!values.phone){
      errors.phone="Le numéro est obligatoire!";
        }
     else if(hasWhiteSpace(values.phone)===true){
      errors.phone="Veuillez Eliminez les espaces! "
        }
     else if(!regexPhone.test(values.phone)){
        errors.phone="Le numéro est invalide!";
      }
      //Vérification d'email
    if(!values.email){
      errors.email="Le numéro est obligatoire!";
        }
     else if(hasWhiteSpace(values.email)===true){
      errors.email="Veuillez Eliminez les espaces! "
        }
     else if(!regex.test(values.email)){
        errors.email="Email invalde!";
      }

    //Vérification de la nationalité du client
    if(!values.nationalite){
      errors.nationalite="La nationalité du client est obligatoire!";
    }

    //Vérification du montant payé par le client au cours du réservation
    if(!values.montant)
      errors.montant="Veuillez spécifier le montant payé lors de la réservation!";
    else if(values.montant<0)
      errors.montant="Le montant ne peut pas être négative";

      //Vérification Cin client
      if(!values.cin){
        errors.cin = "Le cin est obligatoire!";
    }
    
    else if(values.cin.length!==7){
        errors.cin= "Le cin doit contenir 7 symboles!"
    }

      
    //Méthode de paiement
    if(!values.methode){
      errors.methode="Veuillez spécifier la méthode de paiement!";
    }
    // else if(values.methode.toLowerCase()!=="cash" && values.methode.toLowerCase()!=="paiement en ligne" ){
    //   errors.methode="Statut doit être soit Cash soit Paiement en ligne!";
    // } 

    //Vérification de la recette des chambres
    if(!values.recette){
      errors.recette="La recette de la chambre est obligatoire!";
    }
    
    else if(values.recette<0){
        errors.recette="La recette ne peut pas être négative!";
    }
    
    //Vérification du statut de la chambre
    if(!values.statut){
      errors.statut="Le statut de la chambre est obligatoire!";
    }
    // else if(values.statut!=="Occupée" && values.statut!=="Réservée" && values.statut!=="Libre"){
    //   errors.statut="Le statut de la chambre doit être soit Occupée, Réservée ou Libre!";
    // }

     //Vérification de de la date début de réservation
     if(!values.dateReservation){
      errors.dateReservation="Le date de réservation est obligatoire!";
    }
    else if(hasWhiteSpace(values.dateReservation)===true){
      errors.dateReservation="Veuillez Eliminez les espaces! "
    }
    else if(!regexDate.test(values.dateReservation)){
      errors.dateReservation="Le format de la date est invalide!";
    }
    //Vérification de de la date de fin réservation
    if(!values.finReservation){
      errors.finReservation="Le date de fin de réservation est obligatoire!";
    }
    else if(hasWhiteSpace(values.finReservation)===true){
      errors.finReservation="Veuillez Eliminez les espaces! "
    }
    else if(parseInt(values.finReservation.split('/',2)[1])<parseInt(values.dateReservation.split('/',2)[1]) || parseInt(values.finReservation.split('/')[2]) < parseInt(values.dateReservation.split('/')[2]) || (parseInt(values.finReservation.split('/',2)[1]) === parseInt(values.dateReservation.split('/',2)[1]) && parseInt(values.finReservation.split('/',2)[0]) < parseInt(values.dateReservation.split('/',2)[0]) )   ){
      errors.finReservation="Cette date est invalide!"
    }
    else if(!regexDate.test(values.finReservation)){
      errors.finReservation="Le format de la date est invalide!";
    }

    return errors;

  }



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
      console.log(formErrors)
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
       
      fetch("http://localhost:8080/dashboard/reservations/new"
      ,{
          method:"POST",
          headers:{"Content-Type":"application/json"},
          body:JSON.stringify(data)
      }).then((resp)=>{
          resp.text().then((r)=>{
            console.log(r)
              if(r==="ajouter avec succès"){
                  toast.success("Nouvelle réservation créer 🥳  ", {
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
                toast.warn("Cette chambre est reservée pour cette date 🤭  ", {
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
                  onChange={(e) => setFile(e.target.files[0])}
                  style={{ display: "none" }}
                />
              </div>

              {inputs.map((input) => (
                <div className="formInput" key={input.id}>
                      <TextField id={input.id} placeholder={input.placeholder} color={Object.keys(formErrors).length===0?'success':'error'} variant="standard" label={input.label} className='d-flex' type={input.type} value={data[input[input.id]]} onChange={handleChange} />
                  <p style={{color:"red"}}> {formErrors[input.id]} </p>
                </div>
              ))}

                {/* Etat */}
              <div className="formInput" >
                <FormControl className='d-flex' variant="standard" sx={{ m: 1, minWidth: 120 }}>
                        <InputLabel  color={Object.keys(formErrors).length===0?'success':'error'} id="demo-simple-select-standard-label">Etat</InputLabel>
                        <Select
                        value={data.etat}
                        id="etat"
                        onChange={(e)=>{
                          setFormErrors(validate(data));
                          setData({...data,etat:e.target.value})
                        }}
                        >
                          <MenuItem value={"Excellente"}>Excellente</MenuItem>
                          <MenuItem value={"Sale"}>Sale</MenuItem>
                          <MenuItem value={"Hors service"}>Hors service</MenuItem>
                        </Select>
                     <p style={{color:"red"}}>{formErrors.etat}</p> 
                 </FormControl>
              </div>

                {/* Methode */}
                <div className="formInput" >
                <FormControl className='d-flex' variant="standard" sx={{ m: 1, minWidth: 120 }}>
                        <InputLabel  color={Object.keys(formErrors).length===0?'success':'error'} id="demo-simple-select-standard-label">Methode de Paiement</InputLabel>
                        <Select
                        value={data.methode}
                        id="methode"
                        onChange={(e)=>{
                          setFormErrors(validate(data));
                          setData({...data,methode:e.target.value})
                        }}
                        >
                          <MenuItem value={"Cache"}>Cache</MenuItem>
                          <MenuItem value={"Paiement en ligne"}>Paiement en ligne</MenuItem>
                        </Select>
                     <p style={{color:"red"}}>{formErrors.methode}</p> 
                 </FormControl>
              </div>

              {/* Statut */}
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
                          <MenuItem value={"Occupée"}>Occupée</MenuItem>
                          <MenuItem value={"Réservée"}>Réservée</MenuItem>
                          <MenuItem value={"Libre"}>Libre</MenuItem>
                        </Select>
                     <p style={{color:"red"}}>{formErrors.statut}</p> 
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

export default NewReservation;
