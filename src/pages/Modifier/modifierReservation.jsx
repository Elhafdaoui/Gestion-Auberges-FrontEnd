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
  const [chambre,setChambre]=React.useState({})
  const [newChambre,setNewChambre]=React.useState({});
  


  
  useEffect(()=>{
    const getUser = async ()=>{
        fetch(`http://localhost:8080/dashboard/reservations/${getRowId}`).then((resp)=>{
         resp.json().then((r)=>{
          setChambre(r)
          setNewChambre(r)
         })
        })
    }
    getUser()
  },[open])


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
  
  else if(values.etat!=="Excellente" && values.etat!=="Sale" && values.etat!=="Hors service"){
    errors.etat="L'état de la chambre doit être soit Excellente, Sale ou Hors service!";
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
  else if(values.methode.toLowerCase()!=="cache" && values.methode.toLowerCase()!=="paiement en ligne" ){
    errors.methode="Méthode de paiement doit être soit Cache soit Paiement en ligne!";
  } 

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
  else if(values.statut!=="Occupée" && values.statut!=="Réservée" && values.statut!=="Libre"){
    errors.statut="Le statut de la chambre doit être soit Occupée, Réservée ou Libre!";
  }

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

const date = "25/02/2022"
console.log((date.split('/',2)[1]))

//Handle Update
const handleUpdate=(e)=>{
  e.preventDefault()
  setIsSubmit(true)
  setFormErrors(validate(newChambre))
 
fetch(`http://localhost:8080/dashboard/reservations/update/${getRowId}`
,{
    method:"PUT",
    headers:{"Content-Type":"application/json"},
    body:JSON.stringify(newChambre)
}).then((resp)=>{
    resp.text().then((r)=>{
      console.log(r)
        if(newChambre!==chambre && Object.keys(formErrors).length===0 && isSubmit){
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
          toast.info("Aucune modification n'a été faite sur cette chambre🤭  ", {
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
  

  //Form Handling 
  function hasWhiteSpace(s) {
    return (/\s/).test(s);
  }

     //Validation Du Formulaire.
    

 //handleChange pour les données
 const handleChange = (e)=>{
   setChambre("")
  const id=e.target.id
  const value=e.target.value
  setData({...data,[id]:value});
  setNewChambre({...newChambre,[id]:value})
  
  
};
console.log(data)
console.log(newChambre)

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
    <div class="title">Modification Réservation !</div>
    <div class="content">
      <form >
        <div class="user-details">
          <div class="input-box">
            <span class="details">Chambre</span>
            <input name="chambre" id="chambre" type="text" placeholder="Chambre 1"required value={chambre.chambre} onChange={handleChange}/>
            <p style={{color:"red",marginTop:"8px"}}> {formErrors.chambre} </p>
          </div>
          <div class="input-box">
            <span class="details">Etat</span>
            <input name="etat" id="etat" type="text" placeholder="Excellente, Sale, Hors service" required value={chambre.etat} onChange={handleChange}/>
            <p style={{color:"red",marginTop:"8px"}}> {formErrors.etat} </p>
          </div>
          <div class="input-box">
            <span class="details">Client</span>
            <input name="client" id="client" type="text" placeholder="El Hafdaoui Zakaria" value={chambre.client}  required onChange={handleChange}/>
            <p style={{color:"red",marginTop:"8px"}}> {formErrors.client} </p>
          </div>
          <div class="input-box">
            <span class="details">Cin</span>
            <input name="cin" id="cin" type="text" placeholder="J530808" value={chambre.cin}  required onChange={handleChange} disabled/>
            <p style={{color:"red",marginTop:"8px"}}> {formErrors.cin} </p>
          </div>
          <div class="input-box">
            <span class="details">Nationalite</span>
            <input name="nationalite" id="nationalite" type="text" placeholder="Marocaine" value={chambre.nationalite}  required onChange={handleChange}/>
            <p style={{color:"red",marginTop:"8px"}}> {formErrors.nationalite} </p>
          </div>
          <div class="input-box">
            <span class="details">Email</span>
            <input id="email" type="text" placeholder="xxx@xxx.xxx" value={chambre.email} required onChange={handleChange}/>
            <p style={{color:"red",marginTop:"8px"}}> {formErrors.email} </p>
          </div>
          <div class="input-box">
            <span class="details">Phone</span>
            <input name="phone" id="phone" type="text" placeholder="0613608998" value={chambre.phone}  required onChange={handleChange}/>
            <p style={{color:"red",marginTop:"8px"}}> {formErrors.phone} </p>
          </div>
          <div class="input-box">
            <span class="details">Méthode de Paiement</span>
            <input name="methode" id="methode" type="text" placeholder="Cache, Paiement en ligne ..." value={chambre.methode}  required onChange={handleChange}/>
            <p style={{color:"red",marginTop:"8px"}}> {formErrors.methode} </p>
          </div>
          <div class="input-box">
            <span class="details">Montant</span>
            <input name="montant" id="montant" type="text" placeholder="1938DH" value={chambre.montant}  required onChange={handleChange}/>
            <p style={{color:"red",marginTop:"8px"}}> {formErrors.montant} </p>
          </div>
          <div class="input-box">
            <span class="details">Recette</span>
            <input name="recette" id="recette" type="text" placeholder="1029DH" value={chambre.recette} required onChange={handleChange}/>
            <p style={{color:"red",marginTop:"8px"}}> {formErrors.recette} </p>
          </div>
          <div class="input-box">
            <span class="details">Statut</span>
            <input name="statut" id="statut" type="text" placeholder="Occupée, Réservée, Libre" value={chambre.statut}  required onChange={handleChange}/>
            <p style={{color:"red",marginTop:"8px"}}> {formErrors.statut} </p>
          </div>
          <div class="input-box">
            <span class="details">Date Réservation</span>
            <input name="dateReservation" id="dateReservation" type="text" placeholder="24/02/2022" value={chambre.dateReservation}  required onChange={handleChange}/>
            <p style={{color:"red",marginTop:"8px"}}> {formErrors.dateReservation} </p>
          </div>
          <div class="input-box">
            <span class="details">Date Fin Réservation</span>
            <input name="finReservation" id="finReservation" type="text" placeholder="28/02/2022" value={chambre.finReservation}  required onChange={handleChange}/>
            <p style={{color:"red",marginTop:"8px"}}> {formErrors.finReservation} </p>
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