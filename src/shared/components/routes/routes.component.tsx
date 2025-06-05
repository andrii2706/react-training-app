import { Route, Routes } from 'react-router-dom';
import { AuthComponent } from '../../../pages/auth/auth';
import { CharactesComponent } from '../../../pages/characters/Characters.component';
import { ProfileComponent } from '../../../pages/profile/Profile.component';
import { SettingsComponent } from '../../../pages/setting/settings.component';

export const ApplicationRoutes = () => {
  return (
    <>
      <Routes>
        <Route>
             <AuthComponent/> 
          </Route>
        <Route>
            <CharactesComponent/>
        </Route>
        <Route>
            <ProfileComponent/>
        </Route>
        <Route>
            <SettingsComponent/>
        </Route>
        <Route>
            
        </Route>
        <Route></Route>
      </Routes>
    </>
  );
};
