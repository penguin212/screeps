var roleBuilder = {

    /** @param {Creep} creep **/
    run: function(creep) {

        if(creep.memory.building && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.building = false;
            creep.say('🔄 harvest');
        }
        if(!creep.memory.building && creep.store.getFreeCapacity() == 0) {
            creep.memory.building = true;
            creep.say('🚧 build');
        }

        if(creep.memory.building) {
            var targets = creep.room.find(FIND_CONSTRUCTION_SITES);
            if(targets.length) {
                if(creep.build(targets[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
                }
            }
        }
        else {
            var sources = creep.room.find(FIND_SOURCES);
            if(creep.harvest(sources[creep.room.memory.builder_source]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[creep.room.memory.builder_source], {visualizePathStyle: {stroke: '#ffaa00'}});
            }
        }
    },

    spawn: function(spawner){
        Game.spawns[spawner].spawnCreep([WORK,CARRY,CARRY,MOVE], "harvester" + Game.time.toString().slice(-4), {memory: {role:'builder', room:Game.spawns[spawner].room}});
    }
};

module.exports = roleBuilder;