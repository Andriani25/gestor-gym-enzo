import { create } from 'zustand'

export interface userStoreData {
    email: string,
    data: {
        name: string;
        payDate: Date;
        cellPhone?: number;
        expireDate: Date;
        email: string;
    }
}

export interface userStore {
    allUsers: userStoreData[],
    updateUsers: (newUsers: userStoreData[]) => void
}



const useStore = create<userStore>()((set) => ({
 allUsers: [],

 updateUsers: (newUsers: userStoreData[]) => set({allUsers: newUsers})

}))

export default useStore