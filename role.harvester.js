var roleHarvester = {

    /** @param {Creep} creep **/
    run: function(creep) {
        if(creep.store.getFreeCapacity() > 0) {
            var sources = creep.room.find(FIND_SOURCES);
            if(creep.harvest(sources[creep.room.memory.harvester_source]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[creep.room.memory.harvester_source], {visualizePathStyle: {stroke: '#ffaa00'}});
            }
        }
        else {
            var targets = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_EXTENSION ||
                        structure.structureType == STRUCTURE_SPAWN ||
                        structure.structureType == STRUCTURE_TOWER) &&
                        structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
                }
            });
            if(targets.length > 0) {
                if(creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
                }
            }
        }
    },

    spawn: function(spawner){
        console.log('e');
        Game.spawns[spawner].spawnCreep([WORK,CARRY,CARRY,MOVE], "harvester" + Game.time.toString().slice(-4), {memory: {role:'harvester', room:spawner.room}});
    }
};

module.exports = roleHarvester;