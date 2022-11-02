const fs = require('fs');
require('dotenv').config();
const DateScalar = require('./graphqlDate.js');
const { ApolloServer } = require('apollo-server-express');
const barcode = require('./barcode.js')
const user = require('./user.js');
const { userInfo } = require('os');
const resolvers = {
    
    DateScalar : DateScalar,

    Query: {
        userLogin: user.loginVerify,
        BarcodeList: barcode.BarcodeList,
    },
    
    Mutation: {
        addBarcode: barcode.addBarcode,
    },
};

const server = new ApolloServer({
    typeDefs:fs.readFileSync('schema_graphql','utf-8'),
    resolvers,
    formatError: error => {
        console.log(error);
        return error;
    },
});

function installHandler(app) {
    const enableCors = (process.env.ENABLE_CORS || 'true') === 'true';
    console.log('CORS setting:', enableCors);
    server.start().then(() => {
        server.applyMiddleware({
            app,
            path: '/graphql',
            cors: enableCors,
        });
    });
}

module.exports = { installHandler };