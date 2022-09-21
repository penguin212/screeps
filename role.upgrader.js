var roleUpgrader = {

    /** @param {Creep} creep **/
    run: function(creep) {

        if(creep.memory.upgrading && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.upgrading = false;
            creep.say('🔄 harvest');
        }
        if(!creep.memory.upgrading && creep.store.getFreeCapacity() == 0) {
            creep.memory.upgrading = true;
            creep.say('⚡ upgrade');
        }

        if(creep.memory.upgrading) {
            if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.room.controller, {visualizePathStyle: {stroke: '#ffffff'}});
            }
        }
        else {
            var sources = creep.room.find(FIND_SOURCES);
            if(creep.harvest(sources[creep.room.memory.upgrader_source]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[creep.room.memory.upgrader_source], {visualizePathStyle: {stroke: '#ffaa00'}});
            }
        }
    },
    
    spawn: function(spawner){
        Game.spawns[spawner].spawnCreep([WORK,CARRY,CARRY,MOVE], "upgrader" + Game.time.toString().slice(-4), {memory: {role:'upgrader', room:spawner.room}});
    }
};

module.exports = roleUpgrader;