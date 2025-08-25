import { User } from "firebase/auth";
import { useEffect, useState } from "react";
import { getUserData } from "../../api-services/profile.service";

export function ProfileComponent() {
  const [userInfo, setUserInfo] = useState<User | null>(null);

  const getUserInfo = () => {
    setUserInfo(getUserData);
  }

  useEffect(() => {
    getUserInfo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  return <div>
    <h1 className="text-3xl">Profile</h1> 
    <div></div>
    <div></div>
    <div></div>
    </div>;
}
