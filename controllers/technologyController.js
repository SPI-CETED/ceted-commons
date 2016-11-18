var models = require('../models');
var Technology = models.Technology;


module.exports = function(app) {

    var HabiltyController = {

        create : function(req, res){
          Technology.build(req.body).save().then(function(technology){

      			technologyCreated(technology, res);

      		}).catch(function(error){

      			errorCreatingTechnology(res, error);

      		});
        },

        delete : function(req, res){
            Technology.destroy({where: {id: req.params.id}}).then(function(){
                technologyDeleted(res);
            });
        },

        update: function(req, res){
          Technology.findOne({where: {id: req.params.id}}).then(function(technology){
            if(technology){
              technology.updateAttributes(req.body).then(function(technology){
                technologyUpdated(technology, res);
              }).catch(function(error){
                errorCreatingTechnology(res, error);
              });
            }else{
              technologyNotFound(res);
            }
          });
        },

        list: function(req, res){
          var limit = req.query.limit || 10;
          limit = parseInt(limit);
          var offset = req.query.offset || 0;
          offset = parseInt(offset);

          Technology.findAll({
            limit: limit,
            offset: offset,
            order: 'id DESC'
          }).then(function(habilities){
            var data = {};
            data.result = habilities;
            data.limit = limit;
            data.offset = offset;
            res.status(200).json(data);
          })
        }

    };

    var technologyFound = function(user, res){
      buildResponse(res, 200, 'Technology Found', user);
    };

    var technologyCreated = function(technology, res){
        buildResponse(res, 201, 'Technology Created', technology);
    };

    var technologyDeleted = function(res){
        buildResponse(res, 200, 'Technology Deleted');
    };

    var errorCreatingTechnology = function(res, err){
        buildResponse(res, 500, 'Technology not Created', null, err);
    };

    var technologyUpdated = function(technology, res){
      buildResponse(res, 201, 'Technology Updated', technology);
    };

    var errorUpdatingTechnology = function(res, err){
      buildResponse(res, 500, 'Technology not Updated', null, err);
    };

    var technologyNotFound = function(res){
      buildResponse(res, 404, 'Technology Not Found');
    };

    var buildResponse = function(res, statusCode, message, technology, error){
        var jsonResponse = {};
        if(!!message){
            jsonResponse.message = message;
        }
        if(!!technology){
            jsonResponse.technology = technology;
        }
        if(!!error){
            jsonResponse.error = error;
        }

        res.status(statusCode).json(jsonResponse);
    }

    return HabiltyController;

}
