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
  const [produit,setProduit]=React.useState({})
  const [newProduit,setNewProduit]=React.useState({});
  

  useEffect(()=>{
    const getUser = async ()=>{
        fetch(`http://localhost:8080/dashboard/stock/${getRowId}`).then((resp)=>{
         resp.json().then((r)=>{
          setProduit(r)
          setNewProduit(r)
         })
        })
    }
    getUser()
  },[open])


//Handle Update
const handleUpdate=(e)=>{
  e.preventDefault()
  setIsSubmit(true)
  setFormErrors(validate(newProduit))
 
fetch(`http://localhost:8080/dashboard/stock/update/${getRowId}`
,{
    method:"PUT",
    headers:{"Content-Type":"application/json"},
    body:JSON.stringify(newProduit)
}).then((resp)=>{
    resp.text().then((r)=>{
        if(newProduit!==produit && Object.keys(formErrors).length===0 && isSubmit){
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
          toast.info("Aucune modification n'a été faite sur ce Produit🤭  ", {
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
else if(values.statut!=="Très demandé" && values.statut!=="Demandé" && values.statut!=="Peu demandé"){
  errors.statut="Statut doit être soit Très demandé, Demandé ou Peu demandé!";
}
//Vérification de l'état du produit
if(!values.etat){
  errors.etat="L'état du produit est obligatoire!";
}
else if(values.etat!=="Excellente" && values.etat!=="Hors service" && values.etat!=="Périmé"){
  errors.etat="L'état doit être soit Excellente, Hors service ou Périmé!";
}
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
  else if(hasWhiteSpace(values.dateExpiration)===true){
  errors.dateExpiration="Veuillez Eliminez les espaces! "
  }
  else if(parseInt(values.dateExpiration.split('/',2)[1])<parseInt(values.dateImport.split('/',2)[1]) || parseInt(values.dateExpiration.split('/')[2]) < parseInt(values.dateImport.split('/')[2]) || (parseInt(values.dateExpiration.split('/',2)[1]) === parseInt(values.dateImport.split('/',2)[1]) && parseInt(values.dateExpiration.split('/',2)[0]) < parseInt(values.dateImport.split('/',2)[0]) )   ){
    errors.dateExpiration="Cette date est invalide!"
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
   setProduit("")
  const id=e.target.id
  const value=e.target.value
  setData({...data,[id]:value});
  setNewProduit({...newProduit,[id]:value})
 
};
console.log(data)
console.log(newProduit)

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
    <div class="title">Modification Produit !</div>
    <div class="content">
      <form >
        <div class="user-details">
          <div class="input-box">
            <span class="details">Produit</span>
            <input name="produit" id="produit" type="text" placeholder="Blé"required value={produit.produit} onChange={handleChange}/>
            <p style={{color:"red",marginTop:"8px"}}> {formErrors.produit} </p>
          </div>
          <div class="input-box">
            <span class="details">Quantité Initiale</span>
            <input name="quantiteInitiale" id="quantiteInitiale" type="text" placeholder="800 KG" required value={produit.quantiteInitiale} onChange={handleChange}/>
            <p style={{color:"red",marginTop:"8px"}}> {formErrors.quantiteInitiale} </p>
          </div>
          <div class="input-box">
            <span class="details">Quantité Restante</span>
            <input name="quantiteRestante" id="quantiteRestante" type="text" placeholder="30KG" value={produit.quantiteRestante}  required onChange={handleChange}/>
            <p style={{color:"red",marginTop:"8px"}}> {formErrors.quantiteRestante} </p>
          </div>
          <div class="input-box">
            <span class="details">Date Import</span>
            <input name="dateImport" id="dateImport" type="text" placeholder="29/03/2022" value={produit.dateImport}  required onChange={handleChange}/>
            <p style={{color:"red",marginTop:"8px"}}> {formErrors.dateImport} </p>
          </div>
          <div class="input-box">
            <span class="details">Date Expiration</span>
            <input name="dateExpiration" id="dateExpiration" type="text" placeholder="29/12/2022" value={produit.dateExpiration}  required onChange={handleChange}/>
            <p style={{color:"red",marginTop:"8px"}}> {formErrors.dateExpiration} </p>
          </div>
          <div class="input-box">
            <span class="details">Fournisseur</span>
            <input id="fournisseur" type="text" placeholder="fournisseur" value={produit.fournisseur} required onChange={handleChange}/>
            <p style={{color:"red",marginTop:"8px"}}> {formErrors.fournisseur} </p>
          </div>
          <div class="input-box">
            <span class="details">Ville</span>
            <input name="ville" id="ville" type="text" placeholder="Agadir" value={produit.ville}  required onChange={handleChange}/>
            <p style={{color:"red",marginTop:"8px"}}> {formErrors.ville} </p>
          </div>
          <div class="input-box">
            <span class="details">Téléphone</span>
            <input name="phone" id="phone" type="text" placeholder="+212613608009" value={produit.phone}  required onChange={handleChange}/>
            <p style={{color:"red",marginTop:"8px"}}> {formErrors.phone} </p>
          </div>
          <div class="input-box">
            <span class="details">Cin</span>
            <input name="cin" id="cin" type="text" placeholder="J530908" value={produit.cin}  required onChange={handleChange}/>
            <p style={{color:"red",marginTop:"8px"}}> {formErrors.cin} </p>
          </div>
          <div class="input-box">
            <span class="details">Prix Achat</span>
            <input name="prix" id="prix" type="text" placeholder="1029DH" value={produit.prix} required onChange={handleChange}/>
            <p style={{color:"red",marginTop:"8px"}}> {formErrors.prix} </p>
          </div>
          <div class="input-box">
            <span class="details">Statut</span>
            <input name="statut" id="statut" type="text" placeholder="Demandé, Très demandé, Peu demandé" value={produit.statut}  required onChange={handleChange}/>
            <p style={{color:"red",marginTop:"8px"}}> {formErrors.statut} </p>
          </div>
          <div class="input-box">
            <span class="details">Etat</span>
            <input name="etat" id="etat" type="text" placeholder="Excellente, Hors service, Périmé ..." value={produit.etat}  required onChange={handleChange}/>
            <p style={{color:"red",marginTop:"8px"}}> {formErrors.etat} </p>
          </div>
          <div class="input-box">
            <span class="details">Recette</span>
            <input name="recette" id="recette" type="text" placeholder="2485DH" value={produit.recette}  required onChange={handleChange}/>
            <p style={{color:"red",marginTop:"8px"}}> {formErrors.recette} </p>
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