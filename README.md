# Mastodon Sociologists

This repository provides a most simple web app that helps to bulk follow sociologists on the FOSS microblogging service Mastodon. In it you can create a csv-file that can be uploaded in any accounts mastodon seetings, in order to follow a list of accounts at once.

## Can I use this for my discipline/peer group?

Yes, basically you just have to fork the repro. There are two files that you will need to change. The Text in index.html and the accounts that are stored in `resources/users.csv`. Please keep the name of this file (or change it in `assets/js/createcsv.js` and `assets/accountsfortoots.js`, too).

The branch [FollowingsForMastodon_desociologizes](https://github.com/trutzig89182/Mastodon-Sociologists/tree/FollowingsForMastodon_desociologized) can be interesting for you. We try to strip it of the sociology specific content in order to make using the code for other topics easier.

You can publish your web app directly from the repository. For this, go to “Settings” and then choose “pages” in the left menue.

Please make sure to only provid account information with the consent of the account in your csv file and webpage.

## Documentation

### csv file
the csv file is stored in `/resources/`.
Any file with the colums `account,name,url` will do.

### tootformat.html
The page `tootformat.html` renders all accounts from the csv file as “account (name)”. This offers you a more readable format, which you can copy to your posts in Mastodon. It can be reached if you add `/tootformat.html` to your webpage’s url.

### metatags & preview image
Metatags help you to change how the webpage is previewed in social media. You can find them in the `<head>` of `index.html`. Adapt them to your pages name etc.
If you want to use a preview picture, put it in `resources/images/` and name it `preview-image.png`.


## License

The repository can be used under GNU General Public Licese v3, except the /resources/sociologists.csv-file, which can only be used with explicit permission by the authors.
