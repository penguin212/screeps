var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');

var autospawner = {
    run: function(spawner){
        var total_harvesters = Game.spawns[spawner].memory.num_harvesters;
        var total_upgraders = Game.spawns[spawner].memory.num_upgraders;
        var total_builders = Game.spawns[spawner].memory.num_builders;

        var current_harvesters = _.sum(Game.creeps, (c) => c.memory.role == 'harvester' && c.memory.room['name'] == Game.spawns[spawner].room);
        var current_upgraders = _.sum(Game.creeps, (c) => c.memory.role == 'upgrader' && c.memory.room['name'] == Game.spawns[spawner].room);
        var current_builders = _.sum(Game.creeps, (c) => c.memory.role == 'builder' && c.memory.room['name'] == Game.spawns[spawner].room);
        
        if(total_harvesters > current_harvesters){
            console.log(current_harvesters);
            roleHarvester.spawn(spawner);
        } else if(total_upgraders > current_upgraders){
            roleUpgrader.spawn(spawner);
        } else if(total_builders > current_builders){
            roleBuilder.spawn(spawner);
        }
    }
}

module.exports = autospawner;