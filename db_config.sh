#!/bin/bash

# Verify user has mongodb executables
command -v mongod >/dev/null 2>&1 || { echo "mongod not installed. Aborting." >&2; exit 1; }
command -v mongos >/dev/null 2>&1 || { echo "mongos not installed. Aborting." >&2; exit 1; }

# Configuration options
# TODO: error handling (i.e. already configured)
DBNAME="haas"
HOSTNAME=`hostname`
PORT_SHARD0_M0=27107
PORT_SHARD0_M1=27108
PORT_SHARD0_ARB=27109
PORT_SHARD1_M0=27117
PORT_SHARD1_M1=27118
PORT_SHARD1_ARB=27119
PORT_SHARD2_M0=27127
PORT_SHARD2_M1=27128
PORT_SHARD2_ARB=27129
PORT_CONFIG0=27217
PORT_CONFIG1=27218
PORT_CONFIG2=27219
PORT_ROUTER0=27018
PORT_ROUTER1=27019

# Begin
printf "Setting up sharded $DBNAME on $HOSTNAME\n"

# Make the directories for data, if necessary
printf "\nMaking directories, if necessary\n"

# TODO: dbpaths to /data
mkdir -p ~/data/$DBNAME/config/{c0,c1,c2}
mkdir -p ~/data/$DBNAME/shard0/{m0,m1,arb}
mkdir -p ~/data/$DBNAME/shard1/{m0,m1,arb}
mkdir -p ~/data/$DBNAME/shard2/{m0,m1,arb}
mkdir -p ~/data/$DBNAME/{s0,s1}

# TODO: SSL
# Shard 0 replica set
printf "\nSetting up first shard\n"

mongod --replSet shard0 \
--dbpath ~/data/$DBNAME/shard0/m0 \
--logpath ~/data/$DBNAME/shard0/m0/mongod.log \
--fork --port $PORT_SHARD0_M0

mongod --replSet shard0 \
--dbpath ~/data/$DBNAME/shard0/m1 \
--logpath ~/data/$DBNAME/shard0/m1/mongod.log \
--fork --port $PORT_SHARD0_M1

mongod --replSet shard0 \
--dbpath ~/data/$DBNAME/shard0/arb \
--logpath ~/data/$DBNAME/shard0/arb/mongod.log \
--fork --port $PORT_SHARD0_ARB

printf "Initiating replica set\n"

CFG_SHARD0="{
    _id: 'shard0',
    members: [
        {_id: 0, host:'$HOSTNAME:$PORT_SHARD0_M0'},
        {_id: 1, host:'$HOSTNAME:$PORT_SHARD0_M1'},
	{_id: 2, host:'$HOSTNAME:$PORT_SHARD0_ARB', arbiterOnly: true}
    ]
}"

mongo $DBNAME --port $PORT_SHARD0_M0 \
--eval "JSON.stringify(db.adminCommand({'replSetInitiate' : $CFG_SHARD0}))"

# Shard 1 replica set
printf "\nSetting up second shard\n"

mongod --replSet shard1 \
--dbpath ~/data/$DBNAME/shard1/m0 \
--logpath ~/data/$DBNAME/shard1/m0/mongod.log \
--fork --port $PORT_SHARD1_M0

mongod --replSet shard1 \
--dbpath ~/data/$DBNAME/shard1/m1 \
--logpath ~/data/$DBNAME/shard1/m1/mongod.log \
--fork --port $PORT_SHARD1_M1

mongod --replSet shard1 \
--dbpath ~/data/$DBNAME/shard1/arb \
--logpath ~/data/$DBNAME/shard1/arb/mongod.log \
--fork --port $PORT_SHARD1_ARB

printf "Initiating replica set\n"

CFG_SHARD1="{
    _id: 'shard1',
    members: [
        {_id: 0, host:'$HOSTNAME:$PORT_SHARD1_M0'},
        {_id: 1, host:'$HOSTNAME:$PORT_SHARD1_M1'},
	{_id: 2, host:'$HOSTNAME:$PORT_SHARD1_ARB', arbiterOnly: true}
    ]
}"

mongo $DBNAME --port $PORT_SHARD1_M0 \
--eval "JSON.stringify(db.adminCommand({'replSetInitiate' : $CFG_SHARD1}))"

# Shard 2 replica set
printf "\nSetting up third shard\n"

mongod --replSet shard2 \
--dbpath ~/data/$DBNAME/shard2/m0 \
--logpath ~/data/$DBNAME/shard2/m0/mongod.log \
--fork --port $PORT_SHARD2_M0

mongod --replSet shard2 \
--dbpath ~/data/$DBNAME/shard2/m1 \
--logpath ~/data/$DBNAME/shard2/m1/mongod.log \
--fork --port $PORT_SHARD2_M1

mongod --replSet shard2 \
--dbpath ~/data/$DBNAME/shard2/arb \
--logpath ~/data/$DBNAME/shard2/arb/mongod.log \
--fork --port $PORT_SHARD2_ARB

printf "Initiating replica set\n"

CFG_SHARD2="{
    _id: 'shard2',
    members: [
        {_id: 0, host:'$HOSTNAME:$PORT_SHARD2_M0'},
        {_id: 1, host:'$HOSTNAME:$PORT_SHARD2_M1'},
	{_id: 2, host:'$HOSTNAME:$PORT_SHARD2_ARB', arbiterOnly: true}
    ]
}"

mongo $DBNAME --port $PORT_SHARD2_M0 \
--eval "JSON.stringify(db.adminCommand({'replSetInitiate' : $CFG_SHARD2}))"

# Config servers
printf "\nSetting up config databases\n"

mongod \
--dbpath ~/data/$DBNAME/config/c0 \
--logpath ~/data/$DBNAME/config/c0/mongod.log \
--fork --port $PORT_CONFIG0 --configsvr

mongod \
--dbpath ~/data/$DBNAME/config/c1 \
--logpath ~/data/$DBNAME/config/c1/mongod.log \
--fork --port $PORT_CONFIG1 --configsvr

mongod \
--dbpath ~/data/$DBNAME/config/c2 \
--logpath ~/data/$DBNAME/config/c2/mongod.log \
--fork --port $PORT_CONFIG2 --configsvr

# Routers
printf "\nSetting up mongos routers\n"

mongos --logpath ~/data/$DBNAME/s0/mongos.log --fork --port $PORT_ROUTER0 \
--configdb "$HOSTNAME:$PORT_CONFIG0,$HOSTNAME:$PORT_CONFIG1,$HOSTNAME:$PORT_CONFIG2"

mongos --logpath ~/data/$DBNAME/s1/mongos.log --fork --port $PORT_ROUTER1 \
--configdb "$HOSTNAME:$PORT_CONFIG0,$HOSTNAME:$PORT_CONFIG1,$HOSTNAME:$PORT_CONFIG2"

printf "Setting up shards\n"

mongo $DBNAME --port $PORT_ROUTER0 \
--eval "JSON.stringify(sh._adminCommand( { addShard : 'shard0/$HOSTNAME:$PORT_SHARD0_M0' } , true ))"
mongo $DBNAME --port $PORT_ROUTER0 \
--eval "JSON.stringify(sh._adminCommand( { addShard : 'shard1/$HOSTNAME:$PORT_SHARD1_M0' } , true ))"
mongo $DBNAME --port $PORT_ROUTER0 \
--eval "JSON.stringify(sh._adminCommand( { addShard : 'shard2/$HOSTNAME:$PORT_SHARD2_M0' } , true ))"
mongo $DBNAME --port $PORT_ROUTER0 \
--eval "JSON.stringify(sh._adminCommand( { enableSharding : '$DBNAME' } ))"

printf "\nDone!\n"
printf "You can now connect to the database through port $PORT_ROUTER0 or $PORT_ROUTER1.\n"

