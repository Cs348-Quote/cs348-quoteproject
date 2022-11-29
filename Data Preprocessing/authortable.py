# This is a sample Python script.

# Press Shift+F10 to execute it or replace it with your code.
# Press Double Shift to search everywhere for classes, files, tool windows, actions, and settings.

import json
import os

def createsql(inputpath,outputpath):
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
        newlist = "{"
        for x in i["occupation"]:
            newlist+= "\""+ x.replace("'","''") +"\","
        if len(newlist) > 1:
            newlist = newlist[:-1]
        newlist+="}"
        insertcoord = i["coords"]
        if insertcoord != None:
            insertcoord = "'"+insertcoord.replace("Point(","").replace(" ", "' , '")[:-1] + "'"
        else:
            insertcoord = "NULL,NULL"
        descr = i["description"]
        if descr != None:
            descr = "'"+descr.replace("'","\"") + "'"
        else:
            descr = "NULL"
        countrybirth= i["regionLabel"]
        if countrybirth != None:
            countrybirth = "'"+countrybirth.replace("'","\"")+ "'"
        else:
            countrybirth = "NULL"
        img= i["image"]
        if img != None:
            img = "'"+img+ "'"
        else:
            img = "NULL"
        insertloca = i["birthlocation"]
        if insertloca != None and "/" not in insertloca:
            insertloca = "'"+insertloca.replace("'","\"") + "'"
        else:
            insertloca = "NULL"
        ligma = "("+ str(count) + ",'"+i["name"].replace("'","\"")+ "'," + insertloca + "," + countrybirth + ",'" + newlist + "'," + img + ","+ descr + "," + insertcoord +")"
        print(ligma)
        f.write(ligma)
        if count+1 != len(data):
            f.write(",\n")
        else:
            f.write("\n")
    f.close()


# Press the green button in the gutter to run the script.
if __name__ == '__main__':
    createsql("C:/Users/chun/Desktop/Repo/cs348-quoteproject/backend/table-queries/production/authors.json","D:/Downloads/archive (2)/authorstable.sql")

# See PyCharm help at https://www.jetbrains.com/help/pycharm/
