const config = require('./env/env');
const neo4j = require('neo4j-driver').v1;

//var driver = neo4j.driver("bolt://localhost", neo4j.auth.basic("neo4j", "123456"));

if(process.env.NODE_ENV ===  'production'){
    var driver = neo4j.driver("bolt://hobby-mkdmfblfobflgbkenjomhjal.dbs.graphenedb.com:24786", neo4j.auth.basic("gameserverbyjeffry", "b.epnlZTmiay9B.obeT0zvOqBdSQ6ke"));
}else {
    var driver = neo4j.driver("bolt://localhost", neo4j.auth.basic("", ""));
}

module.exports = driver;