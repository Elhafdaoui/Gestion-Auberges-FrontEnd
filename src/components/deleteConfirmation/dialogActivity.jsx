import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import "./dialogActivity.scss";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});


export default function AlertDialog({handleDelete,buttonTitle,AlertDialogDescription}) {
  const [open, setOpen] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
  };
  const handleClickOpen = () => {
    setOpen(true);
  };
  
 
  return (
    <div>
      <div className='deleteButton' onClick={handleClickOpen}>
        Supprimer
      </div>

      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle><span style={{color:"crimson"}}> {buttonTitle} </span></DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            {AlertDialogDescription}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <div className='cancelButton ' onClick={handleClose}>Annuler</div>
          <div className='deleteButton ' onClick={handleDelete}>Supprimer</div>
        </DialogActions>
      </Dialog>
    </div>
  );
}