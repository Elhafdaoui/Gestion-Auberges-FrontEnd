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
  const [charge,setcharge]=React.useState({})
  const [newcharge,setNewcharge]=React.useState({});
  

  useEffect(()=>{
    const getUser = async ()=>{
        fetch(`http://localhost:8080/dashboard/charges/${getRowId}`).then((resp)=>{
         resp.json().then((r)=>{
          setcharge(r)
          setNewcharge(r)
         })
        })
    }
    getUser()
  },[open])


//Handle Update
const handleUpdate=(e)=>{
  e.preventDefault()
  setIsSubmit(true)
  setFormErrors(validate(newcharge))
 
fetch(`http://localhost:8080/dashboard/charges/update/${getRowId}`
,{
    method:"PUT",
    headers:{"Content-Type":"application/json"},
    body:JSON.stringify(newcharge)
}).then((resp)=>{
    resp.text().then((r)=>{
      console.log(r)
        if(newcharge!==charge && Object.keys(formErrors).length===0 && isSubmit){
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
          toast.info("Aucune modification n'a été faite sur cette charge🤭  ", {
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
  const regexDate=/^(0[1-9]|1\d|2\d|3[01])\/(0[1-9]|1[0-2])\/(19|20)\d{2}$/; // format : dd/mm/yyyy

  const errors = {}

    
    /* Vérification Charges */
  //Validation input charge
  if(!values.charge)
    errors.charge="Veuillez spécifier la charge!";
  else if(values.charge.length<3)
    errors.charge="Charge trop courte";
  else if(values.charge.length>30)
    errors.charge="Charge trop long";
  

  //Vérification du format de la date de Facturation
if(!values.dateFacturation){
  errors.dateFacturation="La date de facturation est obligatoire!";
}

else if(hasWhiteSpace(values.dateFacturation)===true){
  errors.dateFacturation="Veuillez Eliminez les espaces! "
}
else if(!regexDate.test(values.dateFacturation)){
  errors.dateFacturation="Le format de la date est invalide!";
}

 //Vérification du format de la date de paiement
 if(!values.datePaiement){
  errors.datePaiement="La date de paiement est obligatoire!";
}

else if(hasWhiteSpace(values.datePaiement)===true){
  errors.datePaiement="Veuillez Eliminez les espaces! "
}
else if(!regexDate.test(values.datePaiement)){
  errors.datePaiement="Le format de la date est invalide!";
}
else if(parseInt(values.datePaiement.split('/',2)[1])<parseInt(values.dateFacturation.split('/',2)[1]) || parseInt(values.datePaiement.split('/')[2]) < parseInt(values.dateFacturation.split('/')[2]) || (parseInt(values.datePaiement.split('/',2)[1]) === parseInt(values.dateFacturation.split('/',2)[1]) && parseInt(values.datePaiement.split('/',2)[0]) < parseInt(values.dateFacturation.split('/',2)[0]) )   ){
  errors.datePaiement="Cette date est invalide!"
}

//Statut de la charge
if(!values.statut)
  errors.statut="Le statut est obligatoire!";
else if(values.statut!=="Payé" && values.statut!=="Non payé")
  errors.statut="Le statut peut être soit Payé ou Non payé!";

//Montant à payer
if(!values.montant)
  errors.montant="Le montant est obligatoire!";
else if(values.montant<0)
  errors.montant="Le montant ne peut pas être négative";  


  return errors;

}    

 //handleChange pour les données
 const handleChange = (e)=>{
   setcharge("")
  const id=e.target.id
  const value=e.target.value
  setData({...data,[id]:value});
  setNewcharge({...newcharge,[id]:value})
  
  
};
console.log(data)
console.log(newcharge)

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
    <div class="title">Modification Charge !</div>
    <div class="content">
      <form >
        <div class="user-details">
          <div class="input-box">
            <span class="details">Charge</span>
            <input name="charge" id="charge" type="text" placeholder="Blé"required value={charge.charge} onChange={handleChange}/>
            <p style={{color:"red",marginTop:"8px"}}> {formErrors.charge} </p>
          </div>
          <div class="input-box">
            <span class="details">Date Facturation</span>
            <input name="dateFacturation" id="dateFacturation" type="text" placeholder="03/04/2022" required value={charge.dateFacturation} onChange={handleChange}/>
            <p style={{color:"red",marginTop:"8px"}}> {formErrors.dateFacturation} </p>
          </div>
          <div class="input-box">
            <span class="details">Date Paiement</span>
            <input name="datePaiement" id="datePaiement" type="text" placeholder="30KG" value={charge.datePaiement}  required onChange={handleChange}/>
            <p style={{color:"red",marginTop:"8px"}}> {formErrors.datePaiement} </p>
          </div>
          <div class="input-box">
            <span class="details">Statut</span>
            <input name="statut" id="statut" type="text" placeholder="Payé, Non payé ..." value={charge.statut}  required onChange={handleChange}/>
            <p style={{color:"red",marginTop:"8px"}}> {formErrors.statut} </p>
          </div>
          <div class="input-box">
            <span class="details">Montant à payer</span>
            <input name="montant" id="montant" type="text" placeholder="1293DH" value={charge.montant}  required onChange={handleChange}/>
            <p style={{color:"red",marginTop:"8px"}}> {formErrors.montant} </p>
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