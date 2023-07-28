"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateScore = exports.calculateScore = void 0;
var fs = require("fs");
function calculateScore(input) {
    var teams = [];
    var results = input.split("\n");
    for (var _i = 0, results_1 = results; _i < results_1.length; _i++) {
        var result = results_1[_i];
        if (result.trim() !== "") {
            var match = result.split(",");
            var team1 = match[0].split(" ");
            var team2 = match[1].split(" ");
            var score1 = parseInt(team1.pop());
            var score2 = parseInt(team2.pop());
            var teamName1 = team1.join(" ").trim();
            var teamName2 = team2.join(" ").trim();
            updateScore(teams, teamName1, score1, score2);
            updateScore(teams, teamName2, score2, score1);
        }
    }
    teams.sort(function (a, b) {
        if (b.score === a.score) {
            return a.name.localeCompare(b.name);
        }
        else {
            return b.score - a.score;
        }
    });
    var output = [];
    var rank = 1;
    var previousScore = teams[0].score;
    for (var i = 0; i < teams.length; i++) {
        if (teams[i].score < previousScore) {
            rank = i + 1;
        }
        var pointsText = teams[i].score === 1 ? "pt" : "pts";
        output.push("".concat(rank, ". ").concat(teams[i].name, ", ").concat(teams[i].score, " ").concat(pointsText));
        previousScore = teams[i].score;
    }
    return output;
}
exports.calculateScore = calculateScore;
function updateScore(teams, teamName, teamScore, opponentScore) {
    var team = teams.find(function (team) { return team.name === teamName; });
    if (!team) {
        team = { name: teamName, score: 0 };
        teams.push(team);
    }
    if (teamScore > opponentScore) {
        team.score += 3;
    }
    else if (teamScore === opponentScore) {
        team.score += 1;
    }
}
exports.updateScore = updateScore;
function main() {
    var fileName = process.argv[2];
    var input = fs.readFileSync(fileName, 'utf-8');
    console.log(calculateScore(input).join("\n"));
}
if (require.main === module) {
    main();
}
