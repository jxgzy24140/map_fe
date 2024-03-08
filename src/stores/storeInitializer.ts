import UserStore from "@/stores/userStore";
import MapStore from "@/stores/mapStore";
export default function initializeStores() {
  return {
    userStore: new UserStore(),
    mapStore: new MapStore(),
  };
}
