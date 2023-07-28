import unittest
from solution import calculate_score

class TestSoccerLeagueRanking(unittest.TestCase):

    def setUp(self):
        self.input_data = """\
Lions 3, Snakes 3
Tarantulas 1, FC Awesome 0
Lions 1, FC Awesome 1
Tarantulas 3, Snakes 1
Lions 4, Grouches 0
"""
        self.expected_output = ['1. Tarantulas, 6 pts', '2. Lions, 5 pts', '3.  FC Awesome, 1 pt', '3.  Snakes, 1 pt', '5.  Grouches, 0 pts']

    def test_calculate_score(self):
        # Write the input data to a temporary file
        with open('temp.txt', 'w') as file:
            file.write(self.input_data)

        # Run calculate_score
        output = calculate_score('temp.txt')

        self.assertEqual(output, self.expected_output)

if __name__ == '__main__':
    unittest.main()
