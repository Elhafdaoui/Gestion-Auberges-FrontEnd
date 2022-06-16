import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import "../../components/deleteConfirmation/dialogActivity.scss";
import { useEffect } from 'react';
import TextField from '@mui/material/TextField';
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
  

  useEffect(()=>{
    const getUser = async ()=>{
        fetch(`http://localhost:8080/dashboard/users/${getRowId}`).then((resp)=>{
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
    const id=e.target.id
    const value=e.target.value
 
fetch(`http://localhost:8080/dashboard/users/update/${getRowId}`
,{
    method:"PUT",
    headers:{"Content-Type":"application/json"},
    body:JSON.stringify(newUser)
}).then((resp)=>{
    resp.text().then((r)=>{
        if(newUser!==user){
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
        else{
          toast.info("Aucune modification n'a été faite sur cet utilisateur🤭  ", {
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
  setUser("")
  const id=e.target.id
  const value=e.target.value
  setData({...data,[id]:value});
  setNewUser({...newUser,[id]:value})
  
};
console.log(newUser)

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
    <div class="title">Modification Utilisateur !</div>
    <div class="content">
      <form >
        
        <div class="user-details">
          <div class="input-box">
            <span class="details">Username</span>
            <input name="username" id="username" type="text" placeholder="Zakaria"required value={user.username} onChange={handleChange}/>
            <p style={{color:"red",marginTop:"8px"}}> {formErrors.username} </p>
          </div>
          <div class="input-box">
            <span class="details">Email</span>
            <input name="email" id="email" type="text" placeholder="xxx@xxx.xxx" required value={user.email} onChange={handleChange}/>
            <p style={{color:"red",marginTop:"8px"}}> {formErrors.email} </p>
          </div>
          <div class="input-box">
            <span class="details">Téléphone</span>
            <input name="phone" id="phone" type="text" placeholder="0613608998" value={user.phone}  required onChange={handleChange}/>
            <p style={{color:"red",marginTop:"8px"}}> {formErrors.phone} </p>
          </div>
          <div class="input-box">
            <span class="details">Role</span>
            <input name="roles" id="roles" type="text" placeholder="gérant ..." value={user.roles}  required onChange={handleChange}/>
            <p style={{color:"red",marginTop:"8px"}}> {formErrors.roles} </p>
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