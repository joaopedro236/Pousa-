import requests
import pprint
import os
from dotenv import load_dotenv

load_dotenv()
IS_VALID_TIN = os.getenv("IS_VALID_TIN")


def cpf():
    try:
        cpf = input("Cpf: \n")
        country = input("Country: \n").strip().upper()
        result = requests.get(
            "https://api.isvalid.dev/v0/vat",
            headers={"Authorization": f"Bearer {IS_VALID_TIN}"},
            params={"value": cpf, "countryCode": country},
        ).json()
        pprint.pprint(result)
        if not result.get("valid", False):
            print("Error")
    except Exception as e:
        print(str(e))


cpf()
