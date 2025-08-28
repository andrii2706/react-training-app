import { useForm } from "react-hook-form";
import { FilterInterface } from "../../models/filter.interface";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../store/store";
import { setFilterData } from "../../../store/characters-data/characters-data";

export const SearchComponent = () => {
  const {
     register: filter,
    handleSubmit: handleSubmitFilter,
    reset
  } = useForm<FilterInterface>({
    defaultValues: {
      name: "",
      gender: "",
      species: "",
    },
  });
  const dispatch = useDispatch<AppDispatch>();

const getDataFromForm = (data: FilterInterface) => {
    dispatch(setFilterData(data));
  }
  const clearForm = () => {
    reset();
    dispatch(setFilterData(null));
  }

  return <div className="flex justify-center items-center flex-col bg-gray-400 rounded-lg p-5">
      <h2 className="text-3xl">Filter</h2>
   <div  className="flex justify-center items-center">
    
    <form className="flex justify-center items-center" onSubmit={handleSubmitFilter(getDataFromForm)}>
    <input className="p-4" placeholder="Incert Name of user"
    {...filter('name')}
    />
    <fieldset className="fieldset  px-5">
  <legend className="fieldset-legend">Browsers</legend>
  <select defaultValue="Pick a browser" className="select"
    {...filter('gender')}
    >
    <option disabled={true}>Pick a character gender</option>
    <option>Male</option>
    <option>Female</option>
    <option>Unknown</option>
  </select>
  <span className="label">Optional</span>
</fieldset>
   <fieldset className="fieldset px-5">
  <legend className="fieldset-legend">Browsers</legend>
  <select defaultValue="Pick a browser" className="select"
    {...filter('species')}
    >
    <option disabled={true}>Pick a Species</option>
    <option>Human</option>
    <option>Alien</option>
    <option>Disease</option>
    <option>Robot</option>
    <option>Humanoid</option>
  </select>
  <span className="label">Optional</span>
</fieldset>
<button className="btn btn-soft" type="submit"> Submit</button> 
<button className="btn btn-soft ml-5" onClick={clearForm}>Clear filter</button>
  </form>
  </div>
  </div>;
};


