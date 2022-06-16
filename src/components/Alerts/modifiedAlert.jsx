import React from 'react';
import { SnackbarProvider, useSnackbar } from 'notistack';
import {Link} from 'react-router-dom'

function MyApp() {
  const { enqueueSnackbar } = useSnackbar();

  const handleClickVariant = (variant) => () => {
    // variant could be success, error, warning, info, or default
    enqueueSnackbar("Modifier avec succès", { variant });
  };


  
  return (
    <React.Fragment>
      <Link to="#">
          <button className='modifyButton' type='submit' onClick={handleClickVariant('info')}> Modifier </button>
      </Link>
    </React.Fragment>
  );
}

const IntegrationNotistack=()=> {
  return (
    <SnackbarProvider  maxSnack={2} autoHideDuration={2500} anchorOrigin={{ vertical: "bottom", horizontal: "right" }} >
      <MyApp />
    </SnackbarProvider>
  );
}
export default IntegrationNotistack