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
        <Route path="/" element={<AuthComponent />} />
        <Route path="/characters" element={<CharactesComponent />} />
        <Route path="/profile" element={<ProfileComponent />} />
        <Route path="/settings" element={<SettingsComponent />} />
        <Route path="/home" element={<HomeComponent />} />
        <Route path="/episodes" element={<EpisodesComponent />} />
        <Route path="/locations" element={<LocationComponent />} />
        <Route path="/wish-list" element={<MyWishListComponent />} />
      </Routes>
    </>
  );
};
