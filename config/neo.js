const config = require('./env/env');
const neo4j = require('neo4j-driver').v1;

var driver = neo4j.driver("bolt://localhost", neo4j.auth.basic("neo4j", "123456"));

module.exports = driver;