import "./Body.css";
import RestaurantCard from "../RestaurantCard/RestaurantCard";
import { useEffect, useState } from "react";
import { api_url } from "../../utils/constants";
import Shimmer from "../ShimmerCard/Shimmer";

const Body = () => {
  const [listOfRestaurants, setListOfRestaurants] = useState([]);
  const [filteredListOfRestaurants, setFilteredListOfRestaurants] = useState(
    []
  );

  const [searchData, setSearchData] = useState("");

  useEffect(async () => {
    const data = await fetch(api_url);
    const jsonData = await data.json();

    setListOfRestaurants(
      jsonData?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle
        ?.restaurants
    );

    setFilteredListOfRestaurants(
      jsonData?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle
        ?.restaurants
    );
  }, []);

  if (listOfRestaurants.length === 0) {
    return <Shimmer />;
  }

  const filterSearch = () => {
    const filteredList = listOfRestaurants.filter((restaurant) => {
      const { name, cuisines } = restaurant.info;
      const lowerCaseSearchData = searchData.toLowerCase();

      const nameMatches = name.toLowerCase().includes(lowerCaseSearchData);

      const cuisinesMatches = cuisines.some((cuisine) =>
        cuisine.toLowerCase().includes(lowerCaseSearchData)
      );

      return nameMatches || cuisinesMatches;
    });

    setFilteredListOfRestaurants(filteredList);
  };

  const filterTopRatedRestaurants = () => {
    const filteredList = listOfRestaurants.filter((restaurants) => {
      return restaurants.info.avgRating > 4;
    });

    setFilteredListOfRestaurants(filteredList);
  };

  const resetFilter = () => {
    setFilteredListOfRestaurants(listOfRestaurants);
  };

  return (
    <div className="body">
      <div className="filter">
        <div className="search">
          <input
            type="text"
            placeholder="Type here..."
            value={searchData}
            onChange={(e) => setSearchData(e.target.value)}
          />
          <button onClick={filterSearch}>Search</button>
        </div>

        <button className="filter-btn" onClick={filterTopRatedRestaurants}>
          Top Rated Restaurants
        </button>

        <button className="reset-btn" onClick={resetFilter}>
          Reset Filter
        </button>
      </div>

      <div className="res-container">
        {filteredListOfRestaurants.map((restaurants) => {
          return (
            <RestaurantCard
              key={restaurants?.info?.id}
              resData={restaurants.info}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Body;
