from collections import defaultdict

class Team:
    def __init__(self, name):
        self.name = name
        self.score = 0

    def update_score(self, goals_scored, goals_conceded):
        if goals_scored > goals_conceded:
            self.score += 3
        elif goals_scored == goals_conceded:
            self.score += 1

def calculate_score(filename):
    teams = {}
    with open(filename, 'r') as file:
        for line in file:
            team1_info, team2_info = line.strip().split(',')
            team1_name, team1_goals = team1_info.rsplit(' ', 1)
            team2_name, team2_goals = team2_info.rsplit(' ', 1)
            team1_goals, team2_goals = int(team1_goals), int(team2_goals)

            if team1_name not in teams:
                teams[team1_name] = Team(team1_name)
            if team2_name not in teams:
                teams[team2_name] = Team(team2_name)

            teams[team1_name].update_score(team1_goals, team2_goals)
            teams[team2_name].update_score(team2_goals, team1_goals)

    sorted_teams = sorted(teams.values(), key=lambda x: (-x.score, x.name))
    prev_team = sorted_teams[0]
    rank = 1
    result = []
    for idx, team in enumerate(sorted_teams, 1):
        if team.score < prev_team.score:
            rank = idx
        points = 'pt' if team.score == 1 else 'pts'
        result.append(f'{rank}. {team.name}, {team.score} {points}')
        prev_team = team
    return result

if __name__ == "__main__":
    import sys
    if len(sys.argv) != 2:
        print(f"Usage: python {sys.argv[0]} <input_file>", file=sys.stderr)
        sys.exit(1)
    
    output = calculate_score(sys.argv[1])
    for line in output:
        print(line)
