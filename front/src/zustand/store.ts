import { create } from 'zustand'

export interface userData {
    email: string,
    data: {
        name: string,
        monthsPayed?: string[],
        cellPhone? : number,
        totalDebt?: number,
    }
}

export interface userStore {
    allUsers: userData[],
    updateUsers: (newUsers: userData[]) => void
}



const useStore = create<userStore>()((set) => ({
 allUsers: [],

 updateUsers: (newUsers: userData[]) => set({allUsers: newUsers})

}))

export default useStore