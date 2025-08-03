import { CharactesInterface } from "../../models/character.interface";
import { EpisodesInterface } from "../../models/episodes.interface";
import { LocationInterface } from "../../models/location.interface";

interface cardDataType {
   dataOfItem: CharactesInterface | EpisodesInterface | LocationInterface
   dataType: string
}


export const CardComponent = ( {dataOfItem, dataType}: cardDataType) => {
 const characterImage = (dataOfItem as CharactesInterface).image
 const characterStatus = (dataOfItem as CharactesInterface).status
 const characterSpecies = (dataOfItem as CharactesInterface).species
 const characterGender = (dataOfItem as CharactesInterface).gender

 return  <>
  {dataType === "characters" &&   <div className="card bg-base-100 w-96 pt-4 shadow-sm bg-gray-500">
  <figure>
    <img
      src={characterImage}
      alt="Shoes" />
  </figure>
  <div className="card-body">
    <h2 className="card-title">{dataOfItem.name}</h2>
    <p>Status - {characterStatus}</p>
    <p>Species - {characterSpecies}</p>
    <p>Gender - {characterGender}</p>
    <div className="card-actions justify-end">
      <button className="btn btn-primary">Details</button>
    </div>
  </div>
</div>}
  {dataType === "episodes" && <div className="card bg-base-100 w-96 shadow-sm">
  <figure>
    <img
      src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
      alt="Shoes" />
  </figure>
  <div className="card-body">
    <h2 className="card-title">{dataOfItem.name}</h2>
    <p>Date of Episode - {}</p>
    <p>Number of Episode - {}</p>
    <div className="card-actions justify-end">
      <button className="btn btn-primary">Details</button>
    </div>
  </div>
</div>}
  {dataType === "locations" && <div className="card bg-base-100 w-96 shadow-sm">
  <figure>
    <img
      src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
      alt="Shoes" />
  </figure>
  <div className="card-body">
    <h2 className="card-title">{dataOfItem.name}</h2>
    <p>Type of location{}</p>
    <p>Demnsion of location {}</p>
    <div className="card-actions justify-end">
      <button className="btn btn-primary">Details</button>
    </div>
  </div>
</div>}


  
  
  </>
};
