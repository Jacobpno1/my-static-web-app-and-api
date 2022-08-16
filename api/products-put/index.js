const sql = require('mssql')

const AZURE_CONN_STRING = process.env["AzureSQLConnectionString"];

module.exports = async function (context, req) {  
  const product = {
    id: parseInt(req.params.id, 10),
    name: req.body.name,
    description: req.body.description,
    quantity: req.body.quantity,
  };

  try{
    const pool = await sql.connect(AZURE_CONN_STRING);

    const data = await pool.request()
      .query(`
        UPDATE [dbo].[products]
        SET [Name] = '${ product.name }', [Description] = '${product.description}', [Quantity] = ${product.quantity}
        OUTPUT INSERTED.[Id], INSERTED.[Name], INSERTED.[Description], INSERTED.[Quantity]
        WHERE [Id] = ${product.id}          
      `);               
    context.res.status(200).json(data);

  } catch (error) {
    context.res.status(500).send(error);
  }
}