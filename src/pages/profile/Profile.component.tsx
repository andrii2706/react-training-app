import { User } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { getUserData } from '../../api-services/profile.service';
import { SnackBarComponent } from '../../shared/components/snackbar/snackBar.component';

export function ProfileComponent() {
  const [userInfo, setUserInfo] = useState<User | null>(null);
  const [snackBarError, showSnackBarError] = useState(false);

  const getUserInfo = () => {
    setUserInfo(getUserData);
    if (!getUserData) {
      showSnackBarError(true);
    }
  };

  useEffect(() => {
    getUserInfo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <h1 className="text-3xl">Profile</h1>
      <div className="pt-8">
        {/* eslint-disable-next-line jsx-a11y/img-redundant-alt */}
        {userInfo?.photoURL && <img src={userInfo?.photoURL} alt="User photo" />}
        <p>User name - {userInfo?.displayName}</p>
        <p>User email - {userInfo?.email}</p>
        <p>User phone number - {userInfo?.phoneNumber}</p>
        <p></p>
      </div>
      {snackBarError && (
        <SnackBarComponent
          snackBarStatus="error"
          title="Opps!! we have an error"
          description="Problem with User data api"
        />
      )}
    </div>
  );
}
