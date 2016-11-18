module.exports = function(app){
  var technologyController = app.controllers.technologyController;

  app.post('/v1/technologies', technologyController.create);
  app.delete('/v1/technologies/:id', technologyController.delete);

  app.put('/v1/technologies/:id', technologyController.update);
  app.get('/v1/technologies/list', technologyController.list);
}
