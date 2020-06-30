# Covid Education Challenge
Challenge using Adobe Cloud PDF services to provide solutions to education in Covid-19 crisis

# Setup
```
git clone https://github.com/skflowne/covid-edu-challenge
cd covid-edu-challenge
```
Copy your `dc-services-sdk-credentials.json` and `private.key` into the root of the project
Then run `npm link`

Now the command line tool is available through `create-pdf`

# Usage

```
create-pdf --html path/to/html.zip --out output/path/name.pdf
```

The cli takes only two arguments
`--html` The path to the zip file containing your HTML page
`--out` The path you want to save the generated PDF at

You can also run it without arguments and it will prompt you for what's missing but you won't get the Unix autocomplete in that case
The best way to run it is to only specify `--html` and let it prompt you for output (which will give you a default path)
