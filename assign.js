#! /usr/bin/env node

var dateformat = require("dateformat");

function log(msg) {
    var d = new Date();
    console.log("[ " + dateformat(d, "H:mm:ss.l") + " ] " + msg); 
}

function write(msg) {
    process.stdout.write(msg);
}

function Timesheet() {
    this.days = [];
    for (var i=0; i < 7; i++) {
        this.days.push([
            {
                name : "morning",
                workers: [],
                positiveReq: [],
                negativeReq: []
            },
            {
                name: "evening",
                workers: [],
                positiveReq: [],
                negativeReq: []
            },
            {
                name: "night",
                workers: [],
                positiveReq: [],
                negativeReq: []
            }
        ]);
    }
}

Timesheet.prototype = {
    DAY_NAMES: ["SUNDAY", "MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY"],
    
    WEEKDAY_WF: [
        { nurse: 7, aux: 4, student: [0,99] }, // TODO opportunistic student
        { nurse: 4, aux: [1,2], student: [0, 2], extra: [
            { type: "if", data: { IF: { aux: 2 }, THEN: { student: 1 }, probability: 0.5 } },
            { type: "if", data: { IF: { aux: 1 }, THEN :{ student: 1 }, probability: 0.95} },
            { type: "if", data: { IF: { aux: 1 }, THEN: { student: 2 }, probability: 0.05} }
        ]},
        { nurse: [2,3], aux: [0,1], student: [0,1], extra: [
            { type: "if", data: { IF: { nurse: 2 }, THEN: { aux: 1 }, OR: { student: 1 }}}
        ]}
    ], 
    
    FRIDAY_WF: [
        { nurse: [4,5], aux: 4, student: [0,99] }, // TODO opportunistic student
        { nurse: 4, aux: 1, student: [0, 2] },
        { nurse: [2,3], aux: [0,1], student: [0,1], extra: [
            { type: "if", data: { IF: { nurse: 2 }, THEN: { aux: 1 }, OR: { student: 1 }}}
        ]}
    ],
    
    SATURDAY_WF: [
        { nurse: 4, aux: 4, student: [0,99] }, // TODO opportunistic student
        { nurse: 4, aux: [1,2], student: [0, 2], extra: [
            { type: "if", data: { IF: { aux: 2 }, THEN: { student: 1 }, probability: 0.5 } },
            { type: "if", data: { IF: { aux: 1 }, THEN :{ student: 1 }, probability: 0.95} },
            { type: "if", data: { IF: { aux: 1 }, THEN: { student: 2 }, probability: 0.05} }
        ]},
        { nurse: [2,3], aux: [0,1], student: [0,1], extra: [
            { type: "if", data: { IF: { nurse: 2 }, THEN: { aux: 1 }, OR: { student: 1 }}}
        ]}
    ],
    
    canWork: function(shift, worker) {
        // return false if not able to assign worker to slot                                                                                                                                                                                                                                                                                                          
        
        // 1. if worker is assigned for slot in same day - return false
        // 2. if worker is assigned for night in the day before the slot - return false
        // 3. if worker is assigned to more than 1 consecutive slots - return false (TODO with high probability - because it's extra hours)
        // 4. if shift is "morning" and worker is assigned already to "evening" in the day before - return false (TODO with high probability)
    },
    
    toString: function() {
        var str = "Timesheet:\n\n";
        for (var i=0;i<7;i++) {
            str += this.DAY_NAMES[i] + "\n=========\n";
            for (var j=0;j<3;j++) {
                var slot = this.days[i][j];
                str += slot.name + ":" + slot.workers + "\n";
            }
            str += "=-=-=-=-=-=-=-=-=\n";
        }
        str += "\n";
        return str;
    },
    eachDay: function() {
        
    }
};

log("Running assignment");

module.exports = Timesheet;