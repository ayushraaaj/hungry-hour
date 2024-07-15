import "./Body.css";
import RestaurantCard from "../RestaurantCard/RestaurantCard";
import { useEffect, useState } from "react";
import { RES_API } from "../../utils/constants";
import Shimmer from "../ShimmerCard/Shimmer";
import { Link } from "react-router-dom";

const Body = () => {
  const [listOfRestaurants, setListOfRestaurants] = useState([]);
  const [filteredListOfRestaurants, setFilteredListOfRestaurants] = useState(
    []
  );

  const [searchData, setSearchData] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const data = await fetch(RES_API);
    const jsonData = await data.json();

    setListOfRestaurants(
      jsonData?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle
        ?.restaurants
    );

    setFilteredListOfRestaurants(
      jsonData?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle
        ?.restaurants
    );
  };

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
            <Link
              key={restaurants?.info?.id}
              to={`/restaurant/${restaurants?.info?.id}`}
            >
              <RestaurantCard resData={restaurants.info} />
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Body;
