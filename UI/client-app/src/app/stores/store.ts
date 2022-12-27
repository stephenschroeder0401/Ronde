import TripStore from "./tripStore";
import {createContext, useContext} from "react";
import CommonStore from "./commonStore";
import UserStore from "./userStore";
import ModalStore from "./modalStore";
import ProfileStore from "./profileStore";
import ReservationStore from "./reservationStore";

interface Store{
    tripStore: TripStore;
    commonStore: CommonStore;
    userStore: UserStore;
    modalStore: ModalStore;
    profileStore: ProfileStore;
    reservationStore: ReservationStore;
}

export const store: Store = {
    tripStore: new TripStore(),
    commonStore: new CommonStore(),
    userStore: new UserStore(),
    modalStore: new ModalStore(),
    profileStore: new ProfileStore(),
    reservationStore: new ReservationStore()
}

export const StoreContext = createContext(store);

export function useStore(){
    return useContext(StoreContext);
}