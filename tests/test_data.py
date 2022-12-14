"""Tests for data integrity."""

import math
import unittest
from pathlib import Path

HERE = Path(__file__)
ROOT = HERE.parent.parent.resolve()
USERS_PATH = ROOT.joinpath("resources", "users.csv")


class TestData(unittest.TestCase):
    """A test case for data integrity."""

    def test_users(self):
        """Test the users CSV file has the right number of columns."""
        header, *lines = USERS_PATH.read_text().splitlines()
        number_columns = header.count(",")
        errors = [
            (line_number, line)
            for line_number, line in enumerate(lines, start=2)
            if line.count(",") != number_columns
        ]
        if errors:
            message = "Lines with incorrect number of columns:\n"
            max_line = max(i for i, _ in errors)
            width = int(0.5 + math.log10(max_line))
            for line_number, line in errors:
                message += f"[line {line_number:{width}}]: {line}\n"
            self.fail(message)
