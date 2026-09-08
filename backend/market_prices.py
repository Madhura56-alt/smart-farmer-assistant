import requests
from datetime import datetime

BASE_URL = "https://api.ceda.ashoka.edu.in"

HEADERS = {
    "Accept": "application/json",
    "Content-Type": "application/json"
}


def get_commodities():
    """
    Get commodities available in Agmarknet.
    """

    url = f"{BASE_URL}/agmarknet/commodities"

    response = requests.get(
        url,
        headers=HEADERS,
        timeout=15
    )

    response.raise_for_status()

    return response.json()


def get_geographies():
    """
    Get states and districts available in Agmarknet.
    """

    url = f"{BASE_URL}/agmarknet/geographies"

    response = requests.get(
        url,
        headers=HEADERS,
        timeout=15
    )

    response.raise_for_status()

    return response.json()


def get_markets(commodity, state, district):
    """
    Get markets for a commodity/state/district.
    """

    url = f"{BASE_URL}/agmarknet/markets"

    payload = {
        "commodity": commodity,
        "state": state,
        "district": district
    }

    response = requests.post(
        url,
        json=payload,
        headers=HEADERS,
        timeout=15
    )

    response.raise_for_status()

    return response.json()


def get_prices(
    commodity=None,
    state=None,
    district=None,
    market=None
):
    """
    Get Agmarknet prices.
    """

    url = f"{BASE_URL}/agmarknet/prices"

    payload = {}

    if commodity:
        payload["commodity"] = commodity

    if state:
        payload["state"] = state

    if district:
        payload["district"] = district

    if market:
        payload["market"] = market

    response = requests.post(
        url,
        json=payload,
        headers=HEADERS,
        timeout=20
    )

    response.raise_for_status()

    return response.json()