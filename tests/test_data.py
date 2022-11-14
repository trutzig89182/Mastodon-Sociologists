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
        errors = []
        for i, line in enumerate(USERS_PATH.read_text().splitlines(), start=1):
            if line.count(",") != 4:
                errors.append((i, line))
        if errors:
            s = "Lines with incorrect number of columns:\n"
            max_line = max(i for i, _ in errors)
            m = int(math.log(max_line))
            for i, line in errors:
                s += f"[line {i:{m}}]: {line}\n"
            self.fail(s)