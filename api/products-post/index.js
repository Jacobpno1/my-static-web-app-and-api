const sql = require('mssql')

const AZURE_CONN_STRING = process.env["AzureSQLConnectionString"];

module.exports = async function (context, req) {  
  const product = {
    id: undefined,
    name: req.body.name,
    description: req.body.description,
    quantity: req.body.quantity
  };

  try{
    const pool = await sql.connect(AZURE_CONN_STRING);

    const data = await pool.request()
      .query(`
        INSERT INTO [dbo].[products] 
          (Name, Description, Quantity) 
        OUTPUT 
          INSERTED.Id, INSERTED.Name, INSERTED.[Description], INSERTED.Quantity 
        VALUES 
          ('${ product.name }', '${product.description}', ${product.quantity})
      `);
        
    context.res = {
      body: data.recordset.map(v => ({
        id: v.Id,
        name: v.Name,
        description: v.Description,
        quantity: v.Quantity,
      }))
    };
  } catch (error) {
    context.res.status(500).send(error);
  }
}