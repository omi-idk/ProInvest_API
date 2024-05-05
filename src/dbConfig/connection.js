import sql from 'mssql'

const dbSettings = {
    user : "ProInvestAdmin",
    password: "prueba123",
    server:  "localhost",
    database: "ProInvestDB",
    options: {
        encrypt: true,
        trustServerCertificate: true
    },

};

export async function getConnection(){
    try{
        const pool = await sql.connect(dbSettings)
        return pool;
    } catch(error){
        console.error(error)
    }

}

export {sql};
