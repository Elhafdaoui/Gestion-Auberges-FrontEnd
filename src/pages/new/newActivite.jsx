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

const NewActivite = ({ inputs, title }) => {
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
      const regexDate=/^(0[1-9]|1\d|2\d|3[01])\/(0[1-9]|1[0-2])\/(19|20)\d{2}$/; // format : dd/mm/yyyy
      const regexHeure=/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/

        
      /* Vérification de l'activité */
      if(!values.activite || values.activite.length<4 || values.activite.length>20 ) {
        if(!values.activite)
          errors.activite="Le nom de l'activite est obligatoire!";
    
        else if(values.activite.length<4)
          errors.activite="Le nom de l'activite est trop court!";
    
        else if(values.activite.length>13)
          errors.activite="Le nom de l'activite est trop long!";
       }
        //Vérification statut client
         if(!values.statut){
            errors.statut="Le statut de l'activité est obligatoire!";
          }
        //  else if(values.statut!=="Demandée" && values.statut!=="Très demandée" && values.statut!=="Peu demandée"){
        //    errors.statut="Statut doit être soit Demandée, Très demandée ou Peu demandée!";
        //  }
      //Vérification du lieu d'activité
         if(!values.lieu){
          errors.lieu="Le lieu d'activité est obligatoire!";
       }
        //Vérification du prix de l'activité
        if(!values.prix){
         errors.prix="Le prix de l'activité est obligatoire!";
       }
       else if(values.prix<0){
          errors.prix="Le prix de l'activité ne peut pas être négative!";
        }
        //Vérification de la recette des activités
        if(!values.recette){
          errors.recette="La recette de l'activité est obligatoire!";
        }
       else if(values.recette<0){
         errors.recette="La recette ne peut pas être négative !";
        }
        //Vérification de de la date de l'activité
    if(!values.date){
      errors.date="Le date de l'activité est obligatoire!";
    }
    else if(hasWhiteSpace(values.date)===true){
      errors.date="Veuillez Eliminez les espaces! "
    }
    else if(!regexDate.test(values.date)){
      errors.date="Le format de la date est invalide!";
    }
    //Validation Heure d'activité
    if(!values.heure)
      errors.heure="L'heure de l'activité est obligatoire!";
    else if(hasWhiteSpace(values.heure)===true)
      errors.heure="Veuillez Eliminiez les espaces!";
    else if(!regexHeure.test(values.heure))
      errors.heure="Heure invaldie!";    


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
       
      fetch("http://localhost:8080/dashboard/activites/new"
      ,{
          method:"POST",
          headers:{"Content-Type":"application/json"},
          body:JSON.stringify(data)
      }).then((resp)=>{
          resp.text().then((r)=>{
            console.log(r)
              if(r==="ajouter avec succès"){
                  toast.success("Nouvelle activité créer 🥳 ", {
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
                toast.warn("Cette activité existe déjà 🤭  ", {
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
      toast.error("Formulaire incomplet 😩 !", {
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
                          <MenuItem value={"Très demandée"}>Très demandée</MenuItem>
                          <MenuItem value={"Demandée"}>Demandée</MenuItem>
                          <MenuItem value={"Peu demandée"}>Peu demandée</MenuItem>
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

export default NewActivite;
