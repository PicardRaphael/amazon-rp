import createStore from './createStore'

const store = createStore({
  lang: 'fr',
})

export type ValuesStore = ReturnType<typeof store.getState>

export default store
