# Covid Education Challenge

Challenge using Adobe Cloud PDF services to provide solutions to education in Covid-19 crisis

# Setup

```
git clone https://github.com/skflowne/covid-edu-challenge
cd covid-edu-challenge
npm link
```

Copy your `dc-services-sdk-credentials.json` and `private.key` into the root of the project

Now the command line tool is available through `pdf_creator`

# Usage

```
pdf_creator
pdf_creator path/to/html.zip output/path/name.pdf
pdf_creator --html path/to/html.zip --out output/path/name.pdf
```

The CLI will prompt for missing arguments but you won't be able to use Unix autocomplete in the prompts
