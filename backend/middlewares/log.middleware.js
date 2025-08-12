export const cuncunaLogs = (req, _, next) => {
  console.log(
    {
      method: req.method,
      path: req.originalUrl,
      consulta: req.query, // PARA GETS
      body: req.body    // PARA POST
    })
  next()
}
