import { Route, Routes } from 'react-router-dom';
import { AuthComponent } from '../../../pages/auth/auth';
import { CharactesComponent } from '../../../pages/characters/Characters.component';
import { ProfileComponent } from '../../../pages/profile/Profile.component';
import { SettingsComponent } from '../../../pages/setting/settings.component';
import { HomeComponent } from '../../../pages/home/home.component';
import { EpisodesComponent } from '../../../pages/episodes/episodes.component';
import { LocationComponent } from '../../../pages/locations/locations.component';
import { MyWishListComponent } from '../../../pages/my-wish-list/my-wish-list.component';

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
            <HomeComponent/>
        </Route>
        <Route>
            <EpisodesComponent/>
        </Route>
        <Route>
            <LocationComponent/>
        </Route>
        <Route>
            <MyWishListComponent/>
        </Route>
      </Routes>
    </>
  );
};
