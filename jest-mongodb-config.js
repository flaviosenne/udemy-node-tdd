module.exports ={
    mongodbMemoryServerOptions: {
        instance: {
            dbName: 'jest'
        },
        binary:{
            version: '1.2.3',
            skipMD5: true
        }, 
        autoStart:false
    }
}