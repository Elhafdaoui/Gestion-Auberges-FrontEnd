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

const NewRestaurant = ({ inputs, title }) => {
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


     //Validation Du Formulaire.
     const validate = (values)=>{

      const errors = {}


        /* Vérification des Restaurants */
     //Vérification restaurant   
    if(!values.restaurant || values.restaurant.length<4 || values.restaurant.length>20 ) {
      if(!values.restaurant)
        errors.restaurant="Le nom du restaurant est obligatoire!";

      else if(values.restaurant.length<4)
        errors.restaurant="Le nom du restaurant est trop court!";

      else if(values.restaurant.length>20)
        errors.restaurant="Le nom du restaurant est trop long!";
    }

     //Vérification du prix du restaurant
     if(!values.prix){
      errors.prix="Le prix du restaurant est obligatoire!";
    }
    
    else if(values.prix<0){
        errors.prix="Le prix ne peut pas être négative!";
    }

    //Vérification de la nature du restaurant
    if(!values.nature){
      errors.nature="Le nature du restaurant est obligatoire!";
    }
    // else if(values.nature!=="Moderne" && values.nature!=="Traditionnel"){
    //   errors.nature="Statut peut être soit Moderne ou Traditionnel";
    // }

    //Vérification du statut du restaurant
    if(!values.statut){
      errors.statut="Le statut du restaurant est obligatoire!";
    }
    // else if(values.statut!=="Très demandé" && values.statut!=="Demandé" && values.statut!=="Peu demandé"){
    //   errors.statut="Statut doit être soit Demandé, Très demandé ou Peu demandé!";
    // }
    //Vérification de l'état du restaurant
    if(!values.etat){
      errors.etat="L'état du restaurant est obligatoire!";
    }
    // else if(values.etat!=="Excellente" && values.etat!=="Sale" && values.etat!=="Hors service"){
    //   errors.etat="Statut doit être soit Excellente, Sale ou Hors service!";
    // }
      //Vérification Nombre de palces
    if(!values.places)
      errors.places="Veuillez spécifier le nombre de places";
    else if(values.places<0)
      errors.places="Le nombre de places ne peut pas être négative!"; 
     
       //Vérification de la recette des restaurants
    if(!values.recette){
      errors.recette="La recette du restaurant est obligatoire!";
    }
    
    else if(values.recette<0){
        errors.recette="La recette ne peut pas être négative!";
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
       
      fetch("http://localhost:8080/dashboard/restaurants/new"
      ,{
          method:"POST",
          headers:{"Content-Type":"application/json"},
          body:JSON.stringify(data)
      }).then((resp)=>{
          resp.text().then((r)=>{
            console.log(r)
              if(r==="ajouter avec succès"){
                  toast.success("Nouveau restaurant créer🥳  ", {
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
                toast.warn("Ce restaurant existe déjà 🤭  ", {
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
                          <MenuItem value={"Sale"}>Sale</MenuItem>
                          <MenuItem value={"Hors service"}>Hors service</MenuItem>
                        </Select>
                     <p style={{color:"red"}}>{formErrors.etat}</p> 
                 </FormControl>
              </div>

              {/* Nature */} 
              <div className="formInput" >
                <FormControl className='d-flex' variant="standard" sx={{ m: 1, minWidth: 120 }}>
                        <InputLabel  color={Object.keys(formErrors).length===0?'success':'error'} id="demo-simple-select-standard-label">Nature</InputLabel>
                        <Select
                        value={data.nature}
                        id="nature"
                        onChange={(e)=>{
                          setFormErrors(validate(data));
                          setData({...data,nature:e.target.value})
                        }}
                        >
                          <MenuItem value={"Moderne"}>Moderne</MenuItem>
                          <MenuItem value={"Traditionnel"}>Traditionnel</MenuItem>
                        </Select>
                     <p style={{color:"red"}}>{formErrors.nature}</p> 
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

export default NewRestaurant;
