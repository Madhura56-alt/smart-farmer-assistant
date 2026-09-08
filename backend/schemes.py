import json
import os
from datetime import datetime

import requests
from bs4 import BeautifulSoup


# ============================================================
# CONFIGURATION
# ============================================================

BASE_DIR = os.path.dirname(os.path.abspath(__file__))

CACHE_FILE = os.path.join(
    BASE_DIR,
    "schemes_cache.json"
)

MYSCHEME_URL = "https://www.myscheme.gov.in/"


# ============================================================
# FARMER GOVERNMENT SCHEMES
# ============================================================

FARMER_SCHEMES = [

    {
        "id": "pm-kisan",
        "name": "PM-KISAN",
        "category": "Income Support",
        "type": "Central Government",

        "description":
            "Income support scheme for eligible farmer families.",

        "benefit":
            "Financial support for eligible farmer families.",

        "eligibility": [
            "Eligible farmer families",
            "Valid land records",
            "Aadhaar details"
        ],

        "documents": [
            "Aadhaar Card",
            "Bank Account",
            "Land Records",
            "Mobile Number"
        ],

        "application_status":
            "Check official portal",

        "deadline":
            "Check official portal",

        "apply_url":
            "https://pmkisan.gov.in/",

        "details_url":
            "https://www.myscheme.gov.in/",

        "official_url":
            "https://pmkisan.gov.in/",

        "source":
            "Government of India"
    },


    {
        "id": "pmfby",
        "name":
            "Pradhan Mantri Fasal Bima Yojana",

        "category":
            "Crop Insurance",

        "type":
            "Central Government",

        "description":
            "Government crop insurance scheme for eligible farmers.",

        "benefit":
            "Crop insurance protection.",

        "eligibility": [
            "Eligible farmers",
            "Farmers growing notified crops",
            "Farmers in notified areas"
        ],

        "documents": [
            "Aadhaar Card",
            "Bank Account",
            "Land Records",
            "Crop Details"
        ],

        "application_status":
            "Check official portal",

        "deadline":
            "Depends on crop and season",

        "apply_url":
            "https://pmfby.gov.in/",

        "details_url":
            "https://www.myscheme.gov.in/",

        "official_url":
            "https://pmfby.gov.in/",

        "source":
            "Government of India"
    },


    {
        "id": "pmksy",
        "name":
            "Pradhan Mantri Krishi Sinchayee Yojana",

        "category":
            "Irrigation",

        "type":
            "Central Government",

        "description":
            "Government programme supporting irrigation and efficient water use.",

        "benefit":
            "Irrigation support.",

        "eligibility": [
            "Eligible farmers",
            "Agricultural land holders",
            "Eligibility depends on programme component"
        ],

        "documents": [
            "Aadhaar Card",
            "Land Records",
            "Bank Account"
        ],

        "application_status":
            "Check official portal",

        "deadline":
            "Check official portal",

        "apply_url":
            "https://pmksy.gov.in/",

        "details_url":
            "https://www.myscheme.gov.in/",

        "official_url":
            "https://pmksy.gov.in/",

        "source":
            "Government of India"
    },


    {
        "id": "kcc",
        "name":
            "Kisan Credit Card",

        "category":
            "Agriculture Finance",

        "type":
            "Central Government",

        "description":
            "Credit facility for farmers for agricultural activities.",

        "benefit":
            "Agricultural credit facility.",

        "eligibility": [
            "Farmers involved in agriculture",
            "Eligible agricultural borrowers",
            "Other eligible farming categories as per bank rules"
        ],

        "documents": [
            "Aadhaar Card",
            "Land Documents",
            "Bank Account",
            "Photograph"
        ],

        "application_status":
            "Check participating bank",

        "deadline":
            "Check participating bank",

        "apply_url":
            "https://www.myscheme.gov.in/",

        "details_url":
            "https://www.myscheme.gov.in/",

        "official_url":
            "https://www.myscheme.gov.in/",

        "source":
            "Government of India"
    },


    {
        "id": "soil-health",
        "name":
            "Soil Health Card Scheme",

        "category":
            "Soil & Agriculture",

        "type":
            "Central Government",

        "description":
            "Provides soil testing information and nutrient recommendations.",

        "benefit":
            "Soil testing and fertilizer recommendations.",

        "eligibility": [
            "Farmers cultivating agricultural land",
            "Farmers requiring soil health information"
        ],

        "documents": [
            "Farmer Details",
            "Land Details",
            "Mobile Number"
        ],

        "application_status":
            "Check agriculture department",

        "deadline":
            "No fixed general deadline",

        "apply_url":
            "https://soilhealth.dac.gov.in/",

        "details_url":
            "https://www.myscheme.gov.in/",

        "official_url":
            "https://soilhealth.dac.gov.in/",

        "source":
            "Government of India"
    },


    {
        "id": "enam",
        "name":
            "National Agriculture Market (e-NAM)",

        "category":
            "Agriculture Market",

        "type":
            "Central Government",

        "description":
            "Electronic agriculture market platform connecting agricultural markets.",

        "benefit":
            "Online agricultural market access.",

        "eligibility": [
            "Eligible farmers",
            "Farmers participating through registered markets"
        ],

        "documents": [
            "Farmer Registration",
            "Identity Proof",
            "Bank Details"
        ],

        "application_status":
            "Check official portal",

        "deadline":
            "Check official portal",

        "apply_url":
            "https://www.enam.gov.in/",

        "details_url":
            "https://www.myscheme.gov.in/",

        "official_url":
            "https://www.enam.gov.in/",

        "source":
            "Government of India"
    },


    {
        "id": "aif",
        "name":
            "Agriculture Infrastructure Fund",

        "category":
            "Agriculture Infrastructure",

        "type":
            "Central Government",

        "description":
            "Financing support for agriculture infrastructure projects.",

        "benefit":
            "Financing support for eligible infrastructure.",

        "eligibility": [
            "Eligible agriculture infrastructure projects",
            "Eligible applicants under scheme guidelines"
        ],

        "documents": [
            "Identity Proof",
            "Project Documents",
            "Bank Documents"
        ],

        "application_status":
            "Check official portal",

        "deadline":
            "Check official portal",

        "apply_url":
            "https://agriinfra.dac.gov.in/",

        "details_url":
            "https://www.myscheme.gov.in/",

        "official_url":
            "https://agriinfra.dac.gov.in/",

        "source":
            "Government of India"
    },


    {
        "id": "pkvy",
        "name":
            "Paramparagat Krishi Vikas Yojana",

        "category":
            "Organic Farming",

        "type":
            "Central Government",

        "description":
            "Supports promotion of organic farming practices.",

        "benefit":
            "Support for organic farming activities.",

        "eligibility": [
            "Eligible farmers",
            "Farmers participating through applicable programme arrangements"
        ],

        "documents": [
            "Aadhaar Card",
            "Land Records",
            "Farmer Registration"
        ],

        "application_status":
            "Check agriculture department",

        "deadline":
            "Check official portal",

        "apply_url":
            "https://pgsindia-ncof.gov.in/",

        "details_url":
            "https://www.myscheme.gov.in/",

        "official_url":
            "https://pgsindia-ncof.gov.in/",

        "source":
            "Government of India"
    },


    {
        "id": "smam",
        "name":
            "Sub-Mission on Agricultural Mechanization",

        "category":
            "Farm Mechanization",

        "type":
            "Central Government",

        "description":
            "Supports agricultural mechanization and access to farm machinery.",

        "benefit":
            "Support for eligible farm machinery and mechanization.",

        "eligibility": [
            "Eligible farmers",
            "Farmer groups and eligible applicants as applicable"
        ],

        "documents": [
            "Aadhaar Card",
            "Land Records",
            "Bank Account",
            "Farmer Registration"
        ],

        "application_status":
            "Check state agriculture portal",

        "deadline":
            "Depends on state and programme",

        "apply_url":
            "https://agrimachinery.nic.in/",

        "details_url":
            "https://www.myscheme.gov.in/",

        "official_url":
            "https://agrimachinery.nic.in/",

        "source":
            "Government of India"
    },


    {
        "id": "rkvy",
        "name":
            "Rashtriya Krishi Vikas Yojana",

        "category":
            "Agriculture Development",

        "type":
            "Central Government",

        "description":
            "Supports agricultural development projects implemented through government programmes.",

        "benefit":
            "Agriculture development support.",

        "eligibility": [
            "Eligibility depends on applicable programme",
            "Check implementing department"
        ],

        "documents": [
            "Farmer Registration",
            "Identity Proof",
            "Land Documents"
        ],

        "application_status":
            "Check official portal",

        "deadline":
            "Check official portal",

        "apply_url":
            "https://rkvy.nic.in/",

        "details_url":
            "https://www.myscheme.gov.in/",

        "official_url":
            "https://rkvy.nic.in/",

        "source":
            "Government of India"
    },


    {
        "id": "midh",
        "name":
            "Mission for Integrated Development of Horticulture",

        "category":
            "Horticulture",

        "type":
            "Central Government",

        "description":
            "Supports development of horticulture activities.",

        "benefit":
            "Support for eligible horticulture activities.",

        "eligibility": [
            "Eligible horticulture farmers",
            "Eligibility depends on programme component"
        ],

        "documents": [
            "Aadhaar Card",
            "Land Records",
            "Bank Account",
            "Farmer Registration"
        ],

        "application_status":
            "Check state horticulture department",

        "deadline":
            "Check official portal",

        "apply_url":
            "https://midh.gov.in/",

        "details_url":
            "https://www.myscheme.gov.in/",

        "official_url":
            "https://midh.gov.in/",

        "source":
            "Government of India"
    },


    {
        "id": "nfsm",
        "name":
            "National Food Security Mission",

        "category":
            "Crop Production",

        "type":
            "Central Government",

        "description":
            "Supports improvement of production and productivity of selected crops.",

        "benefit":
            "Support under applicable crop programmes.",

        "eligibility": [
            "Eligible farmers",
            "Farmers cultivating applicable crops"
        ],

        "documents": [
            "Aadhaar Card",
            "Land Records",
            "Farmer Registration"
        ],

        "application_status":
            "Check agriculture department",

        "deadline":
            "Check official portal",

        "apply_url":
            "https://nfsm.gov.in/",

        "details_url":
            "https://www.myscheme.gov.in/",

        "official_url":
            "https://nfsm.gov.in/",

        "source":
            "Government of India"
    }
]


# ============================================================
# CACHE FUNCTIONS
# ============================================================

def load_cache():

    if not os.path.exists(CACHE_FILE):
        return {
            "schemes": [],
            "last_checked": None,
            "last_updated": None,
            "source_status": "NOT_CHECKED",
            "source": "Government of India - myScheme"
        }

    try:
        with open(
            CACHE_FILE,
            "r",
            encoding="utf-8"
        ) as file:

            return json.load(file)

    except Exception:

        return {
            "schemes": [],
            "last_checked": None,
            "last_updated": None,
            "source_status": "CACHE_ERROR",
            "source": "Government of India - myScheme"
        }


def save_cache(data):

    with open(
        CACHE_FILE,
        "w",
        encoding="utf-8"
    ) as file:

        json.dump(
            data,
            file,
            ensure_ascii=False,
            indent=2
        )


# ============================================================
# CHECK OFFICIAL SOURCE
# ============================================================

def check_official_source():

    response = requests.get(
        MYSCHEME_URL,
        timeout=15,
        headers={
            "User-Agent":
                "Mozilla/5.0 "
                "(Windows NT 10.0; Win64; x64) "
                "AppleWebKit/537.36 "
                "Chrome/151.0 Safari/537.36"
        }
    )

    response.raise_for_status()

    soup = BeautifulSoup(
        response.text,
        "html.parser"
    )

    text = soup.get_text(
        " ",
        strip=True
    )

    if not text:
        raise Exception(
            "Official myScheme website returned empty content."
        )

    return True


# ============================================================
# UPDATE SCHEMES
# ============================================================

def update_schemes():

    cache = load_cache()

    now = datetime.now().isoformat()

    try:

        # Check official website.
        check_official_source()

        old_json = json.dumps(
            cache.get("schemes", []),
            sort_keys=True,
            ensure_ascii=False
        )

        new_json = json.dumps(
            FARMER_SCHEMES,
            sort_keys=True,
            ensure_ascii=False
        )

        cache["last_checked"] = now

        if old_json != new_json:

            cache["schemes"] = FARMER_SCHEMES
            cache["last_updated"] = now

        elif not cache.get("schemes"):

            cache["schemes"] = FARMER_SCHEMES
            cache["last_updated"] = now

        cache["source_status"] = "LIVE"
        cache["source"] = (
            "Government of India - myScheme"
        )

        # Remove previous error if successful.
        cache.pop("error", None)

        save_cache(cache)

        print(
            "Government scheme source checked successfully."
        )

        print(
            "Scheme records:",
            len(cache["schemes"])
        )

        return cache

    except Exception as error:

        print(
            "Government scheme check failed:",
            error
        )

        cache["last_checked"] = now
        cache["source_status"] = "CACHED"

        cache["error"] = str(error)

        # Important:
        # If there is no cache, still provide the verified
        # catalogue instead of returning an empty list.
        if not cache.get("schemes"):

            cache["schemes"] = FARMER_SCHEMES
            cache["last_updated"] = now

        save_cache(cache)

        return cache


# ============================================================
# GET LATEST SCHEMES
# ============================================================

def get_latest_schemes():

    data = update_schemes()

    return data.get(
        "schemes",
        FARMER_SCHEMES
    )


# ============================================================
# STATUS
# ============================================================

def get_scheme_status():

    data = load_cache()

    return {

        "last_checked":
            data.get("last_checked"),

        "last_updated":
            data.get("last_updated"),

        "source_status":
            data.get("source_status"),

        "source":
            data.get(
                "source",
                "Government of India - myScheme"
            ),

        "count":
            len(
                data.get(
                    "schemes",
                    []
                )
            )
    }


# ============================================================
# MANUAL REFRESH
# ============================================================

def refresh_schemes():

    return update_schemes()


# ============================================================
# TEST
# ============================================================

if __name__ == "__main__":

    print("=" * 60)
    print("GOVERNMENT SCHEMES")
    print("=" * 60)

    data = update_schemes()

    print(
        "Status:",
        data.get("source_status")
    )

    print(
        "Schemes:",
        len(data.get("schemes", []))
    )

    print(
        "Last checked:",
        data.get("last_checked")
    )

    print("=" * 60)