In order to run tests in band (One by one), change the scripts to:
1. `"test-silent": "jest --runInBand || exit 0"`
1. `"tests": "tests --runInBand"`

