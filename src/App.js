/* Acceuil du Dashboard */
import Home from "./pages/home/Home"; 
/* Login Component */
import Login from "./components/login/Login";
/* Lists */
import List from "./pages/list/List"; // //ListCLient
import ListChambre from "./pages/list/ListChambres"
import ListProduits from "./pages/list/ListProduits";
import ListActivites from "./pages/list/ListActivites";
import ListRestaurants from "./pages/list/ListRestaurants"
import ListCharges from "./pages/list/ListCharges"
import ListRecettes from "./pages/list/listRecettes";
import ListConsommations from "./pages/list/ListConsommations";
import ListUtilisateurs from "./pages/list/ListUsers";
/* Client single page --> Afficher */
import Single from "./pages/single/Single";
/* New */
import New from "./pages/new/newClient";
import NewReservation from "./pages/new/newReservation";
import NewConsommation from "./pages/new/newConsommation";
import NewStock from "./pages/new/newStock";
import NewActivite from "./pages/new/newActivite";
import NewRestaurant from "./pages/new/newRestaurant";
import NewCharge from "./pages/new/newCharges";
import NewBilan from "./pages/new/newBilan";
/* Update */
// import ModifierClient from "./pages/Modifier/modifierClient";
/* Routage */
import { BrowserRouter , Routes, Route, Navigate } from "react-router-dom";
/* Form inputs */
import { productInputs, clientInputs, reservationInputs, activitytInputs, restaurantInputs, consommationInputs, bilanInputs, chargeInputs } from "./formSource";
/* Dark mode css */
import "./style/dark.scss";
/* Hook avoir accès au dashboard */
import { useContext } from "react";
/* Diffuser Dark mode */
import { DarkModeContext } from "./context/darkModeContext";
/* SignUp component */
import SignUp from "./components/signup/SignUp";
/* Là où j'ai stocké le currentUser */
import { AuthContext } from "./context/AuthContext";
/* Import Page not Found */
import PageNotFound from "./pages/404/pageNotFound"



function App() {
  const { darkMode } = useContext(DarkModeContext);

  const {currentUser} = useContext(AuthContext)

  const  RequireAuth=({children})=>{
    return currentUser ? children : <Navigate to="/"/>
  };

  const AccessByRole=({children})=>{
    return (currentUser==null || currentUser.roles!=="admin") ? <Navigate to="PageNotFound"/> : children 
  }


  return (
    <div className={darkMode ? "app dark" : "app"}>
    <BrowserRouter>
      <Routes>
        <Route path="signup" element={  <AccessByRole> <SignUp/> </AccessByRole>  } />
        <Route path="/" index element={<Login />} />
              <Route path="dashboard">
                <Route index element={ <RequireAuth> <Home /> </RequireAuth>  } />
                  <Route path="clients">
                    <Route index element={<List />} />
                    <Route path="client/:idClient" element={<Single />} />  {/* path = "client" */}
                    <Route
                      path="new"
                      element={<New inputs={clientInputs} title="Nouveau Client" />}
                    />
                    {/* <Route
                      path="update"
                      element={<ModifierClient inputs={clientInputs} title="Modifier Client" />}
                    /> */}
                  </Route>
                  <Route path="reservations">
                      <Route index element={<ListChambre/>} />
                      <Route
                      path="new"
                      element={<NewReservation inputs={reservationInputs} title="Nouvelle Réservation" />}
                    />
                    {/* <Route
                      path="update"
                      element={<ModifierClient inputs={reservationInputs} title="Modifier Réservation" />}
                    /> */}
                  </Route>
                  <Route path="stock">
                    <Route index element={<ListProduits />} />
                    <Route
                      path="new"
                      element={<NewStock inputs={productInputs} title="Nouveau Produit" />}
                    />
                    {/* <Route
                      path="update"
                      element={<ModifierClient inputs={productInputs} title="Modifier Stock" />}
                    /> */}
                    </Route>
                    <Route path="activites">
                    <Route index element={<ListActivites />} />
                    <Route
                      path="new"
                      element={<NewActivite inputs={activitytInputs} title="Nouvelle Activité" />}
                    />
                    {/* <Route
                      path="update"
                      element={<ModifierClient inputs={activitytInputs} title="Modifier Activité" />}
                    /> */}
                    </Route>
                    <Route path="restaurants">
                    <Route index element={<ListRestaurants />} />
                    <Route
                      path="new"
                      element={<NewRestaurant inputs={restaurantInputs} title="Nouveau Restaurant" />}
                    />
                    {/* <Route
                      path="update"
                      element={<ModifierClient inputs={restaurantInputs} title="Modifier Restaurant" />}
                    /> */}
                    </Route>
                    <Route path="charges">
                      <Route index element={<ListCharges />} />
                      <Route
                        path="new"
                        element={<NewCharge inputs={chargeInputs} title="Nouvelle Charge" />}
                      />
                      {/* <Route
                        path="update"
                        element={<ModifierClient inputs={restaurantInputs} title="Modifier Charge" />}
                      /> */}
                    </Route>
                   
                    <Route path="consommations">
                      <Route index element={<ListConsommations />} />
                      <Route
                        path="new"
                        element={<NewConsommation inputs={consommationInputs} title="Nouvelle Consommation" />}
                      />
                      {/* <Route
                        path="update"
                        element={<ModifierClient inputs={consommationInputs} title="Modifier Consommation" />}
                      /> */}
                    </Route>
                    
                    <Route path="recettes" >
                      <Route index element={<ListRecettes/>}/>
                      <Route path="new"
                        element={<NewBilan inputs={bilanInputs} title="Nouveau Bilan" />}
                      />
                      {/* <Route
                        path="update"
                        element={<ModifierClient inputs={bilanInputs} title="Modifier Bilan" />}
                      /> */}
                    </Route>
                    <Route path="users">
                      <Route index element={ <AccessByRole> <ListUtilisateurs/> </AccessByRole> } />
                      
                    {/* <Route
                      path="update"
                      element={<ModifierClient inputs={reservationInputs} title="Modifier Réservation" />}
                    /> */}
                  </Route>
              </Route>
            <Route path="*" element={<PageNotFound />}/>
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
