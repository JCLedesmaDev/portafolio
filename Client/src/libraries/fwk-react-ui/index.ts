import notify from './Notify'
import loader from './Loader'
import storeUi, { useStoreUi } from './store'

const initializateLibraryUi = (
    refNotify: React.MutableRefObject<HTMLDivElement>,
    refLoader: React.MutableRefObject<HTMLDivElement>
) => {
    notify.initializateNotify(refNotify)
    loader.initializateLoader(refLoader)
}


export default {
    actions: storeUi.getState().actions,
    useStoreUi,
    initializateLibraryUi
}
