import { connectRouter } from 'connected-react-router'


export default (history) => ({
    router: connectRouter(history),
})
