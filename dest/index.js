"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var path = require("path");
var config = require("pkg-conf");
var playback_1 = require("./playback");
var record_1 = require("./record");
var avaConfing = config.sync('ava', { defaults: { playbacks: 'playbacks' } });
var projectPath = path.dirname(config.filepath(avaConfing));
var playbacksPath = path.join(projectPath, avaConfing.playbacks);
if (!fs.existsSync(playbacksPath))
    fs.mkdirSync(playbacksPath);
var mode = process.env.AVA_PLAYBACK;
if (mode === 'record')
    record_1.default(playbacksPath);
if (mode === 'play')
    playback_1.default(playbacksPath);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSx1QkFBd0I7QUFDeEIsMkJBQTRCO0FBQzVCLGlDQUFrQztBQUNsQyx1Q0FBaUM7QUFDakMsbUNBQTZCO0FBRTdCLElBQU0sVUFBVSxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQXlCLEtBQUssRUFBRSxFQUFFLFFBQVEsRUFBRSxFQUFFLFNBQVMsRUFBRSxXQUFXLEVBQUUsRUFBRSxDQUFDLENBQUE7QUFDdkcsSUFBTSxXQUFXLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUE7QUFDN0QsSUFBTSxhQUFhLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsVUFBVSxDQUFDLFNBQVMsQ0FBQyxDQUFBO0FBRWxFLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLFVBQVUsQ0FBQyxhQUFhLENBQUMsQ0FBQztJQUFDLEVBQUUsQ0FBQyxTQUFTLENBQUMsYUFBYSxDQUFDLENBQUE7QUFFOUQsSUFBTSxJQUFJLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBQyxZQUFZLENBQUE7QUFDckMsRUFBRSxDQUFDLENBQUMsSUFBSSxLQUFLLFFBQVEsQ0FBQztJQUFDLGdCQUFNLENBQUMsYUFBYSxDQUFDLENBQUE7QUFDNUMsRUFBRSxDQUFDLENBQUMsSUFBSSxLQUFLLE1BQU0sQ0FBQztJQUFDLGtCQUFRLENBQUMsYUFBYSxDQUFDLENBQUEifQ==