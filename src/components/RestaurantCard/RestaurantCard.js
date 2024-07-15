import "./RestaurantCard.css";
import { RES_IMAGE } from "../../utils/constants";

const RestaurantCard = (props) => {
  const { resData } = props;

  const { name, cloudinaryImageId, costForTwo, cuisines, avgRating, areaName } =
    resData;

  return (
    <div className="res-card">
      <img src={RES_IMAGE + cloudinaryImageId} alt={name} />
      <h2>{name}</h2>
      <h3>Rating: {avgRating} stars</h3>
      <h4>{cuisines.join(", ")}</h4>
      <h4>{costForTwo}</h4>
      <h4>{areaName}</h4>
    </div>
  );
};

export default RestaurantCard;
