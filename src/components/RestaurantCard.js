import { RES_IMAGE } from "../utils/constants";

const RestaurantCard = (props) => {
  const { resData } = props;

  const { name, cloudinaryImageId, costForTwo, cuisines, avgRating, areaName } =
    resData;

  return (
    <div className="bg-gray-200 mx-8 my-10 w-52 py-4 px-5 rounded-3xl text-nowrap overflow-hidden text-amber-950">
      <img
        className="w-40 rounded-2xl h-36 m-auto"
        src={RES_IMAGE + cloudinaryImageId}
        alt={name}
      />
      <h3 className="text-xl font-semibold my-2">{name}</h3>
      <h4 className="text-sm py-1">Rating: {avgRating} stars</h4>
      <h4 className="text-sm py-1">{cuisines.join(", ")}</h4>
      <h4 className="text-sm py-1">{costForTwo}</h4>
      <h4 className="text-sm py-2">{areaName}</h4>
    </div>
  );
};

export default RestaurantCard;
