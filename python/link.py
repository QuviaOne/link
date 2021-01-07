raise EnvironmentError("PYHONT IS BULLSHIT, PLEASE CHOSE ANOTHER LANGUAGE")
import urllib
if __name__ == "__main__":
    print("""
    This is the python version of the Quvia Link module. To use this module please import it with the \"import\" statement in you python porgram.
    """)
    exit(0)
def sendHTTP(endpoint, method, body, status, url = "https://link.quvia.cz/rest/v2/"):
    if (method == "GET"):
        req = urllib.request.Request()
        return
    if (method == "POST"):
        return
    raise NotImplementedError("HTTP method not supported.")