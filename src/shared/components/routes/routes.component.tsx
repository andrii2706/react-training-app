import { Route, Routes } from 'react-router-dom';
import { AuthComponent } from '../../../pages/auth/auth';
import { CharactesComponent } from '../../../pages/characters/Characters.component';
import { ProfileComponent } from '../../../pages/profile/Profile.component';
import { SettingsComponent } from '../../../pages/setting/settings.component';
import { HomeComponent } from '../../../pages/home/home.component';
import { EpisodesComponent } from '../../../pages/episodes/episodes.component';
import { LocationComponent } from '../../../pages/locations/locations.component';
import { MyWishListComponent } from '../../../pages/my-wish-list/my-wish-list.component';
import ProtectPrivatePages from '../../guards/protect-private-pages/protect-private-pages.guard';
import { CharactersDetailsComponent } from '../../../pages/characters/character-datails/Characters-Details.component';

export const ApplicationRoutes = () => {
  const isLoggined = () => {
  const status = localStorage.getItem('isUserLoggined');
  if (status) {
    return JSON.parse(status);
  }
  localStorage.setItem('isUserLoggined', 'false');
  return false;
};;

  isLoggined();
  return (
    <>
      <Routes>
        <Route path="/" element={<AuthComponent />} />
        <Route
          path="/characters"
          element={
            <ProtectPrivatePages isAllowed={isLoggined()}>
              <CharactesComponent />
            </ProtectPrivatePages>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectPrivatePages isAllowed={isLoggined()}>
              <ProfileComponent />
            </ProtectPrivatePages>
          }
        />
        <Route
          path="/settings"
          element={
            <ProtectPrivatePages isAllowed={isLoggined()}>
              <SettingsComponent />
            </ProtectPrivatePages>
          }
        />
        <Route
          path="/home"
          element={
            <ProtectPrivatePages isAllowed={isLoggined()}>
              <HomeComponent />
            </ProtectPrivatePages>
          }
        />
        <Route
          path="/episodes"
          element={
            <ProtectPrivatePages isAllowed={isLoggined()}>
              {' '}
              <EpisodesComponent />
            </ProtectPrivatePages>
          }
        />
        <Route
          path="/locations"
          element={
            <ProtectPrivatePages isAllowed={isLoggined()}>
              {' '}
              <LocationComponent />
            </ProtectPrivatePages>
          }
        />
        <Route
          path="/wish-list"
          element={
            <ProtectPrivatePages isAllowed={isLoggined()}>
              {' '}
              <MyWishListComponent />
            </ProtectPrivatePages>
          }
        />
        <Route
          path="/characters/:id"
          element={
            <ProtectPrivatePages isAllowed={isLoggined()}>
                           <CharactersDetailsComponent/>
            </ProtectPrivatePages>
          }
        />
        
      </Routes>
    </>
  );
};
