const sql = require('mssql')

const AZURE_CONN_STRING = process.env["AzureSQLConnectionString"];

module.exports = async function (context, req) {
	const pool = await sql.connect(AZURE_CONN_STRING);

	const data = await pool.request()
		.query("SELECT * FROM [dbo].[products]");
		
	context.res = {
		body: data.recordset.map(v => ({
			id: v.Id,
      name: v.Name,
      description: v.Description,
      quantity: v.Quantity,
		}))
	};
}