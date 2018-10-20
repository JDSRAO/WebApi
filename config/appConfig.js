module.exports =
{
    "auth" : 
    {
        "secret": "supersecret"
    },
    "mongo" : 
    {
        //"url" : "mongodb://localhost/propertydb",
        //"url" : "mongodb://jds-document:yQ0dZaMfuLZsOK2FZ6rBEihByaUP6fSzsbPowtEzRnrA1DspEXM8BKBTlb3n7iRyF7E1OwZtlPfHMx5mEZcDmA==@jds-document.documents.azure.com:10255/?ssl=true&replicaSet=globaldb",
        //"url": "mongodb://jds-document:${encodeURIComponent(KGE01A0Z4PxYlQw93lY1ZtrHvoW4U0KPimsT194ZgUNPSQ6ccMexNdghB68PCpxry44kellUBFIa3SsSs1s4rg==)}@jds-document.documents.azure.com:10255/?ssl=true&replicaSet=globaldb",
        "url" : 
        {
            "prefix" : "mongodb://jds-document:",
            "password" : "KGE01A0Z4PxYlQw93lY1ZtrHvoW4U0KPimsT194ZgUNPSQ6ccMexNdghB68PCpxry44kellUBFIa3SsSs1s4rg==",
            "host" : "@jds-document.documents.azure.com:10255/?ssl=true&replicaSet=globaldb"
        },
        "options" : {}
    }
}