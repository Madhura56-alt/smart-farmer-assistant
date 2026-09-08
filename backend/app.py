import os
import json
import random
import sqlite3
from datetime import datetime

import requests
from bs4 import BeautifulSoup

from flask import Flask, jsonify, request
from flask_cors import CORS


# ============================================================
# SMART FARMER ASSISTANT
# ============================================================
#
# FEATURES
# 1. Karnataka Market Prices
# 2. 44+ Crop List
# 3. Profit Predictor
# 4. LIVE Government Schemes
# 5. Farmer History
# 6. Daily Farming Tips
# 7. Health Check
#
# Government Schemes:
# Fetches the official myScheme Eligibility Engine.
# Does NOT require an API key.
#
# ============================================================


# ============================================================
# FLASK SETUP
# ============================================================

BASE_DIR = os.path.dirname(
    os.path.abspath(__file__)
)

app = Flask(__name__)

CORS(
    app,
    resources={
        r"/*": {
            "origins": "*"
        }
    }
)


# ============================================================
# DATABASE / CACHE FILES
# ============================================================

FARMERS_DB = os.path.join(
    BASE_DIR,
    "farmers.db"
)

MARKET_DB = os.path.join(
    BASE_DIR,
    "market_prices.db"
)

LIVE_SCHEMES_CACHE = os.path.join(
    BASE_DIR,
    "live_schemes_cache.json"
)


# ============================================================
# OFFICIAL GOVERNMENT SCHEME SOURCES
# ============================================================

MYSCHEME_HOME = (
    "https://www.myscheme.gov.in/"
)

MYSCHEME_RULES = (
    "https://rules.myscheme.gov.in/"
)


# ============================================================
# COMMON FUNCTIONS
# ============================================================

def today_date():
    return datetime.now().strftime("%d/%m/%Y")


def now_iso():
    return datetime.now().isoformat()


# ============================================================
# HOME
# ============================================================

@app.route("/", methods=["GET"])
def home():

    return jsonify({

        "success": True,

        "message":
            "Smart Farmer Assistant Backend Running",

        "apis": {

            "market_prices":
                "/market-prices",

            "market_status":
                "/market-prices/status",

            "crops":
                "/crops",

            "profit_crops":
                "/profit-crops",

            "profit_calculate":
                "/profit-calculate",

            "save":
                "/save",

            "farmers":
                "/farmers",

            "government_schemes":
                "/government-schemes",

            "schemes":
                "/schemes",

            "government_schemes_refresh":
                "/government-schemes/refresh",

            "government_schemes_status":
                "/government-schemes/status",

            "daily_tip":
                "/daily-tip",

            "health":
                "/health"
        }
    })


# ============================================================
# KARNATAKA CROPS
# ============================================================

CROPS = [

    ("Rice", 3200),
    ("Wheat", 2500),
    ("Maize", 2200),
    ("Ragi", 3400),
    ("Jowar", 3300),
    ("Bajra", 2700),

    ("Red Gram", 6500),
    ("Green Gram", 7200),
    ("Black Gram", 7500),
    ("Moong", 7800),
    ("Horse Gram", 5400),
    ("Cowpea", 6500),

    ("Groundnut", 6200),
    ("Sesame", 6800),
    ("Sunflower", 5700),
    ("Castor", 5300),

    ("Turmeric", 14000),
    ("Chilli", 12000),
    ("Cotton", 7000),

    ("Sugarcane", 3200),
    ("Coconut", 3985),
    ("Arecanut", 50000),

    ("Onion", 2700),
    ("Potato", 2316),
    ("Tomato", 2600),

    ("Bengal Gram", 6200),
    ("Avare Dal", 6000),
    ("Field Pea", 4500),
    ("Mustard", 5600),

    ("Coriander", 7200),
    ("Garlic", 9000),
    ("Carrot", 3000),
    ("Beans", 4000),
    ("Brinjal", 2500),
    ("Cabbage", 1800),
    ("Cauliflower", 2800),

    ("Banana", 3200),
    ("Mango", 6000),
    ("Papaya", 2800),
    ("Pomegranate", 11000),

    ("Sweet Potato", 2600),
    ("Tamarind", 8500),
    ("Lime", 5000),
    ("Ginger", 7000)
]


# ============================================================
# CROPS API
# ============================================================

@app.route("/crops", methods=["GET"])
def get_crops():

    try:

        crops = []

        for crop_name, price in CROPS:

            crops.append({
                "crop": crop_name,
                "price": price
            })

        return jsonify({

            "success": True,

            "count": len(crops),

            "crops": crops

        })

    except Exception as error:

        print("Crops API error:", error)

        return jsonify({

            "success": False,

            "count": 0,

            "crops": [],

            "message":
                "Unable to load crops."

        }), 500


# ============================================================
# KARNATAKA APMC MARKETS
# ============================================================

KARNATAKA_MARKETS = [

    ("Udupi", "Karkala APMC"),
    ("Udupi", "Udupi APMC"),
    ("Udupi", "Kundapura APMC"),

    ("Dakshina Kannada", "Mangalore APMC"),
    ("Dakshina Kannada", "Puttur APMC"),
    ("Dakshina Kannada", "Bantwal APMC"),

    ("Mysuru", "Mysore APMC"),
    ("Mandya", "Mandya APMC"),
    ("Hassan", "Hassan APMC"),

    ("Shivamogga", "Shivamogga APMC"),
    ("Davanagere", "Davanagere APMC"),
    ("Tumakuru", "Tumakuru APMC"),

    ("Kolar", "Kolar APMC"),
    ("Chitradurga", "Chitradurga APMC"),

    ("Belagavi", "Belagavi APMC"),
    ("Bagalkot", "Bagalkot APMC"),
    ("Vijayapura", "Vijayapura APMC"),

    ("Raichur", "Raichur APMC"),
    ("Yadgir", "Yadgir APMC"),
    ("Kalaburagi", "Kalaburagi APMC"),

    ("Dharwad", "Dharwad APMC"),
    ("Dharwad", "Hubballi APMC"),

    ("Ballari", "Ballari APMC"),
    ("Chikkamagaluru", "Chikkamagaluru APMC"),

    ("Kodagu", "Madikeri APMC"),
    ("Chamarajanagar", "Chamarajanagar APMC"),

    ("Haveri", "Haveri APMC"),
    ("Gadag", "Gadag APMC")
]


# ============================================================
# CREATE MARKET RECORD
# ============================================================

def create_market_record(
    record_id,
    crop,
    base_price,
    district,
    market
):

    variation = random.randint(-250, 250)

    modal_price = base_price + variation

    if modal_price < 100:
        modal_price = base_price

    minimum_price = int(
        modal_price * 0.92
    )

    maximum_price = int(
        modal_price * 1.08
    )

    arrival = today_date()

    return {

        "id": record_id,

        "crop": crop,

        "market": market,

        "district": district,

        "state": "Karnataka",

        "price": modal_price,

        "min_price": minimum_price,

        "max_price": maximum_price,

        "arrival_date": arrival,

        "commodity": crop,

        "market_name": market,

        "district_name": district,

        "state_name": "Karnataka",

        "modal_price": modal_price,

        "modalPrice": modal_price,

        "minimum_price": minimum_price,

        "maximum_price": maximum_price,

        "arrivalDate": arrival,

        "date": arrival

    }


# ============================================================
# GENERATE MARKET PRICES
# ============================================================

def generate_market_prices():

    random.seed(
        datetime.now().strftime("%Y-%m-%d")
    )

    prices = []

    for record_id in range(1, 1001):

        crop_name, base_price = random.choice(
            CROPS
        )

        district, market = random.choice(
            KARNATAKA_MARKETS
        )

        record = create_market_record(
            record_id,
            crop_name,
            base_price,
            district,
            market
        )

        prices.append(record)

    return prices


# ============================================================
# SAVE MARKET PRICES
# ============================================================

def save_market_prices(prices):

    connection = None

    try:

        connection = sqlite3.connect(
            MARKET_DB
        )

        cursor = connection.cursor()

        cursor.execute("""
            CREATE TABLE IF NOT EXISTS market_data (

                id INTEGER PRIMARY KEY,

                crop TEXT,

                market TEXT,

                district TEXT,

                state TEXT,

                price INTEGER,

                min_price INTEGER,

                max_price INTEGER,

                arrival_date TEXT
            )
        """)

        cursor.execute(
            "DELETE FROM market_data"
        )

        for item in prices:

            cursor.execute(
                """
                INSERT INTO market_data
                (
                    id,
                    crop,
                    market,
                    district,
                    state,
                    price,
                    min_price,
                    max_price,
                    arrival_date
                )
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
                """,
                (
                    item["id"],
                    item["crop"],
                    item["market"],
                    item["district"],
                    item["state"],
                    item["price"],
                    item["min_price"],
                    item["max_price"],
                    item["arrival_date"]
                )
            )

        connection.commit()

        return True

    except Exception as error:

        print(
            "Market database save error:",
            error
        )

        return False

    finally:

        if connection:
            connection.close()


# ============================================================
# MARKET PRICES API
# ============================================================

@app.route(
    "/market-prices",
    methods=["GET"]
)
def market_prices():

    try:

        prices = generate_market_prices()

        save_market_prices(prices)

        return jsonify({

            "success": True,

            "cached": False,

            "fallback": True,

            "live": False,

            "state": "Karnataka",

            "count": len(prices),

            "total_records": len(prices),

            "last_checked": now_iso(),

            "prices": prices,

            "source":
                "Smart Farmer Assistant fallback",

            "message":
                "These are generated fallback prices. "
                "They are NOT live government market prices."

        })

    except Exception as error:

        print(
            "Market API error:",
            error
        )

        return jsonify({

            "success": False,

            "prices": [],

            "count": 0,

            "message":
                "Unable to generate market prices."

        }), 500


# ============================================================
# MARKET STATUS
# ============================================================

@app.route(
    "/market-prices/status",
    methods=["GET"]
)
def market_status():

    return jsonify({

        "success": True,

        "status": "available",

        "state": "Karnataka",

        "records": 1000,

        "last_checked": now_iso(),

        "live": False,

        "source":
            "Fallback agricultural market data"

    })


# ============================================================
# PROFIT CROPS
# ============================================================

PROFIT_CROPS = [

    {
        "crop": crop_name,
        "price": price
    }

    for crop_name, price in CROPS
]


# ============================================================
# PROFIT CROPS API
# ============================================================

@app.route(
    "/profit-crops",
    methods=["GET"]
)
def profit_crops():

    return jsonify({

        "success": True,

        "count": len(PROFIT_CROPS),

        "crops": PROFIT_CROPS

    })


# ============================================================
# PROFIT CALCULATE API
# ============================================================

@app.route(
    "/profit-calculate",
    methods=["POST"]
)
def profit_calculate():

    try:

        data = request.get_json(
            silent=True
        ) or {}

        crop = str(
            data.get(
                "crop",
                ""
            )
        ).strip()

        quantity = float(
            data.get(
                "quantity",
                0
            )
        )

        expense = float(
            data.get(
                "expense",
                0
            )
        )

        if not crop:

            return jsonify({

                "success": False,

                "message":
                    "Please select a crop."

            }), 400

        if quantity <= 0:

            return jsonify({

                "success": False,

                "message":
                    "Quantity must be greater than 0."

            }), 400

        if expense < 0:

            return jsonify({

                "success": False,

                "message":
                    "Expense cannot be negative."

            }), 400

        selected_crop = None

        for item in PROFIT_CROPS:

            if (
                item["crop"].lower()
                == crop.lower()
            ):

                selected_crop = item

                break

        if selected_crop is None:

            return jsonify({

                "success": False,

                "message":
                    "Crop not found."

            }), 400

        price = float(
            selected_crop["price"]
        )

        income = quantity * price

        final_profit = income - expense

        return jsonify({

            "success": True,

            "crop":
                selected_crop["crop"],

            "quantity":
                quantity,

            "price":
                price,

            "income":
                round(income, 2),

            "expense":
                round(expense, 2),

            "profit":
                round(final_profit, 2)

        })

    except (ValueError, TypeError):

        return jsonify({

            "success": False,

            "message":
                "Quantity and expense must be valid numbers."

        }), 400

    except Exception as error:

        print(
            "Profit calculation error:",
            error
        )

        return jsonify({

            "success": False,

            "message":
                "Unable to calculate profit."

        }), 500


# ============================================================
# LIVE GOVERNMENT SCHEMES
# ============================================================
#
# Uses the official myScheme rules/listing page first.
# For each discovered scheme, the backend keeps the official
# scheme URL and tries to read publicly available details from
# that official page. It never invents benefits or eligibility.
#
# ============================================================

def clean_scheme_text(value):

    if not value:
        return ""

    return " ".join(
        str(value).replace("\\n", " ").split()
    ).strip()


def extract_labeled_text(soup, labels):

    labels = [
        label.lower().strip()
        for label in labels
    ]

    # Look for headings/strong/labels followed by text.
    for tag in soup.find_all([
        "h1", "h2", "h3", "h4", "h5", "h6",
        "strong", "b", "label", "dt"
    ]):

        heading = clean_scheme_text(
            tag.get_text(" ", strip=True)
        )

        heading_lower = heading.lower().rstrip(":")

        if not any(
            label in heading_lower
            for label in labels
        ):
            continue

        # Definition-list value
        if tag.name == "dt":
            sibling = tag.find_next_sibling("dd")
            if sibling:
                value = clean_scheme_text(
                    sibling.get_text(" ", strip=True)
                )
                if value:
                    return value

        # Common next element patterns
        for candidate in [
            tag.find_next_sibling(),
            tag.find_next("p"),
            tag.find_next("div")
        ]:

            if candidate and candidate is not tag:

                value = clean_scheme_text(
                    candidate.get_text(" ", strip=True)
                )

                if value and value.lower() != heading_lower:
                    return value

    return None


def extract_scheme_details(scheme_url, fallback_description):

    details = {
        "description": fallback_description,
        "benefit":
            "See the official scheme page for current benefits.",
        "eligibility": [
            "See the official scheme page for current eligibility."
        ],
        "documents": [
            "See the official scheme page for required documents."
        ],
        "deadline":
            "Check the official scheme page for the current deadline."
    }

    if not scheme_url or scheme_url == MYSCHEME_HOME:
        return details

    try:

        headers = {
            "User-Agent":
                "Mozilla/5.0 (Windows NT 10.0; Win64; x64) "
                "AppleWebKit/537.36 (KHTML, like Gecko) "
                "Chrome/151.0.0.0 Safari/537.36",
            "Accept":
                "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
            "Accept-Language":
                "en-US,en;q=0.9"
        }

        response = requests.get(
            scheme_url,
            headers=headers,
            timeout=15
        )

        response.raise_for_status()

        soup = BeautifulSoup(
            response.text,
            "html.parser"
        )

        # Meta description is usually safer than arbitrary page text.
        meta = soup.find(
            "meta",
            attrs={"name": "description"}
        )

        if meta and meta.get("content"):
            description = clean_scheme_text(
                meta.get("content")
            )
            if len(description) >= 20:
                details["description"] = description

        benefit = extract_labeled_text(
            soup,
            [
                "benefit",
                "benefits",
                "advantages"
            ]
        )

        if benefit:
            details["benefit"] = benefit

        eligibility = extract_labeled_text(
            soup,
            [
                "eligibility",
                "who can apply",
                "eligibility criteria"
            ]
        )

        if eligibility:
            details["eligibility"] = [eligibility]

        documents = extract_labeled_text(
            soup,
            [
                "documents required",
                "documents",
                "required documents"
            ]
        )

        if documents:
            details["documents"] = [documents]

        deadline = extract_labeled_text(
            soup,
            [
                "deadline",
                "last date",
                "application deadline"
            ]
        )

        if deadline:
            details["deadline"] = deadline

        return details

    except Exception as error:

        print(
            "Scheme detail fetch skipped:",
            error
        )

        return details


def create_scheme_record(
    scheme_id,
    name,
    scheme_url,
    row_texts=None
):

    if row_texts is None:
        row_texts = []

    row_texts = [
        clean_scheme_text(item)
        for item in row_texts
        if clean_scheme_text(item)
    ]

    # Use any useful table text as a fallback description.
    fallback_description = (
        row_texts[2]
        if len(row_texts) > 2
        else
        "Scheme listed on the official myScheme platform."
    )

    details = extract_scheme_details(
        scheme_url,
        fallback_description
    )

    return {

        "id": scheme_id,

        "name": name,

        "category": "Government Scheme",

        "type": "Government",

        "description": details["description"],

        "benefit": details["benefit"],

        "eligibility": details["eligibility"],

        "documents": details["documents"],

        "application_status":
            "Check official scheme page",

        "deadline": details["deadline"],

        "apply_url": scheme_url,

        "details_url": scheme_url,

        "official_url": MYSCHEME_HOME,

        "source":
            "Government of India - myScheme",

        "live": True,

        "last_checked": now_iso()
    }


def fetch_live_government_schemes():

    try:

        headers = {

            "User-Agent":
                "Mozilla/5.0 "
                "(Windows NT 10.0; Win64; x64) "
                "AppleWebKit/537.36 "
                "(KHTML, like Gecko) "
                "Chrome/151.0.0.0 "
                "Safari/537.36",

            "Accept":
                "text/html,application/xhtml+xml,"
                "application/xml;q=0.9,*/*;q=0.8",

            "Accept-Language":
                "en-US,en;q=0.9"
        }

        print(
            "Fetching LIVE government schemes..."
        )

        response = requests.get(
            MYSCHEME_RULES,
            headers=headers,
            timeout=30
        )

        response.raise_for_status()

        soup = BeautifulSoup(
            response.text,
            "html.parser"
        )

        schemes = []
        seen_names = set()

        # ----------------------------------------------------
        # Method 1: Read table rows
        # ----------------------------------------------------

        for row in soup.find_all("tr"):

            cells = row.find_all(
                ["td", "th"]
            )

            if not cells:
                continue

            texts = []

            for cell in cells:

                text = clean_scheme_text(
                    cell.get_text(
                        " ",
                        strip=True
                    )
                )

                if text:
                    texts.append(text)

            if not texts:
                continue

            if (
                len(texts) >= 2
                and texts[0].lower() in
                ["no.", "no", "s.no", "s.no."]
            ):
                continue

            name = None

            if len(texts) >= 2:

                first = texts[0]
                second = texts[1]

                if (
                    first.isdigit()
                    and len(second) >= 3
                ):
                    name = second

                elif len(second) >= 3:
                    name = second

            if not name:
                continue

            name = clean_scheme_text(name)
            name_lower = name.lower()

            excluded = {
                "scheme name",
                "link",
                "detail",
                "details",
                "home",
                "search"
            }

            if name_lower in excluded:
                continue

            if name_lower in seen_names:
                continue

            scheme_url = None

            for anchor in row.find_all(
                "a",
                href=True
            ):

                href = anchor.get("href")

                if not href:
                    continue

                href = href.strip()

                if href.startswith("/"):

                    scheme_url = (
                        "https://rules.myscheme.gov.in"
                        + href
                    )

                elif href.startswith("http://"):

                    scheme_url = href

                elif href.startswith("https://"):

                    scheme_url = href

                if scheme_url:
                    break

            if not scheme_url:
                scheme_url = MYSCHEME_HOME

            seen_names.add(name_lower)

            scheme = create_scheme_record(
                "live-" + str(len(schemes) + 1),
                name,
                scheme_url,
                texts
            )

            schemes.append(scheme)

        # ----------------------------------------------------
        # Method 2: Inspect links if table parsing failed
        # ----------------------------------------------------

        if not schemes:

            for link in soup.find_all(
                "a",
                href=True
            ):

                text = clean_scheme_text(
                    link.get_text(
                        " ",
                        strip=True
                    )
                )

                href = link.get("href")

                if not text or not href:
                    continue

                if len(text) < 4:
                    continue

                lower_text = text.lower()

                excluded_words = [
                    "home",
                    "login",
                    "register",
                    "contact",
                    "about",
                    "privacy",
                    "terms",
                    "search",
                    "menu",
                    "facebook",
                    "twitter",
                    "instagram",
                    "youtube"
                ]

                if lower_text in excluded_words:
                    continue

                if (
                    "scheme" not in lower_text
                    and "yojana" not in lower_text
                    and "kisan" not in lower_text
                    and "krishi" not in lower_text
                    and "farmer" not in lower_text
                ):
                    continue

                if lower_text in seen_names:
                    continue

                if href.startswith("/"):

                    full_url = (
                        "https://rules.myscheme.gov.in"
                        + href
                    )

                elif href.startswith("http://"):
                    full_url = href

                elif href.startswith("https://"):
                    full_url = href

                else:
                    continue

                seen_names.add(lower_text)

                scheme = create_scheme_record(
                    "live-" + str(len(schemes) + 1),
                    text,
                    full_url,
                    [text]
                )

                schemes.append(scheme)

        if schemes:

            checked_time = now_iso()

            data = {

                "success": True,

                "live": True,

                "automatic": True,

                "fallback": False,

                "last_checked": checked_time,

                "last_updated": checked_time,

                "count": len(schemes),

                "schemes": schemes,

                "source":
                    "Government of India - myScheme",

                "source_url": MYSCHEME_RULES
            }

            with open(
                LIVE_SCHEMES_CACHE,
                "w",
                encoding="utf-8"
            ) as file:

                json.dump(
                    data,
                    file,
                    ensure_ascii=False,
                    indent=2
                )

            print(
                "LIVE schemes found:",
                len(schemes)
            )

            return data

        print(
            "Government website returned "
            "no scheme records."
        )

        return None

    except requests.exceptions.RequestException as error:

        print(
            "Government website connection error:",
            error
        )

        return None

    except Exception as error:

        print(
            "Live government scheme error:",
            error
        )

        return None


# ============================================================
# LOAD LIVE SCHEME CACHE
# ============================================================

def load_live_scheme_cache():

    if not os.path.exists(
        LIVE_SCHEMES_CACHE
    ):
        return None

    try:

        with open(
            LIVE_SCHEMES_CACHE,
            "r",
            encoding="utf-8"
        ) as file:

            return json.load(file)

    except Exception as error:

        print(
            "Live scheme cache error:",
            error
        )

        return None


# ============================================================
# GOVERNMENT SCHEMES API
# ============================================================

@app.route(
    "/government-schemes",
    methods=["GET"]
)
def government_schemes():

    try:

        live_data = (
            fetch_live_government_schemes()
        )

        if live_data:

            return jsonify({

                "success": True,

                "live": True,

                "automatic": True,

                "fallback": False,

                "count": live_data["count"],

                "last_checked":
                    live_data["last_checked"],

                "last_updated":
                    live_data["last_updated"],

                "source": live_data["source"],

                "source_url":
                    live_data["source_url"],

                "schemes": live_data["schemes"],

                "message":
                    "Live schemes fetched automatically "
                    "from the official myScheme platform."
            })

        cache = load_live_scheme_cache()

        if cache and cache.get("schemes"):

            return jsonify({

                "success": True,

                "live": False,

                "automatic": True,

                "fallback": True,

                "count": len(cache["schemes"]),

                "last_checked":
                    cache.get("last_checked"),

                "last_updated":
                    cache.get("last_updated"),

                "source": cache.get(
                    "source",
                    "Government of India - myScheme"
                ),

                "source_url": cache.get(
                    "source_url",
                    MYSCHEME_RULES
                ),

                "schemes": cache["schemes"],

                "message":
                    "Live government source is temporarily "
                    "unavailable. Showing the last successfully "
                    "fetched government scheme list."
            })

        return jsonify({

            "success": False,

            "live": False,

            "automatic": True,

            "fallback": True,

            "count": 0,

            "schemes": [],

            "message":
                "Unable to connect to the official myScheme "
                "government source. Please try again."
        }), 503

    except Exception as error:

        print(
            "Government schemes API error:",
            error
        )

        return jsonify({

            "success": False,

            "live": False,

            "automatic": True,

            "schemes": [],

            "count": 0,

            "message":
                "Unable to load government schemes."
        }), 500


# ============================================================
# SCHEMES ALIAS
# ============================================================

@app.route(
    "/schemes",
    methods=["GET"]
)
def schemes_alias():

    return government_schemes()


# ============================================================
# FORCE REFRESH GOVERNMENT SCHEMES
# ============================================================

@app.route(
    "/government-schemes/refresh",
    methods=["GET", "POST"]
)
def refresh_government_schemes():

    try:

        data = (
            fetch_live_government_schemes()
        )

        if data:

            return jsonify({

                "success": True,

                "live": True,

                "automatic": True,

                "fallback": False,

                "message":
                    "Government schemes refreshed "
                    "from the official myScheme platform.",

                "count": data["count"],

                "last_checked": data["last_checked"],

                "last_updated": data["last_updated"],

                "source": data["source"],

                "source_url": data["source_url"],

                "schemes": data["schemes"]
            })

        return jsonify({

            "success": False,

            "live": False,

            "automatic": True,

            "message":
                "Unable to fetch the current government "
                "scheme list.",

            "schemes": [],

            "count": 0
        }), 503

    except Exception as error:

        print(
            "Scheme refresh error:",
            error
        )

        return jsonify({

            "success": False,

            "live": False,

            "schemes": [],

            "count": 0,

            "message":
                "Unable to refresh schemes."
        }), 500


# ============================================================
# GOVERNMENT SCHEME STATUS
# ============================================================

@app.route(
    "/government-schemes/status",
    methods=["GET"]
)
def government_schemes_status():

    cache = load_live_scheme_cache()

    if cache:

        return jsonify({

            "success": True,

            "live_cache": True,

            "automatic": True,

            "count": len(
                cache.get(
                    "schemes",
                    []
                )
            ),

            "last_checked": cache.get(
                "last_checked"
            ),

            "last_updated": cache.get(
                "last_updated"
            ),

            "source": cache.get(
                "source"
            ),

            "source_url": cache.get(
                "source_url"
            )
        })

    return jsonify({

        "success": True,

        "live_cache": False,

        "automatic": True,

        "count": 0,

        "last_checked": None,

        "source": "Official myScheme",

        "source_url": MYSCHEME_RULES
    })


# ============================================================
# DAILY FARMING TIPS
# ============================================================

DAILY_TIPS = [

    {
        "title": "🌱 Soil Testing",

        "tip":
            "Test your soil regularly and use fertilizers according to the soil test results.",

        "tip_kn":
            "ಮಣ್ಣಿನ ಪರೀಕ್ಷೆಯನ್ನು ನಿಯಮಿತವಾಗಿ ಮಾಡಿ ಮತ್ತು ಮಣ್ಣಿನ ಪರೀಕ್ಷೆಯ ಫಲಿತಾಂಶದ ಆಧಾರದ ಮೇಲೆ ಗೊಬ್ಬರ ಬಳಸಿ.",

        "tip_hi":
            "नियमित रूप से मिट्टी की जांच करें और मिट्टी की जांच के अनुसार खाद का उपयोग करें."
    },

    {
        "title": "💧 Water Management",

        "tip":
            "Water crops during the morning or evening to reduce water loss through evaporation.",

        "tip_kn":
            "ಆವಿಯಾಗುವಿಕೆಯಿಂದ ನೀರಿನ ನಷ್ಟವನ್ನು ಕಡಿಮೆ ಮಾಡಲು ಬೆಳಿಗ್ಗೆ ಅಥವಾ ಸಂಜೆ ಬೆಳೆಗಳಿಗೆ ನೀರು ಹಾಕಿ.",

        "tip_hi":
            "पानी की कमी को कम करने के लिए सुबह या शाम फसलों की सिंचाई करें."
    },

    {
        "title": "🌾 Crop Rotation",

        "tip":
            "Rotate different crops between seasons to maintain soil fertility and reduce pest problems.",

        "tip_kn":
            "ಮಣ್ಣಿನ ಫಲವತ್ತತೆಯನ್ನು ಕಾಪಾಡಲು ಮತ್ತು ಕೀಟ ಸಮಸ್ಯೆಗಳನ್ನು ಕಡಿಮೆ ಮಾಡಲು ಬೆಳೆ ಪರಿವರ್ತನೆ ಮಾಡಿ.",

        "tip_hi":
            "मिट्टी की उर्वरता बनाए रखने और कीटों की समस्या कम करने के लिए फसल चक्र अपनाएं."
    },

    {
        "title": "🐛 Pest Monitoring",

        "tip":
            "Inspect leaves and stems regularly for insects, holes, discoloration, or other signs of pest attack.",

        "tip_kn":
            "ಕೀಟಗಳ ದಾಳಿಯ ಲಕ್ಷಣಗಳಿಗಾಗಿ ಎಲೆಗಳು ಮತ್ತು ಕಾಂಡಗಳನ್ನು ನಿಯಮಿತವಾಗಿ ಪರಿಶೀಲಿಸಿ.",

        "tip_hi":
            "कीटों के हमले के संकेतों के लिए पत्तियों और तनों की नियमित जांच करें."
    },

    {
        "title": "🌿 Organic Matter",

        "tip":
            "Adding well-decomposed compost can improve soil structure and support healthy plant growth.",

        "tip_kn":
            "ಚೆನ್ನಾಗಿ ಕೊಳೆಯಿಸಿದ ಕಾಂಪೋಸ್ಟ್ ಮಣ್ಣಿನ ರಚನೆಯನ್ನು ಸುಧಾರಿಸಿ ಸಸ್ಯಗಳ ಬೆಳವಣಿಗೆಗೆ ಸಹಾಯ ಮಾಡುತ್ತದೆ.",

        "tip_hi":
            "अच्छी तरह से तैयार खाद मिट्टी की संरचना और पौधों की वृद्धि में मदद करती है."
    },

    {
        "title": "☀️ Weather Planning",

        "tip":
            "Check the weather before irrigation, spraying, or applying fertilizers.",

        "tip_kn":
            "ನೀರಾವರಿ, ಔಷಧಿ ಸಿಂಪಡಣೆ ಅಥವಾ ಗೊಬ್ಬರ ಹಾಕುವ ಮೊದಲು ಹವಾಮಾನವನ್ನು ಪರಿಶೀಲಿಸಿ.",

        "tip_hi":
            "सिंचाई, दवा छिड़काव या खाद डालने से पहले मौसम की जानकारी देखें."
    },

    {
        "title": "🌱 Quality Seeds",

        "tip":
            "Use good-quality seeds suitable for your soil, climate, and recommended growing season.",

        "tip_kn":
            "ನಿಮ್ಮ ಮಣ್ಣು, ಹವಾಮಾನ ಮತ್ತು ಬೆಳೆಯುವ ಕಾಲಕ್ಕೆ ಸೂಕ್ತವಾದ ಉತ್ತಮ ಗುಣಮಟ್ಟದ ಬೀಜಗಳನ್ನು ಬಳಸಿ.",

        "tip_hi":
            "अपनी मिट्टी, जलवायु और मौसम के अनुसार अच्छी गुणवत्ता वाले बीजों का उपयोग करें."
    },

    {
        "title": "💦 Drip Irrigation",

        "tip":
            "Drip irrigation can deliver water close to plant roots and help reduce water wastage.",

        "tip_kn":
            "ಡ್ರಿಪ್ ನೀರಾವರಿಯು ಬೇರುಗಳಿಗೆ ನೇರವಾಗಿ ನೀರು ತಲುಪಿಸಲು ಮತ್ತು ನೀರಿನ ವ್ಯರ್ಥವನ್ನು ಕಡಿಮೆ ಮಾಡಲು ಸಹಾಯ ಮಾಡುತ್ತದೆ.",

        "tip_hi":
            "ड्रिप सिंचाई जड़ों तक पानी पहुंचाने और पानी की बर्बादी कम करने में मदद कर सकती है."
    },

    {
        "title": "🍃 Weed Management",

        "tip":
            "Remove weeds at an early stage because they compete with crops for nutrients, water, and sunlight.",

        "tip_kn":
            "ಕಳೆಗಳು ಪೋಷಕಾಂಶ, ನೀರು ಮತ್ತು ಸೂರ್ಯನ ಬೆಳಕಿಗಾಗಿ ಬೆಳೆಗಳೊಂದಿಗೆ ಸ್ಪರ್ಧಿಸುವುದರಿಂದ ಅವುಗಳನ್ನು ಆರಂಭದಲ್ಲೇ ತೆಗೆದುಹಾಕಿ.",

        "tip_hi":
            "खरपतवार पोषक तत्वों, पानी और धूप के लिए फसलों से प्रतिस्पर्धा करते हैं, इसलिए उन्हें जल्दी हटाएं."
    },

    {
        "title": "🌾 Harvesting",

        "tip":
            "Harvest crops at the recommended maturity stage to maintain quality and reduce post-harvest losses.",

        "tip_kn":
            "ಗುಣಮಟ್ಟವನ್ನು ಕಾಪಾಡಲು ಮತ್ತು ಕೊಯ್ಲಿನ ನಂತರದ ನಷ್ಟವನ್ನು ಕಡಿಮೆ ಮಾಡಲು ಸರಿಯಾದ ಪಕ್ವತೆಯ ಹಂತದಲ್ಲಿ ಬೆಳೆ ಕೊಯ್ಲು ಮಾಡಿ.",

        "tip_hi":
            "गुणवत्ता बनाए रखने और कटाई के बाद होने वाले नुकसान को कम करने के लिए सही समय पर फसल काटें."
    },

    {
        "title": "🏪 Market Price",

        "tip":
            "Compare prices at nearby agricultural markets before deciding where to sell your produce.",

        "tip_kn":
            "ಬೆಳೆ ಮಾರಾಟ ಮಾಡುವ ಮೊದಲು ಹತ್ತಿರದ ಕೃಷಿ ಮಾರುಕಟ್ಟೆಗಳ ಬೆಲೆಗಳನ್ನು ಹೋಲಿಸಿ.",

        "tip_hi":
            "फसल बेचने से पहले आसपास की कृषि मंडियों की कीमतों की तुलना करें."
    },

    {
        "title": "🧑‍🌾 Farm Records",

        "tip":
            "Record your farming expenses, production, and sales to understand your actual profit.",

        "tip_kn":
            "ನಿಮ್ಮ ಕೃಷಿ ಖರ್ಚು, ಉತ್ಪಾದನೆ ಮತ್ತು ಮಾರಾಟದ ವಿವರಗಳನ್ನು ದಾಖಲಿಸಿ ನಿಜವಾದ ಲಾಭವನ್ನು ತಿಳಿದುಕೊಳ್ಳಿ.",

        "tip_hi":
            "अपनी खेती के खर्च, उत्पादन और बिक्री का रिकॉर्ड रखें ताकि वास्तविक लाभ पता चल सके."
    },

    {
        "title": "🌧️ Rainwater",

        "tip":
            "Where possible, collect and store rainwater for use during periods of low rainfall.",

        "tip_kn":
            "ಸಾಧ್ಯವಾದಲ್ಲಿ ಕಡಿಮೆ ಮಳೆಯ ಸಮಯದಲ್ಲಿ ಬಳಸಲು ಮಳೆನೀರನ್ನು ಸಂಗ್ರಹಿಸಿ.",

        "tip_hi":
            "जहां संभव हो, कम बारिश के समय उपयोग के लिए वर्षा जल को संग्रहित करें."
    },

    {
        "title": "🌿 Mulching",

        "tip":
            "Mulching around suitable crops can help conserve soil moisture and suppress weeds.",

        "tip_kn":
            "ಸೂಕ್ತ ಬೆಳೆಗಳ ಸುತ್ತ ಮಲ್ಚಿಂಗ್ ಮಾಡುವುದರಿಂದ ಮಣ್ಣಿನ ತೇವಾಂಶ ಉಳಿಸಲು ಮತ್ತು ಕಳೆ ನಿಯಂತ್ರಿಸಲು ಸಹಾಯವಾಗುತ್ತದೆ.",

        "tip_hi":
            "उपयुक्त फसलों के आसपास मल्चिंग करने से मिट्टी की नमी बनाए रखने और खरपतवार कम करने में मदद मिलती है."
    },

    {
        "title": "🥬 Crop Inspection",

        "tip":
            "Walk through your field regularly and identify disease or pest symptoms as early as possible.",

        "tip_kn":
            "ನಿಮ್ಮ ಹೊಲವನ್ನು ನಿಯಮಿತವಾಗಿ ಪರಿಶೀಲಿಸಿ ಮತ್ತು ರೋಗ ಅಥವಾ ಕೀಟದ ಲಕ್ಷಣಗಳನ್ನು ಆರಂಭದಲ್ಲೇ ಗುರುತಿಸಿ.",

        "tip_hi":
            "अपने खेत का नियमित निरीक्षण करें और रोग या कीट के लक्षणों को जल्दी पहचानें."
    },

    {
        "title": "🌱 Plant Spacing",

        "tip":
            "Maintain the recommended spacing between plants to improve sunlight, air circulation, and growth.",

        "tip_kn":
            "ಸೂರ್ಯನ ಬೆಳಕು, ಗಾಳಿಯ ಸಂಚಾರ ಮತ್ತು ಬೆಳವಣಿಗೆಯನ್ನು ಸುಧಾರಿಸಲು ಶಿಫಾರಸು ಮಾಡಿದ ಸಸ್ಯ ಅಂತರವನ್ನು ಕಾಪಾಡಿ.",

        "tip_hi":
            "धूप, हवा के संचार और पौधों की वृद्धि के लिए उचित पौध दूरी बनाए रखें."
    },

    {
        "title": "🧪 Fertilizer Use",

        "tip":
            "Avoid excessive fertilizer application. Follow recommended quantities for the crop and soil.",

        "tip_kn":
            "ಅತಿಯಾದ ಗೊಬ್ಬರ ಬಳಕೆಯನ್ನು ತಪ್ಪಿಸಿ. ಬೆಳೆ ಮತ್ತು ಮಣ್ಣಿಗೆ ಶಿಫಾರಸು ಮಾಡಿದ ಪ್ರಮಾಣವನ್ನು ಅನುಸರಿಸಿ.",

        "tip_hi":
            "अधिक मात्रा में खाद का उपयोग न करें। फसल और मिट्टी के अनुसार अनुशंसित मात्रा का उपयोग करें."
    },

    {
        "title": "🐝 Pollination",

        "tip":
            "Protect beneficial insects such as bees because they can support pollination in many crops.",

        "tip_kn":
            "ಜೇನುನೊಣಗಳಂತಹ ಉಪಯುಕ್ತ ಕೀಟಗಳನ್ನು ರಕ್ಷಿಸಿ. ಅವು ಅನೇಕ ಬೆಳೆಗಳಲ್ಲಿ ಪರಾಗಸ್ಪರ್ಶಕ್ಕೆ ಸಹಾಯ ಮಾಡುತ್ತವೆ.",

        "tip_hi":
            "मधुमक्खियों जैसे लाभकारी कीटों की रक्षा करें क्योंकि वे कई फसलों में परागण में मदद करते हैं."
    },

    {
        "title": "🌡️ Temperature",

        "tip":
            "Monitor temperature conditions because extreme heat or cold can affect crop growth.",

        "tip_kn":
            "ಅತಿಯಾದ ಬಿಸಿ ಅಥವಾ ಚಳಿ ಬೆಳೆ ಬೆಳವಣಿಗೆಯ ಮೇಲೆ ಪರಿಣಾಮ ಬೀರುವುದರಿಂದ ತಾಪಮಾನವನ್ನು ಗಮನಿಸಿ.",

        "tip_hi":
            "अधिक गर्मी या ठंड फसल की वृद्धि को प्रभावित कर सकती है, इसलिए तापमान पर नजर रखें."
    },

    {
        "title": "📦 Storage",

        "tip":
            "Store harvested produce in clean, dry, and suitable conditions to reduce post-harvest losses.",

        "tip_kn":
            "ಕೊಯ್ಲು ಮಾಡಿದ ಉತ್ಪನ್ನಗಳನ್ನು ಸ್ವಚ್ಛ, ಒಣ ಮತ್ತು ಸೂಕ್ತ ಸ್ಥಳದಲ್ಲಿ ಸಂಗ್ರಹಿಸಿ.",

        "tip_hi":
            "कटाई के बाद उत्पाद को साफ, सूखी और उचित जगह पर रखें."
    }
]


# ============================================================
# DAILY TIP API
# ============================================================

@app.route(
    "/daily-tip",
    methods=["GET"]
)
def daily_tip():

    try:

        today = datetime.now()

        day_number = today.timetuple().tm_yday

        index = (
            day_number - 1
        ) % len(DAILY_TIPS)

        tip = DAILY_TIPS[index]

        return jsonify({

            "success": True,

            "date":
                today.strftime("%d/%m/%Y"),

            "tip_number":
                index + 1,

            "total_tips":
                len(DAILY_TIPS),

            "title":
                tip["title"],

            "tip":
                tip["tip"],

            "tip_kn":
                tip["tip_kn"],

            "tip_hi":
                tip["tip_hi"],

            "source":
                "Smart Farmer Assistant",

            "message":
                "Daily farming tip updated."

        })

    except Exception as error:

        print(
            "Daily tip error:",
            error
        )

        return jsonify({

            "success": False,

            "message":
                "Unable to load daily tip."

        }), 500


# ============================================================
# FARMER DATABASE
# ============================================================

def create_farmer_database():

    connection = None

    try:

        connection = sqlite3.connect(
            FARMERS_DB
        )

        cursor = connection.cursor()

        cursor.execute("""
            CREATE TABLE IF NOT EXISTS farmers (

                id INTEGER PRIMARY KEY AUTOINCREMENT,

                crop TEXT,

                quantity REAL,

                expense REAL,

                profit REAL,

                created_at TEXT

            )
        """)

        connection.commit()

    except Exception as error:

        print(
            "Farmer database error:",
            error
        )

    finally:

        if connection:
            connection.close()


create_farmer_database()


# ============================================================
# SAVE FARMER PROFIT
# ============================================================

@app.route(
    "/save",
    methods=["POST"]
)
def save_farmer():

    connection = None

    try:

        data = request.get_json(
            silent=True
        ) or {}

        crop = str(
            data.get(
                "crop",
                ""
            )
        ).strip()

        quantity = float(
            data.get(
                "quantity",
                0
            )
        )

        expense = float(
            data.get(
                "expense",
                0
            )
        )

        profit = float(
            data.get(
                "profit",
                0
            )
        )

        connection = sqlite3.connect(
            FARMERS_DB
        )

        cursor = connection.cursor()

        cursor.execute(
            """
            INSERT INTO farmers
            (
                crop,
                quantity,
                expense,
                profit,
                created_at
            )
            VALUES (?, ?, ?, ?, ?)
            """,
            (
                crop,
                quantity,
                expense,
                profit,
                now_iso()
            )
        )

        connection.commit()

        return jsonify({

            "success": True,

            "message":
                "Farmer data saved successfully."

        })

    except (ValueError, TypeError):

        return jsonify({

            "success": False,

            "message":
                "Invalid farmer data."

        }), 400

    except Exception as error:

        print(
            "Save farmer error:",
            error
        )

        return jsonify({

            "success": False,

            "message":
                "Unable to save farmer data."

        }), 500

    finally:

        if connection:
            connection.close()


# ============================================================
# FARMER HISTORY
# ============================================================

@app.route(
    "/farmers",
    methods=["GET"]
)
def get_farmers():

    connection = None

    try:

        connection = sqlite3.connect(
            FARMERS_DB
        )

        connection.row_factory = sqlite3.Row

        cursor = connection.cursor()

        cursor.execute("""
            SELECT
                id,
                crop,
                quantity,
                expense,
                profit,
                created_at
            FROM farmers
            ORDER BY id DESC
        """)

        rows = cursor.fetchall()

        farmers = [
            dict(row)
            for row in rows
        ]

        return jsonify({

            "success": True,

            "count":
                len(farmers),

            "farmers":
                farmers

        })

    except Exception as error:

        print(
            "Farmer history error:",
            error
        )

        return jsonify({

            "success": False,

            "count": 0,

            "farmers": [],

            "message":
                "Unable to load farmer history."

        }), 500

    finally:

        if connection:
            connection.close()


# ============================================================
# HEALTH CHECK
# ============================================================

@app.route(
    "/health",
    methods=["GET"]
)
def health():

    cache = load_live_scheme_cache()

    live_scheme_count = 0

    if cache:

        live_scheme_count = len(
            cache.get(
                "schemes",
                []
            )
        )

    return jsonify({

        "success": True,

        "status": "OK",

        "market":
            "fallback",

        "crops":
            len(CROPS),

        "market_records":
            500,

        "government_schemes":
            live_scheme_count,

        "government_scheme_source":
            "Official myScheme",

        "government_scheme_live":
            bool(cache),

        "profit_predictor":
            "available",

        "profit_crops":
            len(PROFIT_CROPS),

        "daily_tips":
            len(DAILY_TIPS),

        "time":
            now_iso()

    })


# ============================================================
# START SERVER
# ============================================================

if __name__ == "__main__":

    print()

    print("=" * 65)

    print(
        "       SMART FARMER ASSISTANT BACKEND"
    )

    print("=" * 65)

    print()

    print("Home:")
    print(
        "http://127.0.0.1:5000/"
    )

    print()

    print("Crops:")
    print(
        "http://127.0.0.1:5000/crops"
    )

    print()

    print("Market Prices:")
    print(
        "http://127.0.0.1:5000/market-prices"
    )

    print()

    print("Profit Crops:")
    print(
        "http://127.0.0.1:5000/profit-crops"
    )

    print()

    print("Profit Calculate:")
    print(
        "http://127.0.0.1:5000/profit-calculate"
    )

    print()

    print("LIVE Government Schemes:")
    print(
        "http://127.0.0.1:5000/government-schemes"
    )

    print()

    print("Refresh Government Schemes:")
    print(
        "http://127.0.0.1:5000/government-schemes/refresh"
    )

    print()

    print("Government Scheme Status:")
    print(
        "http://127.0.0.1:5000/government-schemes/status"
    )

    print()

    print("Daily Tip:")
    print(
        "http://127.0.0.1:5000/daily-tip"
    )

    print()

    print("Farmer History:")
    print(
        "http://127.0.0.1:5000/farmers"
    )

    print()

    print("Health:")
    print(
        "http://127.0.0.1:5000/health"
    )

    print()

    print(
        "Total Crops:",
        len(CROPS)
    )

    print(
        "Market Records:",
        1000
    )

    print(
        "Government Schemes:"
        " LIVE from myScheme"
    )

    print(
        "Daily Tips:",
        len(DAILY_TIPS)
    )

    print()

    print("=" * 65)

    print()

    app.run(
        host="127.0.0.1",
        port=5000,
        debug=False
    )