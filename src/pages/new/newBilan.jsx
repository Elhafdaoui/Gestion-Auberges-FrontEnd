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

const NewBilan = ({ inputs, title }) => {
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

        
       /* Vérification du Bilan | Recettes */

      if(!values.recettes)
        errors.recettes="Veuillez spécifier le total des recettes de ce mois!";
      else if(values.recettes<0)
        errors.recettes="Le total des recettes ne peut pas être négative"; 

        //vérification total des dépenses
      if(!values.depenses)
        errors.depenses="Veuillez spécifier le total des dépenses de ce mois!";
        //Vérification des totals des dépenses (charges)
      else if(values.depenses<0)
        errors.depenses="Le total des charges ne peut pas être négative"; 
        
        //Vérification du bilan
      if(!values.bilan)
        errors.bilan="Le bilan de ce mois est obligatoire!";

      //Vérification du format de du bilan
      if(!values.date)
        errors.date="Veuillez spécifier la date de ce bilan!";

      else if(hasWhiteSpace(values.date)===true)
        errors.date="Veuillez Eliminez les espaces! "

      else if(!regexDate.test(values.date))
        errors.date="Le format de la date est invalide!";

        //Vérification du Statut bilan
      if(!values.statut)
        errors.statut="Le statut est obligatoire!";

      // else if(values.statut!=="Perdant" && values.statut!=="Gagnant")
      //   errors.statut="Statut doit être soit Perdant ou Gagnant!";

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
       
      fetch("http://localhost:8080/dashboard/recettes/new"
      ,{
          method:"POST",
          headers:{"Content-Type":"application/json"},
          body:JSON.stringify(data)
      }).then((resp)=>{
          resp.text().then((r)=>{
            console.log(r)
              if(r==="ajouter avec succès"){
                  toast.success("Nouveau bilan créer 🥳  ", {
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
                toast.warn("Le bilan pour ce mois a déjà été établi 🤭  ", {
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
                        <MenuItem value={"Gagnant"}>Gagnant</MenuItem>
                        <MenuItem value={"Perdant"}>Perdant</MenuItem>
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

export default NewBilan;
