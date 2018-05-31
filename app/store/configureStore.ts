let configureStore: any

export = configureStore = require(`./configureStore.${process.env.NODE_ENV}`)
