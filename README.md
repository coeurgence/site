# coeurgence site

## edit the writing

Open `site/content.js`. Every website sentence is stored there under `hero`, `origins`, `approach`, `work`, `vision`, and `footer`.

Change only the text inside quotation marks, then commit the change. Cloudflare will publish the update automatically.

## add the site folder to GitHub

Your repository should look like this:

```text
coeurgence/
└── site/
    ├── index.html
    ├── styles.css
    ├── content.js
    └── script.js
```

### upload through the browser

1. Open the `coeurgence` repository.
2. Click **Add file**.
3. Choose **Upload files**.
4. Drag the `site` folder into GitHub.
5. Enter `add initial website` as the commit message.
6. Click **Commit changes**.

If GitHub does not preserve the folder, create each file using names such as `site/index.html`, `site/styles.css`, `site/content.js`, and `site/script.js`.

## Cloudflare Pages settings

- production branch: `main`
- framework preset: `none`
- build command: leave blank
- build output directory: `site`

Then add `coeurgence.org` under **Custom domains**.

## edit colours

Open `site/styles.css`. The main colours appear at the very top as CSS variables.

## edit the email

Open `site/content.js` and replace `hello@coeurgence.org` with the address you create.
