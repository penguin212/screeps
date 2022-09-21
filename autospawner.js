var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');

var autospawner = {
    run: function(spawner){
        var total_harvesters = Game.getObjectById(spawner).memory.num_harvesters
        var total_upgraders = Game.getObjectById(spawner).memory.num_upgraders
        var total_builders = Game.getObjectById(spawner).memory.num_builders

        var current_harvesters = _.sum(Game.creeps, (c) => c.memory.role == 'builder' && c.memory.room == Game.getObjectById(spawner).room);
        var current_upgraders = _.sum(Game.creeps, (c) => c.memory.role == 'builder' && c.memory.room == Game.getObjectById(spawner).room);
        var current_builders = _.sum(Game.creeps, (c) => c.memory.role == 'builder' && c.memory.room == Game.getObjectById(spawner).room);
        
        if(total_harvesters < current_harvesters){
            roleHarvester.spawn(Game.getObjectById(spawner));
        } else if(total_upgraders < current_upgraders){
            roleUpgrader.spawn(Game.getObjectById(spawner));
        } else if(total_builders < current_builders){
            roleBuilder.spawn(Game.getObjectById(spawner));
        }
    }
}

module.exports = autospawner;