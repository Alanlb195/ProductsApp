import AsyncStorage from "@react-native-async-storage/async-storage";

export class StorageAdapter {

    static async getItem(key: string): Promise<string | null> {
        try {
            const value = await AsyncStorage.getItem(key);
            // console.log(`[StorageAdapter] getItem("${key}") ->`, value);
            return value;
        } catch (error) {
            // console.error(`[StorageAdapter] Error getting token: "${key}":`, error);
            return null;
        }
    }

    static async setItem(key: string, value: string): Promise<boolean> {
        try {
            if (!key || !value) {
                console.warn(`[StorageAdapter] setItem("${key}") error`);
                return false;
            }

            await AsyncStorage.setItem(key, value);
            // console.log(`[StorageAdapter] setItem("${key}") -> Correct in setItem`);
            return true;
        } catch (error) {
            // console.error(`[StorageAdapter] Error in setItem "${key}":`, error);
            return false;
        }
    }

    static async removeItem(key: string): Promise<boolean> {
        try {
            await AsyncStorage.removeItem(key);
            // console.log(`[StorageAdapter] removeItem("${key}") -> correctly removed`);
            return true;
        } catch (error) {
            // console.error(`[StorageAdapter] Error removing token "${key}":`, error);
            return false;
        }
    }
}
