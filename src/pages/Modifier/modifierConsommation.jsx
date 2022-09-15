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
  const [consommation,setconsommation]=React.useState({})
  const [newconsommation,setNewconsommation]=React.useState({});
  

  useEffect(()=>{
    const getconsommation = async ()=>{
        fetch(`http://localhost:8080/dashboard/consommations/${getRowId}`).then((resp)=>{
         resp.json().then((r)=>{
          setconsommation(r)
          setNewconsommation(r)
         })
        })
    }
    getconsommation()
  },[open])


//Handle Update
const handleUpdate=(e)=>{
  e.preventDefault()
  setIsSubmit(true)
  setFormErrors(validate(newconsommation))
 
fetch(`http://localhost:8080/dashboard/consommations/update/${getRowId}`
,{
    method:"PUT",
    headers:{"Content-Type":"application/json"},
    body:JSON.stringify(newconsommation)
}).then((resp)=>{
    resp.text().then((r)=>{
        if(newconsommation!==consommation && Object.keys(formErrors).length===0 && isSubmit){
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
          toast.info("Aucune modification n'a été faite sur cette consommation🤭  ", {
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
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i; //regexMail
  const regexPhone=/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im; //regexPhone
  const regexDate=/^(0[1-9]|1\d|2\d|3[01])\/(0[1-9]|1[0-2])\/(19|20)\d{2}$/; // format : dd/mm/yyyy
  const regexHeure=/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/
    
     /* Vérification de la consommation */

//Vérification du nom de la consommation (produit)
if(!values.produit || values.produit.length<4 || values.produit.length>20 ) {
  if(!values.produit)
    errors.produit="Le nom du produit est obligatoire!";

  else if(values.produit.length<2)
    errors.produit="Le nom du produit est trop court!";

  else if(values.produit.length>30)
    errors.produit="Le nom du  est trop long!";
}

//Vérification du prix de la consommation
if(!values.prix){
  errors.prix="Le prix de la consommation est obligatoire!";
}

else if(values.prix<0){
    errors.prix="Le prix ne peut pas être négative!";
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

//Vérification Cin client
if(!values.cin){
  errors.cin = "Le cin est obligatoire!";
}

else if(values.cin.length!==7){
  errors.cin= "Le cin doit contenir 7 symboles!"
}

//Vérification du quantité(s) de la consommation
if(!values.quantite){
  errors.quantite="La quantité du produit à consommer est obligatoire!";
}
else if(values.quantite<0){
    errors.quantite="La quantité ne peut pas être négative!";
}
//Vérification du restaurant sur lequel un client va consommer
if(!values.restaurant || values.restaurant.length<4 || values.restaurant.length>20 ) {
  if(!values.restaurant)
    errors.restaurant="Le nom du restaurant est obligatoire!";

  else if(values.restaurant.length<4)
    errors.restaurant="Le nom du restaurant est trop court!";

  else if(values.restaurant.length>20)
    errors.restaurant="Le nom du restaurant est trop long!";
}
 //Vérification de la recette des consommation
 if(!values.recette){
  errors.recette="La recette de la consommation est obligatoire!";
}

else if(values.recette<0){
    errors.recette="La recette ne peut pas être négative!";
}

//Vérification de de la date de consommation
if(!values.date){
  errors.date="Le date de réservation est obligatoire!";
}
else if(hasWhiteSpace(values.date)===true){
  errors.date="Veuillez Eliminez les espaces! "
}
else if(!regexDate.test(values.date)){
  errors.date="Le format de la date est invalide!";
}

if(!values.heure)
  errors.heure="L'heure de la consommation est obligatoire!";
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

     //Validation Du Formulaire.
    

 //handleChange pour les données
 const handleChange = (e)=>{
   setconsommation("")
  const id=e.target.id
  const value=e.target.value
  setData({...data,[id]:value});
  setNewconsommation({...newconsommation,[id]:value})
  
  
};
console.log(data)
console.log(newconsommation)

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
    <div class="title">Modification Consommation !</div>
    <div class="content">
      <form >
        <div class="user-details">
          <div class="input-box">
            <span class="details">Produit</span>
            <input name="produit" id="produit" type="text" placeholder="Poulet ..."required value={consommation.produit} onChange={handleChange}/>
            <p style={{color:"red",marginTop:"8px"}}> {formErrors.produit} </p>
          </div>
          <div class="input-box">
            <span class="details">Prix</span>
            <input name="prix" id="prix" type="text" placeholder="50DH" required value={consommation.prix} onChange={handleChange}/>
            <p style={{color:"red",marginTop:"8px"}}> {formErrors.prix} </p>
          </div>
          <div class="input-box">
            <span class="details">Client</span>
            <input name="client" id="client" type="text" placeholder="El Hafdaoui Zakaria" value={consommation.client}  required onChange={handleChange}/>
            <p style={{color:"red",marginTop:"8px"}}> {formErrors.client} </p>
          </div>
          <div class="input-box">
            <span class="details">Cin</span>
            <input name="cin" id="statut" type="text" placeholder="J530808" value={consommation.cin}  required onChange={handleChange} disabled/>
            <p style={{color:"red",marginTop:"8px"}}> {formErrors.cin} </p>
          </div>
          <div class="input-box">
            <span class="details">Email</span>
            <input name="email" id="email" type="text" placeholder="xxx@xxx.xxx" value={consommation.email}  required onChange={handleChange}/>
            <p style={{color:"red",marginTop:"8px"}}> {formErrors.email} </p>
          </div>
          <div class="input-box">
            <span class="details">Phone</span>
            <input name="phone" id="phone" type="text" placeholder="0613609009" value={consommation.phone}  required onChange={handleChange}/>
            <p style={{color:"red",marginTop:"8px"}}> {formErrors.phone} </p>
          </div>
          <div class="input-box">
            <span class="details">Quantité</span>
            <input name="quantite" id="quantite" type="text" placeholder="quantité" value={consommation.quantite}  required onChange={handleChange}/>
            <p style={{color:"red",marginTop:"8px"}}> {formErrors.quantite} </p>
          </div>
          <div class="input-box">
            <span class="details">Restaurant</span>
            <input name="restaurant" id="restaurant" type="text" placeholder="Restaurant 1" value={consommation.restaurant}  required onChange={handleChange}/>
            <p style={{color:"red",marginTop:"8px"}}> {formErrors.restaurant} </p>
          </div>
          <div class="input-box">
            <span class="details">Recette</span>
            <input name="recette" id="recette" type="text" placeholder="101DH" value={consommation.recette}  required onChange={handleChange}/>
            <p style={{color:"red",marginTop:"8px"}}> {formErrors.recette} </p>
          </div>
          <div class="input-box">
            <span class="details">Date</span>
            <input name="date" id="date" type="text" placeholder="20/05/2022" value={consommation.date}  required onChange={handleChange}/>
            <p style={{color:"red",marginTop:"8px"}}> {formErrors.date} </p>
          </div>
          <div class="input-box">
            <span class="details">Heure</span>
            <input name="heure" id="heure" type="text" placeholder="16:59" value={consommation.heure}  required onChange={handleChange}/>
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