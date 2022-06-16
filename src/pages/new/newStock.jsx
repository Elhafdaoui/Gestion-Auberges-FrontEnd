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

const NewStock = ({ inputs, title }) => {
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
      const regexPhone=/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im; //regexPhone
      const regexDate=/^(0[1-9]|1\d|2\d|3[01])\/(0[1-9]|1[0-2])\/(19|20)\d{2}$/; // format : dd/mm/yyyy

        
       /* Vérification du Stock */
    if(!values.produit || values.produit.length<4 || values.produit.length>20 ) {
      if(!values.produit)
        errors.produit="Le nom du produit est obligatoire!";
  
      else if(values.produit.length<3)
        errors.produit="Le nom du produit est trop court!";
  
      else if(values.produit.length>30)
        errors.produit="Le nom du produit est trop long!";
      }
   
    //Vérification du quantité initiale du produit dans le stock
  if(!values.quantiteInitiale){
    errors.quantiteInitiale="La quantité initial du produit dans le stock est obligatoire!";
  }
  else if(values.quantiteInitiale<0){
      errors.quantiteInitiale="La quantité ne peut pas être négative!";
  }  
  //Vérification du quantité restante du produit dans le stock
  if(!values.quantiteRestante){
    errors.quantiteRestante="La quantité restante du produit dans le stock est obligatoire!";
  }
  else if(values.quantiteRestante<0){
      errors.quantiteRestante="La quantité ne peut pas être négative!";
  }  
   //Vérification du nom fournisseur saisies
   if(!values.fournisseur){
    errors.fournisseur="Le nom complet du fournisseur est obligatoire!";
  }
  else if(values.fournisseur.length<3){
    errors.fournisseur="Nom fournisseur trop court! "
  }
  else if(values.fournisseur.length>30){
    errors.fournisseur="Nom fournisseur trop long!";
  }
  //Vérification de la ville du fournisseur
  if(!values.ville)
    errors.ville="La ville du fournisseur est obligatoire!";
    //Vérification du prix d'achat du produit chez le fournisseur
  if(!values.prix){
    errors.prix="Le prix d'achat du produit est obligatoire!";
  }
  else if(values.prix<0){
      errors.prix="Le prix ne peut pas être négative!";
  }
    //Vérification du statut du produit
  if(!values.statut){
    errors.statut="Le type est obligatoire!";
  }
  // else if(values.statut!=="Très demandé" && values.statut!=="Demandé" && values.statut!=="Peu demandé"){
  //   errors.statut="Statut doit être soit Très demandé, Demandé ou Peu demandé!";
  // }
    //Vérification de l'état du produit
    if(!values.etat){
      errors.etat="L'état du produit est obligatoire!";
    }
    // else if(values.etat!=="Excellente" && values.etat!=="Hors service" && values.etat!=="Périmé"){
    //   errors.etat="L'état doit être soit Excellente, Hors service ou Périmé!";
    // }
    //Vérification du format de la date d'import
    if(!values.dateImport){
    errors.dateImport="La date d'import est obligatoire!";
    }
    else if(hasWhiteSpace(values.dateImport)===true){
    errors.dateImport="Veuillez Eliminez les espaces! "
    }
    else if(!regexDate.test(values.dateImport)){
    errors.dateImport="Le format de la date est invalide!";
    }
    //Vérification du format de la date d'expiration
    if(!values.dateExpiration){
      errors.dateExpiration="La date d'expiration est obligatoire!";
      }
    else if(parseInt(values.dateExpiration.split('/',2)[1])<parseInt(values.dateImport.split('/',2)[1]) || parseInt(values.dateExpiration.split('/')[2]) < parseInt(values.dateImport.split('/')[2]) || (parseInt(values.dateExpiration.split('/',2)[1]) === parseInt(values.dateImport.split('/',2)[1]) && parseInt(values.dateExpiration.split('/',2)[0]) < parseInt(values.dateImport.split('/',2)[0]) )   ){
      errors.dateExpiration="Cette date est invalide!"
    }
    else if(hasWhiteSpace(values.dateExpiration)===true){
      errors.dateExpiration="Veuillez Eliminez les espaces! "
    }
    else if(!regexDate.test(values.dateExpiration)){
      errors.dateExpiration="Le format de la date est invalide!";
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
       //Vérification Cin client
      if(!values.cin){
        errors.cin = "Le cin est obligatoire!";
      }
  
     else if(values.cin.length!==7){
        errors.cin= "Le cin doit contenir 7 symboles!"
      }

      //Vérification de la recette des produits
      if(!values.recette){
        errors.recette="La recette de l'activité est obligatoire!";
      }
     else if(values.recette<0){
       errors.recette="La recette ne peut pas être négative !";
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
       
      fetch("http://localhost:8080/dashboard/stock/new"
      ,{
          method:"POST",
          headers:{"Content-Type":"application/json"},
          body:JSON.stringify(data)
      }).then((resp)=>{
          resp.text().then((r)=>{
            console.log(r)
              if(r==="ajouter avec succès"){
                  toast.success("Nouveau produit ajouter 🥳  ", {
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
                toast.warn("Ce produit existe déjà 🤭  ", {
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
                          <MenuItem value={"Très demandé"}>Très demandé</MenuItem>
                          <MenuItem value={"Demandé"}>Demandé</MenuItem>
                          <MenuItem value={"Peu demandé"}>Peu demandé</MenuItem>
                        </Select>
                     <p style={{color:"red"}}>{formErrors.statut}</p> 
                 </FormControl>
              </div>

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
                          <MenuItem value={"Hors service"}>Hors service</MenuItem>
                          <MenuItem value={"Périmé"}>Périmé</MenuItem>
                        </Select>
                     <p style={{color:"red"}}>{formErrors.etat}</p> 
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

export default NewStock;
