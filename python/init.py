import sys
import json
import cgi

print("Content-Type: application/json")

result = {}
result['success'] = True
result['message'] = "The command Completed Successfully"
#result['keys'] = ",".join(fs.keys())

d = {}
for k in fs.keys():
    d[k] = fs.getvalue(k)

result['data'] = d
print(json.dumps(result,indent=1))
print("\n")
