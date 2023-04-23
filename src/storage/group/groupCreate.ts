import AsyncStorage from "@react-native-async-storage/async-storage";
import { GROUP_COLLECTION } from "@storage/storageConfig";
import { GroupsGetAll } from "./groupsGetAll";

export async function GroupCrate(newGroup: string){
  try {
    const storageGroups = await GroupsGetAll();
    const storage = JSON.stringify([...storageGroups, newGroup]);

    await AsyncStorage.setItem(GROUP_COLLECTION, storage);
    
  } catch (error) {
    throw error;
  }
}