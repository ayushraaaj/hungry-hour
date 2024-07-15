import "./RestaturantMenu.css";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Shimmer from "../ShimmerCard/Shimmer";
import { RES_MENU_API } from "../../utils/constants";

const RestaurantMenu = () => {
  const [menu, setMenu] = useState(null);

  const { resId } = useParams();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const data = await fetch(RES_MENU_API + resId);

    const jsonData = await data.json();

    setMenu(jsonData);
  };

  if (menu === null) {
    return <Shimmer />;
  }
  const { name, avgRating, cuisines, totalRatingsString, costForTwoMessage } =
    menu.data?.cards[2]?.card?.card?.info;

  const { itemCards } =
    menu.data?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards[2]?.card
      ?.card;

  return (
    <div className="menu-card">
      <h2>{name}</h2>
      <h4>
        {avgRating} ({totalRatingsString}) - {costForTwoMessage}
      </h4>
      <h4>{cuisines.join(", ")}</h4>

      <div className="menu">
        <h4 className="menu-text">MENU</h4>
        <div>
          <ul>
            {itemCards.map((item) => (
              <li key={item.card.info.id}>
                {item.card.info.name} -{" "}
                <span className="price">
                  ₹
                  {item.card.info.price / 100 ||
                    item.card.info.defaultPrice / 100}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default RestaurantMenu;
