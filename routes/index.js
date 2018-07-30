var Openpay = require('openpay');
var openpay =  new Openpay('m1qrxevuxnba1awxtzoc','sk_b06a035fa0d04d8282321f569b27b637');
//Render home
exports.index = function(req, res) {
  res.render('index')
};
//Render formulario
exports.registroCliente = function(req, res) {
  res.render('registro');
}
//Render lista de clientes
exports.listaClientes = function(req, res) {
  res.render('client-list');
}
//Middleware registro
exports.registrarCliente = function(req, res) {
  openpay.customers.create(req.body, function(error, cliente) {
    console.log({"error": error, "cliente": cliente});
    res.json({"error": error, "cliente": cliente});
  });
}
//Middleware lista de clientes
exports.listarClientes = function(req, res){
  openpay.customers.list(function(error, lista){
    console.log({"error": error, "lista": lista});
    res.json({"error": error, "lista": lista});
  });
}
