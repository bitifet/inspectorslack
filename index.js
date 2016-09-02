// inspectorSLACK - index.js
// =========================
//
// @author: Joan Miquel Torres <jmtorres@112ib.com>
// @company: GEIBSAU
// @license: GPL
//
"use strict";


function getType(//{{{
    val
    ///, k // FIXME: Remove me (DEBUGGING)
){
    var t = typeof val;
    if (t == "object") t = (val instanceof Array) ? "ARRAY" : "OBJECT"; // Can contain subelements.
    if (t == "string") t = String(val).trim() && isNaN(val) ? t : "number";
    return t;
};//}}}

function oInspect (target, index, maxVals, pickAddr, path){//{{{

    for (let k in target) {
        var addr = path ? path+"."+k : k;
        var v = target[k];
        var t = getType(v, k);

        if (! index[k]) {
            ///console.log(k);
            index[k] = {
                __: {
                    _PATH_: addr,
                    _COUNT_: 0,
                    _EMPTY_COUNT_: 0,
                    _TYPES_: {},
                },
                _ITEMS_: {},
            };
            if (pickAddr[addr]) index[k].__._DATA_ = {};
            if ("object" != typeof v) {
                index[k].__._VALUES_ = {};
            };
        };

        index[k].__._COUNT_ += t == "ARRAY"
            ? v.length
            : 1
        ;
        index[k].__._TYPES_[t] = true; // Annotate type

        switch(t) {
            case "OBJECT":
                oInspect(v, index[k]._ITEMS_, maxVals, pickAddr, addr);
                if (! Object.keys(v).length) index[k].__._EMPTY_COUNT_++;
                break;
            case "ARRAY":
                for (let tt of v) oInspect(tt, index[k]._ITEMS_, maxVals, pickAddr, addr);
                if (! v.length) index[k].__._EMPTY_COUNT_++;
                break;
            default:
                if (! String(v).trim()) index[k].__._EMPTY_COUNT_++;
                if (index[k].__._VALUES_) {
                    if (Object.keys(index[k].__._VALUES_).length > maxVals) {
                        delete index[k].__._VALUES_;
                    } else {
                        index[k].__._VALUES_[v] = true;
                    };
                };
                if (pickAddr[addr]) {
                    index[k].__._DATA_[v] = true;
                };

        };

    };
};//}}}

function summarize (index, upperCount, summary, indent) {//{{{
    summary || (summary = []);
    indent || (indent = "");
    for (var i in index) {
        var t = Object.keys(index[i].__._TYPES_).join(", ");
        var __ = index[i].__;
        var percent = Math.round(__._COUNT_ * 10000 / upperCount) / 100;
        var epercent = Math.round(__._EMPTY_COUNT_ * 10000 / __._COUNT_) / 100;
        var summ = t
            + " - " + __._COUNT_
            + " (" + percent + "%)"
        ;
        if (__._EMPTY_COUNT_)
            summ += " [" + __._EMPTY_COUNT_
            + " (" + epercent + "%) EMPTY]"
        ;
        if (__._VALUES_)
            summ += " VALUES: ["
                + Object.keys(__._VALUES_).join(", ")
            + "]"
        ;
        if (__._DATA_) summ += " DATA: ["+Object.keys(__._DATA_).join(", ")+"]";
        summary.push(indent+__._PATH_+": "+summ);
        summarize(index[i]._ITEMS_, __._COUNT_, summary, indent+"  ");
    };
    return summary;
};//}}}

module.exports = function inspect (target, pickAddr, maxVals) {
    pickAddr || (pickAddr = {});
    if (pickAddr instanceof Array) {
        let arr = pickAddr;
        pickAddr = {};
        for (let k of arr) pickAddr[k] = true;
    };
    if (typeof pickAddr == "string") pickAddr = {[pickAddr]: true};
    maxVals || (maxVals = 5);
    var index = {};
    var c = 0;
    for (let item of target) {
        c++;
        oInspect (item, index, maxVals, pickAddr);
    };

    // console.log(index);
    return summarize(index, c);
};

