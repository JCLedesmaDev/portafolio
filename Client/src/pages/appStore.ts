import produce from "immer";
import { create } from "zustand";
import { shallow } from "zustand/shallow";


export interface IFilterSearch {
    page: number;
    filterText?: string
}

interface IPagination {
    totalPages: number;
    currentPage: number;
}


interface IStore {
    readonly state: {
        // user: IUserModels;
        // collection: IAlbumCollectionModels[];
        // albumes: IAlbumModels[];
        // purchasedAlbumes: any[]

        // // extras
        // spinnerModal: ISpinnerModels;
        // showPopup: boolean;
        pagination: IPagination
    },
    actions: {
        // setUser: (user: IUserModels) => void

        // getAllAlbumCollections: ({ page, filterText }: IFilterSearch) => Promise<any>;
        // getAllAlbumes: ({ page, filterText }: IFilterSearch) => Promise<any>;
        getAllPurchasedAlbumes: (payload: string) => Promise<void>;

        // // extras
        // setSpinnerModal: (newObjStatus: ISpinnerModels) => void;
        // setShowPopup: (newStatus: boolean) => void;
    }
}

const appStore = create<IStore>((set) => ({
    state: {
        // user: getStorage<IUserModels>("User") ?? {} as IUserModels,
        // collection: [],
        // albumes: [],
        // purchasedAlbumes: [],

        // //extras
        // spinnerModal: {} as ISpinnerModels,
        // showPopup: false,
        pagination: { totalPages: 0, currentPage: 0 }
    },
    actions: {
        // setUser: (user: IUserModels) => {
        setUser: (user: string) => {
            console.log("🚀 ~ file: appStore.ts:57 ~ user:", user)
            // setStorage("User", user)
            set(produce((store: IStore) => {
                console.log("🚀 ~ file: appStore.ts:59 ~ set ~ store:", store)
                // store.state.user = user
            }))
        },
        // setSpinnerModal: (newObjStatus: ISpinnerModels) => {
        //     set(produce((store: IStore) => {
        //         store.state.spinnerModal = { ...store.state.spinnerModal, ...newObjStatus }
        //     }))
        // },
        // setShowPopup: (newStatus: boolean) => {
        //     set(produce((store: IStore) => {
        //         store.state.showPopup = newStatus
        //     }))
        // },


        // getAllAlbumCollections: async (payload: IFilterSearch) => {
        //     const res = await apiSrv.callBackend(async () => {
        //         return await apiSrv.callSrv({
        //             method: 'GET',
        //             path: `/albumCollections/getAllCollections`,
        //             data: payload
        //         })
        //     }, { loader: true })

        //     if (res.info.type === 'error') return

        //     setPagination({
        //         currentPage: res.info.data.currentPage,
        //         totalPages: res.info.data.totalPages
        //     })

        //     const albumCollectionsAdapted: IAlbumCollectionModels[] = multipleAlbumCollectionMapper(res.info.data?.docs);

        //     set(produce((store: IStore) => {
        //         store.state.collection = albumCollectionsAdapted
        //     }))
        // },

        // getAllAlbumes: async (payload: IFilterSearch) => {
        //     const res = await apiSrv.callBackend(async () => {
        //         return await apiSrv.callSrv({
        //             method: 'GET',
        //             path: `/albumes/getAllAlbumes`,
        //             data: payload
        //         })
        //     }, { loader: true })

        //     if (res.info.type === 'error') return

        //     setPagination({
        //         currentPage: res.info.data.currentPage,
        //         totalPages: res.info.data.totalPages
        //     })

        //     const albumAdapted: IAlbumModels[] = multipleAlbumes(res.info.data?.docs);

        //     set(produce((store: IStore) => {
        //         store.state.albumes = albumAdapted
        //     }))
        // },

        getAllPurchasedAlbumes: async (payload: string) => {
        console.log("🚀 ~ file: appStore.ts:120 ~ getAllPurchasedAlbumes: ~ payload:", payload)
        //     const res = await apiSrv.callBackend(async () => {
        //         return await apiSrv.callSrv({
        //             method: 'GET',
        //             path: `/albumes/getAllPurchasedAlbumes`,
        //             data: payload
        //         })
        //     }, { loader: true })

        //     if (res.info.type === 'error') return

            setPagination({
                currentPage: 1, //res.info.data.currentPage,
                totalPages: 2//res.info.data.totalPages
            })

        //     const purchasedAlbumAdapted: IPurchasedAlbumModels[] = multiplePurchasedAlbumes(res.info.data?.docs);

        //     set(produce((store: IStore) => {
        //         store.state.purchasedAlbumes = purchasedAlbumAdapted
        //     }))
        },

    }
}))

const setPagination = (data: IPagination) => {
    appStore.setState((produce((store: IStore) => {
        store.state.pagination = {
            totalPages: data.totalPages,
            currentPage: data.currentPage - 1
        }
    })))
}

export const useAppStore = () => ({ ...appStore((state) => (state), shallow) })
export default appStore