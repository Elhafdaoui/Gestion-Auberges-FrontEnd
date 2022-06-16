import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import "../../components/deleteConfirmation/dialogActivity.scss";
import { useEffect } from 'react';
import './updateForm.css'

import { toast} from "react-toastify";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});


export default function UpdateDialog({buttonTitle,getRowId}) {
  const [open, setOpen] = React.useState(false);
  const [data,setData] = React.useState({}); //data des champs du form
  const [formErrors,setFormErrors] = React.useState({}); //initialisation des erreurs.
  const [isSubmit,setIsSubmit] = React.useState(false); //Vérification si le form a été envoyé(submited) ou pas.
  const [activite,setactivite]=React.useState({})
  const [newActivite,setNewActivite]=React.useState({});
  

  useEffect(()=>{
    const getActivite = async ()=>{
        fetch(`http://localhost:8080/dashboard/activites/${getRowId}`).then((resp)=>{
         resp.json().then((r)=>{
          setactivite(r)
          setNewActivite(r)
         })
        })
    }
    getActivite()
  },[open])


//Handle Update
const handleUpdate=(e)=>{
  e.preventDefault()
  setIsSubmit(true)
  setFormErrors(validate(newActivite))
 
fetch(`http://localhost:8080/dashboard/activites/update/${getRowId}`
,{
    method:"PUT",
    headers:{"Content-Type":"application/json"},
    body:JSON.stringify(newActivite)
}).then((resp)=>{
    resp.text().then((r)=>{
      console.log(r)
        if(newActivite!==activite && Object.keys(formErrors).length===0 && isSubmit){
            toast.success("Modifier avec succès 👏 ", {
                theme:"colored",
                width:"auto",
                position: "bottom-right",
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                id:1
              });
              setOpen(false)
              window.location.reload(true)
        }
        else if(Object.keys(formErrors).length!==0 && isSubmit){
          toast.error("Champ(s) non valides ! ", {
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
          console.log(r)
          toast.info("Aucune modification n'a été faite sur cette activité🤭  ", {
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
     else if(values.statut!=="Demandée" && values.statut!=="Très demandée" && values.statut!=="Peu demandée"){
       errors.statut="Statut doit être soit Demandée, Très demandée ou Peu demandée!";
     }
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



  const handleClose = () => {
    setOpen(false);
  };
  const handleClickOpen = () => {
    setOpen(true);
  };
  

  //Form Handling 
  function hasWhiteSpace(s) {
    return (/\s/).test(s);
  }


 //handleChange pour les données
 const handleChange = (e)=>{
   setactivite("")
  const id=e.target.id
  const value=e.target.value
  setData({...data,[id]:value});
  setNewActivite({...newActivite,[id]:value})
};

  return (
    <div>
      <div className='updateButton' onClick={handleClickOpen}>
        Modifier
      </div>

      <Dialog
        fullWidth
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >

        <DialogTitle><span style={{color:"#E64556",fontSize:"25px"}}> {buttonTitle} </span></DialogTitle>
        <DialogContent className='dialogContent'>
         
        <div class="containerClass">
    <div class="title">Modification Activité !</div>
    <div class="content">
      <form >
        <div class="user-details">
          <div class="input-box">
            <span class="details">Activite</span>
            <input name="activite" id="activite" type="text" placeholder="Activite ..."required value={activite.activite} onChange={handleChange}/>
            <p style={{color:"red",marginTop:"8px"}}> {formErrors.activite} </p>
          </div>
          <div class="input-box">
            <span class="details">Lieu</span>
            <input name="lieu" id="lieu" type="text" placeholder="Agadir" required value={activite.lieu} onChange={handleChange}/>
            <p style={{color:"red",marginTop:"8px"}}> {formErrors.lieu} </p>
          </div>
          <div class="input-box">
            <span class="details">Prix</span>
            <input name="prix" id="prix" type="text" placeholder="1938DH" value={activite.prix}  required onChange={handleChange}/>
            <p style={{color:"red",marginTop:"8px"}}> {formErrors.prix} </p>
          </div>
          <div class="input-box">
            <span class="details">Statut</span>
            <input name="statut" id="statut" type="text" placeholder="Demandé, Très demandé, Peu demandée ..." value={activite.statut}  required onChange={handleChange}/>
            <p style={{color:"red",marginTop:"8px"}}> {formErrors.statut} </p>
          </div>
          <div class="input-box">
            <span class="details">Recette</span>
            <input name="recette" id="recette" type="text" placeholder="1937DH" value={activite.recette}  required onChange={handleChange}/>
            <p style={{color:"red",marginTop:"8px"}}> {formErrors.recette} </p>
          </div>
          <div class="input-box">
            <span class="details">Date</span>
            <input name="date" id="date" type="text" placeholder="20/05/2022" value={activite.date}  required onChange={handleChange}/>
            <p style={{color:"red",marginTop:"8px"}}> {formErrors.date} </p>
          </div>
          <div class="input-box">
            <span class="details">Heure</span>
            <input name="heure" id="heure" type="text" placeholder="16:59" value={activite.heure}  required onChange={handleChange}/>
            <p style={{color:"red",marginTop:"8px"}}> {formErrors.heure} </p>
          </div>

        </div> 
      </form>
    </div>
  </div>
         
        </DialogContent>
        <DialogActions>
          <div className='deleteButton ' onClick={handleClose}>Annuler</div>
          <div className='cancelButton ' onClick={handleUpdate}>Modifier</div>
        </DialogActions>
      </Dialog>
    </div>
  );
}