import sympy as sp
import random
import json
import os

# Variables to use (restrict to common HS algebra vars: x, y)
variables = [sp.symbols(v) for v in ["x", "y"]]

# Integer ranges
coeff_range = [i for i in range(-9, 10) if i not in (0, 1)]   # a cannot be 0 or 1 when constant
coeff_range_with_1 = [i for i in range(-9, 10) if i != 0]     # for coefficients like b and c
exp_range = [1, 2, 3, 4]  # only positive integers 1–4

flashcards = []


def format_expr(expr):
    """Format Sympy expression into plain text with ^ for exponents, no * symbols."""
    s = sp.sstr(expr)
    s = s.replace("**", "^")
    s = s.replace("*", "")
    return s


def format_term(coef, var=None, exp=1):
    """Format single term (like -1x^2, 3y, -4)."""
    if var is None:  # constant term only
        return f"{coef}"
    else:
        # Coefficient formatting
        if coef == 1:
            part1 = ""
        elif coef == -1:
            part1 = "-"
        else:
            part1 = f"{coef}"

        # Variable formatting
        if exp == 1:
            part2 = f"{var}"
        else:
            part2 = f"{var}^{exp}"

        return part1 + part2


def generate_case(case_type):
    x, y = variables

    if case_type == 1:
        # (a)(bx^p ± c)
        a = random.choice(coeff_range)
        b = random.choice(coeff_range_with_1)
        c = random.choice(range(1, 10))
        p = random.choice(exp_range)
        sign = random.choice([1, -1])

        expr = (a) * (b * x**p + sign * c)

        question = f"({a})({format_term(b, x, p)} {'+' if sign == 1 else '-'} {c})"

    elif case_type == 2:
        # (a)(bx^p ± cy^q)
        a = random.choice(coeff_range)
        b = random.choice(coeff_range_with_1)
        c = random.choice(coeff_range_with_1)
        p = random.choice(exp_range)
        q = random.choice(exp_range)
        sign = random.choice([1, -1])

        expr = (a) * (b * x**p + sign * c * y**q)

        question = f"({a})({format_term(b, x, p)} {'+' if sign == 1 else '-'} {format_term(c, y, q)})"

    elif case_type == 3:
        # (ax^m)(bx^p ± c)
        a = random.choice(coeff_range_with_1)
        b = random.choice(coeff_range_with_1)
        c = random.choice(range(1, 10))
        m = random.choice(exp_range)
        p = random.choice(exp_range)
        sign = random.choice([1, -1])

        expr = (a * x**m) * (b * x**p + sign * c)

        question = f"({format_term(a, x, m)})({format_term(b, x, p)} {'+' if sign == 1 else '-'} {c})"

    else:  # case 4
        # (ax^m)(bx^p ± cy^q)
        a = random.choice(coeff_range_with_1)
        b = random.choice(coeff_range_with_1)
        c = random.choice(coeff_range_with_1)
        m = random.choice(exp_range)
        p = random.choice(exp_range)
        q = random.choice(exp_range)
        sign = random.choice([1, -1])

        expr = (a * x**m) * (b * x**p + sign * c * y**q)

        question = f"({format_term(a, x, m)})({format_term(b, x, p)} {'+' if sign == 1 else '-'} {format_term(c, y, q)})"

    return {
        "question": question,
        "answer": format_expr(sp.expand(expr))
    }


# Generate 200 flashcards equally distributed among 4 cases
for case_type in range(1, 5):
    for _ in range(50):
        flashcards.append(generate_case(case_type))

# Save directly to ./public/flashcards.json
output_dir = os.path.join(os.getcwd(), "public")
os.makedirs(output_dir, exist_ok=True)
output_path = os.path.join(output_dir, "flashcards.json")

with open(output_path, "w") as f:
    json.dump(flashcards, f, indent=2)

print(f"✅ flashcards.json generated with {len(flashcards)} flashcards at {output_path}")