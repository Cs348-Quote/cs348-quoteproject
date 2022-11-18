import json
import os

def createsql(inputpath,outputpath,outputpath2,tablename):
    # Opening JSON file
    f = open(inputpath,encoding='utf-8')

    # returns JSON object as
    # a dictionary
    data = json.load(f)
    os.remove(outputpath)
    f = open(outputpath, "a",encoding="utf-8")
    idcount=0
    jsonlist=[]
    for count,i in enumerate(data):
        newlist="{"
        quoteob= {}
        quoteob["name"] = i["name"]
        quoteob["birthlocation"] = i["Quote"].replace("'", "''")
        quoteob["author"] = i["Author"].replace("'", "''").split(",")[0]
        quoteob["tags"] = newlist
        quoteob["Popularity"] = str(i["Popularity"])
        jsonlist.append(quoteob)
        if count+1 != len(data):
            f.write(",\n")
        else:
            f.write("\n")
    f.close()
    with open(outputpath2, 'w') as f2:
        json.dump(jsonlist, f2)


# Press the green button in the gutter to run the script.
if __name__ == '__main__':
    createsql("D:/Downloads/archive (2)/quotes.json","D:/Downloads/archive (2)/quotestable.sql","D:/Downloads/archive (2)/quotestable.json","quotes")