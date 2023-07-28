import * as fs from 'fs';
import * as readline from 'readline';

interface Team {
    name: string;
    score: number;
}

export function calculateScore(input: string): string[] {
    let teams: Team[] = [];
    let results = input.split("\n");

    for(let result of results) {
        if(result.trim() !== "") {
            let match = result.split(",");
            let team1 = match[0].split(" ");
            let team2 = match[1].split(" ");
            let score1 = parseInt(team1.pop() as string);
            let score2 = parseInt(team2.pop() as string);
            let teamName1 = team1.join(" ").trim();
            let teamName2 = team2.join(" ").trim();

            updateScore(teams, teamName1, score1, score2);
            updateScore(teams, teamName2, score2, score1);
        }
    }

    teams.sort((a, b) => {
        if(b.score === a.score) {
            return a.name.localeCompare(b.name);
        } else {
            return b.score - a.score;
        }
    });

    let output: string[] = [];
    let rank = 1;
    let previousScore = teams[0].score;
    for(let i = 0; i < teams.length; i++) {
        if(teams[i].score < previousScore) {
            rank = i + 1;
        }
        let pointsText = teams[i].score === 1 ? "pt" : "pts";
        output.push(`${rank}. ${teams[i].name}, ${teams[i].score} ${pointsText}`);
        previousScore = teams[i].score;
    }
    return output;
}

export function updateScore(teams: Team[], teamName: string, teamScore: number, opponentScore: number): void {
    let team = teams.find(team => team.name === teamName);
    if(!team) {
        team = {name: teamName, score: 0};
        teams.push(team);
    }
    if(teamScore > opponentScore) {
        team.score += 3;
    } else if(teamScore === opponentScore) {
        team.score += 1;
    }
}

function main() {
    let fileName = process.argv[2];
    let input: string = fs.readFileSync(fileName, 'utf-8');
    console.log(calculateScore(input).join("\n"));
}

if (require.main === module) {
    main();
}
