import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { updateUserEmail, updateUserPhotoAndName } from '../../api-services/profile.service';
import { LoaderComponent } from '../../shared/components/loader/loader.component';
import { SnackBarComponent } from '../../shared/components/snackbar/snackBar.component';

export const SettingsComponent = () => {
  const {
    register: newEmailForm,
    handleSubmit: handleSubmitNewEmail,
    formState: { errors: emailErrors },
  } = useForm<{ email: string }>();

  const {
    register: userInfoForm,
    handleSubmit: handleSubmitUserInfo,
    formState: { errors: userInfoErrors },
  } = useForm<{ name: string }>();

  const [updateEmailForm, showUpdateUserForm] = useState(false);
  const [fileString, setFileString] = useState<string | null>(null);
  const [showLoader, setLoader] = useState(false);
  const [snackBarError, showSnackBarError] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      const reader = new FileReader();

      reader.onloadend = () => {
        setFileString(reader.result as string);
      };

      reader.readAsDataURL(file);
    }
  };

  const updateUserPhotoAndNameData = (data: { name: string }) => {
    setLoader(true);
    updateUserPhotoAndName(fileString as string, data.name)
      .then(() => {})
      .catch(error => {
        if(error){
           showSnackBarError(true);
        }
      })
      .finally(() => setLoader(false));
  };
  const updateEmail = (data: { email: string }) => {
    setLoader(true);
    updateUserEmail(data.email)
      .then(() => {})
      .catch(error => {
       if(error){
           showSnackBarError(true);
        }
      })
      .finally(() => setLoader(false));
  };

  const updateUserEmailStatus = (status: boolean) => {
    showUpdateUserForm(status);
  };

  return (
    <div>
      <LoaderComponent showLoader={showLoader} />
      <div className="flex justify-center items-center mb-5">
        <h2 className="text-3xl">Settings</h2>
      </div>

      <div className="flex justify-center items-center">
        <button className="btn btn-soft mr-5" onClick={() => updateUserEmailStatus(true)}>
          Update User Email
        </button>
        <button className="btn btn-soft" onClick={() => updateUserEmailStatus(false)}>
          Update user photo and name
        </button>
      </div>

      {updateEmailForm && (
        <form
          className="my-6 flex justify-center items-center flex-col"
          onSubmit={handleSubmitNewEmail(updateEmail)}
        >
          <input
            className={`input input-md mb-2 ${emailErrors.email ? 'input-error' : ''}`}
            type="text"
            {...newEmailForm('email', { required: 'Login is required' })}
          />
          {emailErrors.email && <p>{emailErrors.email.message}</p>}
          <button className="btn btn-soft" type="submit">
            Sumbit update form
          </button>
        </form>
      )}
      {!updateEmailForm && (
        <form
          className="my-6 flex justify-center items-center flex-col"
          onSubmit={handleSubmitUserInfo(updateUserPhotoAndNameData)}
        >
          <input className="my-6" type="file" onChange={handleFileChange} />

          <input
            className={`input input-md mb-2 ${userInfoErrors.name ? 'input-error' : ''}`}
            type="text"
            {...userInfoForm('name', { required: 'Login is required' })}
          />
          {userInfoErrors.name && <p>{userInfoErrors.name.message}</p>}
          <button className="btn btn-soft" type="submit">
            Sumbit update form
          </button>
        </form>
      )}
      {snackBarError && (
                              <SnackBarComponent
                                snackBarStatus="error"
                                title="Opps!! we have an error"
                                description="We have an error with login, please wait some time"
                              />
                            )}
    </div>
  );
};
