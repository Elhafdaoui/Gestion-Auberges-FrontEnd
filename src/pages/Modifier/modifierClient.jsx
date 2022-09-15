import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import "../../components/deleteConfirmation/dialogActivity.scss";
import { useEffect } from 'react';
// import TextField from '@mui/material/TextField';
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
  const [user,setUser]=React.useState({})
  const [newUser,setNewUser]=React.useState({});


  //Recupérer le client pour l'afficher sur les champs du form
  useEffect(()=>{
    const getUser = async ()=>{
        fetch(`http://localhost:8080/dashboard/clients/${getRowId}`).then((resp)=>{
         resp.json().then((r)=>{
          setUser(r)
          setNewUser(r)
         })
        })
    }
    getUser()
  },[open])


//Handle Update
const handleUpdate=(e)=>{
  e.preventDefault()
  setIsSubmit(true)
  
  setFormErrors(validate(newUser))
    
 
fetch(`http://localhost:8080/dashboard/clients/update/${getRowId}`
,{
    method:"PUT",
    headers:{"Content-Type":"application/json"},
    body:JSON.stringify(newUser)
}).then((resp)=>{
    resp.text().then((r)=>{
        if(newUser!==user && Object.keys(formErrors).length===0 && isSubmit ){
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
          toast.info("Aucune modification n'a été faite sur ce client🤭  ", {
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

    
    /* Vérification Clients */

  if(!values.email){
      errors.email ="L'email est obligatoire! ";
  }
  else if(!regex.test(values.email)){
      errors.email="Format de l'email est invalide!";
  }
  if(!values.cin){
      errors.cin = "Le cin est obligatoire!";
  }
  
  else if(values.cin.length!==7){
      errors.cin= "Le cin doit contenir 7 symboles!"
  }

  if(!values.phone){
    errors.phone="Le numéro est obligatoire!";
}

else if(hasWhiteSpace(values.phone)===true){
    errors.phone="Veuillez Eliminez les espaces! "
}
else if(!regexPhone.test(values.phone)){
    errors.phone="Le numéro est invalide!";
}

//Vérification du format de la date d'arrivée
if(!values.dateArrivee){
  errors.dateArrivee="La date d'arrivée est obligatoire!";
}

else if(hasWhiteSpace(values.dateArrivee)===true){
  errors.dateArrivee="Veuillez Eliminez les espaces! "
}
else if(!regexDate.test(values.dateArrivee)){
  errors.dateArrivee="Le format de la date est invalide!";
}

 //Vérification du format de la date de sortie
 if(!values.dateSortie){
  errors.dateSortie="Le date de sortie est obligatoire!";
}

else if(hasWhiteSpace(values.dateSortie)===true){
  errors.dateSortie="Veuillez Eliminez les espaces! "
}
else if(!regexDate.test(values.dateSortie)){
  errors.dateSortie="Le format de la date est invalide!";
}
else if(parseInt(values.dateSortie.split('/',2)[1])<parseInt(values.dateArrivee.split('/',2)[1]) || parseInt(values.dateSortie.split('/')[2]) < parseInt(values.dateArrivee.split('/')[2]) || (parseInt(values.dateSortie.split('/',2)[1]) === parseInt(values.dateArrivee.split('/',2)[1]) && parseInt(values.dateSortie.split('/',2)[0]) < parseInt(values.dateArrivee.split('/',2)[0]) )   ){
  errors.dateSortie="Cette date est invalide!"
}

// Vérification du type de client : Avec ou sans réservation
if(!values.type){
  errors.type="Veuillez préciser le type du client!";
}
else if(values.type!=="Avec réservation" && values.type!=="Sans réservation"){
  errors.type="Type du client doit être : Avec réservation ou Sans réservation!";
}

 //Validation du total saisies
if(!values.total){
  errors.total="Le total payé est doit être mensionner!";
}

else if(hasWhiteSpace(values.total)===true){
  errors.total="Veuillez Eliminez les espaces! "
}
else if(values.total<0){
  errors.total="Le total ne peut pas être négative!";
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

//Vérification statut client
if(!values.statut){
  errors.statut="Le statut est obligatoire!";
}
else if(values.statut!=="Active" && values.statut!=="Passive" && values.statut!=="En cours"){
  errors.statut="Statut doit être soit Active, Passive ou En cours!";
}
//Vérification de l'age client
if(!values.age){
  errors.age="L'age est obligatoire!";
}
else if(values.age<=0){
  errors.age="Ce client n'est pas né(e) 🙄!";
}
else if(values.age>0  && values.age<10){
  errors.age="Ce client est encore mineur🙄!";
}
else if(values.age>130){
  errors.age="L'age est trop grand!";
}
//Vérification de l'adress client
if(!values.adresse){
  errors.adresse="L'adresse du client est obligatoire!";
}
//Vérification de la nationalité du client
if(!values.nationalite){
  errors.nationalite="La nationalité du client est obligatoire!";
}
//Vérification de l'origine du client
if(!values.origine){
  errors.origine="L'origine du client est obligatoire!";
}
else if(values.origine.toLowerCase()!=="booking" && values.origine.toLowerCase()!=="agence de voyage" && values.origine.toLowerCase()!=="particulier"){
  errors.origine="L'origine du client doit être soit booking, agence de voyage ou particulier!";
}

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
  setUser("")
  const id=e.target.id
  const value=e.target.value
  setData({...data,[id]:value});
  setNewUser({...newUser,[id]:value})
  
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
    <div class="title">Modification Client !</div>
    <div class="content">
      <form >
        
        <div class="user-details">
          <div class="input-box">
            <span class="details">Nom Complet</span>
            <input name="client" id="client" type="text" placeholder="Zakaria El Hafdaoui"required value={user.client} onChange={handleChange}/>
            <p style={{color:"red",marginTop:"8px"}}> {formErrors.client} </p>
          </div>
          <div class="input-box">
            <span class="details">Cin</span>
            <input name="cin" id="cin" type="text" placeholder="J530808" required value={user.cin} onChange={handleChange} disabled/>
            <p style={{color:"red",marginTop:"8px"}}> {formErrors.cin} </p>
          </div>
          <div class="input-box">
            <span class="details">Statut</span>
            <input name="statut" id="statut" type="text" placeholder="Active, Passive, En cours ..." value={user.statut}  required onChange={handleChange}/>
            <p style={{color:"red",marginTop:"8px"}}> {formErrors.statut} </p>
          </div>
          <div class="input-box">
            <span class="details">Email</span>
            <input name="email" id="email" type="text" placeholder="xxx@xxx.xxx" value={user.email}  required onChange={handleChange}/>
            <p style={{color:"red",marginTop:"8px"}}> {formErrors.email} </p>
          </div>
          <div class="input-box">
            <span class="details">Phone</span>
            <input name="phone" id="phone" type="text" placeholder="0613608998" value={user.phone}  required onChange={handleChange}/>
            <p style={{color:"red",marginTop:"8px"}}> {formErrors.phone} </p>
          </div>
          <div class="input-box">
            <span class="details">Age</span>
            <input id="age" type="text" placeholder="22 ans" value={user.age} required onChange={handleChange}/>
            <p style={{color:"red",marginTop:"8px"}}> {formErrors.age} </p>
          </div>
          <div class="input-box">
            <span class="details">Nationalité</span>
            <input name="nationalite" id="nationalite" type="text" placeholder="Marocaine" value={user.nationalite}  required onChange={handleChange}/>
            <p style={{color:"red",marginTop:"8px"}}> {formErrors.nationalite} </p>
          </div>
          <div class="input-box">
            <span class="details">Adresse</span>
            <input name="adresse" id="adresse" type="text" placeholder="Marocaine" value={user.adresse}  required onChange={handleChange}/>
            <p style={{color:"red",marginTop:"8px"}}> {formErrors.adresse} </p>
          </div>
          <div class="input-box">
            <span class="details">Origine</span>
            <input name="origine" id="origine" type="text" placeholder="Booking, Particulier, Agence de voyage ..." value={user.origine}  required onChange={handleChange}/>
            <p style={{color:"red",marginTop:"8px"}}> {formErrors.origine} </p>
          </div>
          <div class="input-box">
            <span class="details">Date d'arrivé</span>
            <input name="dateArrivee" id="dateArrivee" type="text" placeholder="24/02/2022" value={user.dateArrivee}  required onChange={handleChange}/>
            <p style={{color:"red",marginTop:"8px"}}> {formErrors.dateArrivee} </p>
          </div>
          <div class="input-box">
            <span class="details">Date de sortie</span>
            <input name="dateSortie" id="dateSortie" type="text" placeholder="28/02/2022" value={user.dateSortie} required onChange={handleChange}/>
            <p style={{color:"red",marginTop:"8px"}}> {formErrors.dateSortie} </p>
          </div>
          <div class="input-box">
            <span class="details">Total payé</span>
            <input name="total" id="total" type="text" placeholder="1000 DH" value={user.total}  required onChange={handleChange}/>
            <p style={{color:"red",marginTop:"8px"}}> {formErrors.total} </p>
          </div>

          <div class="input-box">
            <span class="details">Type</span>
            <input name="type" id="type" type="text" placeholder="Avec (sans) réservation" value={user.type}  required onChange={handleChange}/>
            <p style={{color:"red",marginTop:"8px"}}> {formErrors.type} </p>
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