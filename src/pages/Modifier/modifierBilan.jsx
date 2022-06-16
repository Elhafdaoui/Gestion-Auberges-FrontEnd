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
  const [recettes,setrecettes]=React.useState({})
  const [newrecettes,setNewrecettes]=React.useState({});
  

  useEffect(()=>{
    const getUser = async ()=>{
        fetch(`http://localhost:8080/dashboard/recettes/${getRowId}`).then((resp)=>{
         resp.json().then((r)=>{
          setrecettes(r)
          setNewrecettes(r)
         })
        })
    }
    getUser()
  },[open])


//Handle Update
const handleUpdate=(e)=>{
  e.preventDefault()
  setIsSubmit(true)
  setFormErrors(validate(newrecettes))
 
fetch(`http://localhost:8080/dashboard/recettes/update/${getRowId}`
,{
    method:"PUT",
    headers:{"Content-Type":"application/json"},
    body:JSON.stringify(newrecettes)
}).then((resp)=>{
    resp.text().then((r)=>{
      console.log(r)
        if(newrecettes!==recettes && Object.keys(formErrors).length===0 && isSubmit){
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
          toast.info("Aucune modification n'a été faite sur ce recettes🤭  ", {
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



  const handleClose = () => {
    setOpen(false);
  };
  const handleClickOpen = () => {
    setOpen(true);
  };
  

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

  else if(values.statut!=="Perdant" && values.statut!=="Gagnant")
    errors.statut="Statut doit être soit Perdant ou Gagnant!";

return errors;

}    

 //handleChange pour les données
 const handleChange = (e)=>{
   setrecettes("")
  const id=e.target.id
  const value=e.target.value
  setData({...data,[id]:value});
  setNewrecettes({...newrecettes,[id]:value})
  
  
};
console.log(data)
console.log(newrecettes)

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
    <div class="title">Modification Bilan !</div>
    <div class="content">
      <form >
        <div class="user-details">
          <div class="input-box">
            <span class="details">Recette</span>
            <input name="recettes" id="recettes" type="text" placeholder="Blé"required value={recettes.recettes} onChange={handleChange}/>
            <p style={{color:"red",marginTop:"8px"}}> {formErrors.recettes} </p>
          </div>
          <div class="input-box">
            <span class="details">Dépenses</span>
            <input name="depenses" id="depenses" type="text" placeholder="800 DH" required value={recettes.depenses} onChange={handleChange}/>
            <p style={{color:"red",marginTop:"8px"}}> {formErrors.depenses} </p>
          </div>
          <div class="input-box">
            <span class="details">Bilan</span>
            <input name="bilan" id="bilan" type="text" placeholder="1029DH" value={recettes.bilan}  required onChange={handleChange}/>
            <p style={{color:"red",marginTop:"8px"}}> {formErrors.bilan} </p>
          </div>
          <div class="input-box">
            <span class="details">Date</span>
            <input name="date" id="date" type="text" placeholder="29/03/2022" value={recettes.date}  required onChange={handleChange}/>
            <p style={{color:"red",marginTop:"8px"}}> {formErrors.date} </p>
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