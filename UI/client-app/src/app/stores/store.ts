import TripStore from "./tripStore";
import {createContext, useContext} from "react";
import CommonStore from "./commonStore";

interface Store{
    tripStore: TripStore;
    commonStore: CommonStore;
}

export const store: Store = {
    tripStore: new TripStore(),
    commonStore: new CommonStore()
}

export const StoreContext = createContext(store);

export function useStore(){
    return useContext(StoreContext);
}