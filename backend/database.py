import sqlite3
def create_database():

    conn = sqlite3.connect("farmers.db")
    cursor = conn.cursor()

    # Farmers Table
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS farmers(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        crop TEXT,
        quantity INTEGER,
        expense INTEGER,
        profit INTEGER
    )
    """)

    # Government Schemes Table
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS government_schemes(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        category TEXT,
        benefit TEXT,
        eligibility TEXT,
        documents TEXT,
        apply_link TEXT,
        last_updated TEXT
    )
    """)

    conn.commit()
    conn.close()