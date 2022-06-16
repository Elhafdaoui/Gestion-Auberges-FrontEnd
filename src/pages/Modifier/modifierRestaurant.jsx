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
  const [restaurant,setrestaurant]=React.useState({})
  const [newrestaurant,setNewrestaurant]=React.useState({});
  

  useEffect(()=>{
    const getUser = async ()=>{
        fetch(`http://localhost:8080/dashboard/restaurants/${getRowId}`).then((resp)=>{
         resp.json().then((r)=>{
          setrestaurant(r)
          setNewrestaurant(r)
         })
        })
    }
    getUser()
  },[open])


//Handle Update
const handleUpdate=(e)=>{
  e.preventDefault()
  setIsSubmit(true)
  setFormErrors(validate(newrestaurant))
 
fetch(`http://localhost:8080/dashboard/restaurants/update/${getRowId}`
,{
    method:"PUT",
    headers:{"Content-Type":"application/json"},
    body:JSON.stringify(newrestaurant)
}).then((resp)=>{
    resp.text().then((r)=>{
      console.log(r)
        if(newrestaurant!==restaurant && Object.keys(formErrors).length===0 && isSubmit){
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
          toast.info("Aucune modification n'a été faite sur ce restaurant🤭  ", {
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
else if(values.nature!=="Moderne" && values.nature!=="Traditionnel"){
  errors.nature="Statut peut être soit Moderne ou Traditionnel";
}

//Vérification du statut du restaurant
if(!values.statut){
  errors.statut="Le statut du restaurant est obligatoire!";
}
else if(values.statut!=="Très demandé" && values.statut!=="Demandé" && values.statut!=="Peu demandé"){
  errors.statut="Statut doit être soit Demandé, Très demandé ou Peu demandé!";
}
//Vérification de l'état du restaurant
if(!values.etat){
  errors.etat="L'état du restaurant est obligatoire!";
}
else if(values.etat!=="Excellente" && values.etat!=="Sale" && values.etat!=="Hors service"){
  errors.etat="Statut doit être soit Excellente, Sale ou Hors service!";
}
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


  const handleClose = () => {
    setOpen(false);
  };
  const handleClickOpen = () => {
    setOpen(true);
  };
  

  function hasWhiteSpace(s) {
    return (/\s/).test(s);
  }

    

 //handleChange pour les données
 const handleChange = (e)=>{
   setrestaurant("")
  const id=e.target.id
  const value=e.target.value
  setData({...data,[id]:value});
  setNewrestaurant({...newrestaurant,[id]:value})
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
    <div class="title">Modification Restaurant !</div>
    <div class="content">
      <form >
        <div class="user-details">
          <div class="input-box">
            <span class="details">Restaurant</span>
            <input name="restaurant" id="restaurant" type="text" placeholder="Blé"required value={restaurant.restaurant} onChange={handleChange}/>
            <p style={{color:"red",marginTop:"8px"}}> {formErrors.restaurant} </p>
          </div>
          <div class="input-box">
            <span class="details">Nature</span>
            <input name="nature" id="nature" type="text" placeholder="Moderne, Traditionnel ..." required value={restaurant.nature} onChange={handleChange}/>
            <p style={{color:"red",marginTop:"8px"}}> {formErrors.nature} </p>
          </div>
          <div class="input-box">
            <span class="details">Prix</span>
            <input name="prix" id="prix" type="text" placeholder="30KG" value={restaurant.prix}  required onChange={handleChange}/>
            <p style={{color:"red",marginTop:"8px"}}> {formErrors.prix} </p>
          </div>
          <div class="input-box">
            <span class="details">Statut</span>
            <input name="statut" id="statut" type="text" placeholder="Demandé, Très demandé, Peu demandé" value={restaurant.statut}  required onChange={handleChange}/>
            <p style={{color:"red",marginTop:"8px"}}> {formErrors.statut} </p>
          </div>
          <div class="input-box">
            <span class="details">Etat</span>
            <input name="etat" id="etat" type="text" placeholder="Excellente, Sale, Hors service" value={restaurant.etat}  required onChange={handleChange}/>
            <p style={{color:"red",marginTop:"8px"}}> {formErrors.etat} </p>
          </div>
          <div class="input-box">
            <span class="details">Places</span>
            <input id="places" type="text" placeholder="places" value={restaurant.places} required onChange={handleChange}/>
            <p style={{color:"red",marginTop:"8px"}}> {formErrors.places} </p>
          </div>
          <div class="input-box">
            <span class="details">Recette</span>
            <input name="recette" id="recette" type="text" placeholder="1973DH" value={restaurant.recette}  required onChange={handleChange}/>
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