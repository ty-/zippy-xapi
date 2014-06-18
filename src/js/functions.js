var storageKeyName = "zippy-xapi";

function getCompressedData() {
    return localStorage.getItem(storageKeyName);
}
function setCompressedData(data) {
    localStorage.setItem(storageKeyName, data);
}

var xstmt = {
    "verb": ADL.verbs.interacted,
    "object": {
        "definition": {
            "name": {
                "en-US": "zippy-xapi demo"
            },
			"description": {
				"en-US": "To be replaced with the compressed statement"
			}
        },
        "id": "http://adlnet.gov/xapi/samples/zippy-xapi/test",
        "objectType": "Activity"
    },
    "actor": {
        "mbox": "mailto:tyler.mulligan.ctr@adlnet.gov",
        "name": "Tyler Mulligan",
        "objectType": "Agent"
    },
    "context": {
        "contextActivities": {
            "parent": [
                {
                    "definition": {
                        "name": {
                            "en-US": "zippy-xapi demo"
                        },
                        "description": {
                            "en-US": "An example of using lz-string compression and localStorage with xAPI statements."
                        }
                    },
                    "id": "http://adlnet.gov/xapi/samples/zippy-xapi",
                    "objectType": "Activity"
                }
            ]
        }
    },
};

var stmt = JSON.stringify(xstmt);

var compressed = LZString.compress(stmt);

// Sets compressed data in localStorage
setCompressedData(compressed);

console.log("Statement is: " + stmt);
console.log("Size of statement is: " + stmt.length);
console.log("Size of compressed statement is: " + compressed.length);
console.log("What it looks like compressed: " + compressed);

var string = LZString.decompress(compressed);

console.log("Is the decompressed string the same as the original: " + (string === stmt) );

xstmt.object.definition.description = { "en-US": compressed };

ADL.XAPIWrapper.sendStatement(xstmt);