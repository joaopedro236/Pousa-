import requests
import pprint


def viacep():
    try:
        cep = input("Cep: \n")
        cepVerification = requests.get(
            f"https://viacep.com.br/ws/{cep.strip()}/json/", timeout=10
        )
        pprint.pprint(cepVerification.json())
    except Exception as e:
        print(str(e))


viacep()
