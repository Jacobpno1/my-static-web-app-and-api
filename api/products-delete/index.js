const sql = require('mssql')

const AZURE_CONN_STRING = process.env["AzureSQLConnectionString"];

module.exports = async function (context, req) {  
  const id = parseInt(req.params.id, 10);

  try{
    const pool = await sql.connect(AZURE_CONN_STRING);

    const data = await pool.request()
      .query(`
        DELETE FROM [dbo].[products] WHERE Id = ${id}
      `);
            
  } catch (error) {
    context.res.status(500).send(error);
  }
}