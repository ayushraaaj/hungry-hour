import { useEffect, useState } from "react"
import { RES_MENU_API } from "../utils/constants";

const useRestaurantMenu = (resId) => {
    const [menu, setMenu] = useState(null);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        const data = await fetch(RES_MENU_API + resId);
        const jsonData = await data.json();

        setMenu(jsonData);
    }

    return menu;
}

export default useRestaurantMenu;