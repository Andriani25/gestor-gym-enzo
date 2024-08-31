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
    filteredUsers: userStoreData[],
    updateUsers: (newUsers: userStoreData[]) => void
    filterUsers: (prevState: userStoreData[], newFilter: userStoreData[]) => void
}



const useStore = create<userStore>()((set) => ({
 allUsers: [],
 filteredUsers: [],

 updateUsers: (newUsers: userStoreData[]) => set({allUsers: newUsers}),
 filterUsers: (prevState: userStoreData[], newFilter: userStoreData[]) => set({...prevState, filteredUsers: newFilter})

}))

// todo mal culiao arregl esto chau tengo sue;o

export default useStore