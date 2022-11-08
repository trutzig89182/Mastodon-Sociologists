# Sociologists ond Mastodon

This repository provides a most simple web app that helps to bulk follow sociologists on the FOSS microblogging service Mastodon. In it you can create a csv-file that can be uploaded in any accounts mastodon seetings, in order to follow a list of accounts at once.

## Can I use this for my discipline/peer group?

Yes, basically you just have to fork the repro and make some minor changes. **But we want to make you aware that this is by no means a professional project. Things may fall apart. It’s not very complex, and if you store your CSV file safely, nothing bad should happen. But our main focus is to make this work for the Sociologists on Mastodon page, not to offer generic tool. We still try make things easy for you, if you want to set something similar up.**

> **Please make sure to only add account information into your csv file and webpage with the consent of the owner of the account!** Even though we are keeping minimal stored information, make sure everybody has agreed to be on your list. Keep in mind that if you delete a name from the file it will still be in the repository's history, so the best security is ensuring accounts with owners that do not consent never get added to a list. Scraping publicly accessible information for accounts to add to the csv file and webpage does not gather consent.

There are two files that you will need to change. The Text in index.html and the accounts that are stored in `resources/users.csv`. Please keep the name of this file (or change it in `assets/js/app.js`, too).

For your convenience, we also have included a cleaned template for your index.html. It is named `adapt-index.html`. In it, all places where you ought to fill in some specific text for your purpose start with `XXX`, in order to make them easily identifiable. Fill in the Text, rename the file to `index.html`. You can now discard of the original `index.html`. You do not need to write any html formatting, however, if you want to make multiple pararaphs, two tags could come in handy: the (`<p></p>` tag)[https://developer.mozilla.org/en-US/docs/Web/HTML/Element/p] and the (`<a href=""></a>` tag)[https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a]. That’s it.

You can publish your web app directly from the repository. For this, go to “Settings” and then choose “pages” in the left menue.

If you have created a “XY on Mastodon” page on any academic or scientific topic, please add it to the list [here](https://github.com/nathanlesage/academics-on-mastodon) or just contact us. If it’s on any other topic, let us know, too, so we can share it.

If you want to get in touch with other people maintaining an “Academics on Mastodon”-List, you can follow the group AoM_lists@a.gup.pe or enter the public Matrix space #AcademicsOnMastodon:riotchat.de.

## Documentation

### csv file
The csv file is stored in `/resources/`.
Any file with the colums `account,name,url` will do. We are planing to add keywords and main language(s) and offer a way to filter the list. So, looking forward you could also include a column `keywords`and column `language`. Keywords should be seperated by a space (" ") and multiword keywords connected by an underscore ("_"). Languages are seperated by a space (" "). Make sure that you don’t use any commas here, as that would break the CSV file’s structure. If you don’t have columns named “keywords”  and “language” nothing happens. If you have such columns and you use them differently, you may have to addapt the app.js file.

### tootformat.html
The page `tootformat.html` renders all accounts from the csv file as “account (name)”. This offers you a more readable format, which you can copy to your posts in Mastodon. It can be reached if you add `/tootformat.html` to your webpage’s url.

### Add users
This is still experimental. Will add a page that let’s users generate their own entry and send it via email to make adding new users simpler and more reliable. It will also include a simple way of verifying that the person adding the account is it’s owner. I am working on it here: https://github.com/trutzig89182/AoM-add-user and want to include it later.

### metatags & preview image
Metatags help you to change how the webpage is previewed in social media. You can find them in the `<head>` of `index.html`. Adapt them to your pages name etc.
If you want to use a preview picture, put it in `resources/images/` and name it `preview-image.png`.

### create your own preview image for the page
In the `folder create-preview-image/` you find the file `preview-image.sla`. It is a template for your XY on Mastodon preview image. Please load the `Mastodon Mascot (Greeting).png` image from https://commons.wikimedia.org/wiki/File:Mastodon_Mascot_(Greeting).png and save it in the same folder. Now you can open `preview-image.sla` with the FOSS layout program [Scribus](https://www.scribus.net/). You probably will have to relink the images within the file to the PNG you downloaded. Perhaps you will also have to choose another font for the text.
Once you have done that, you can simply change the Title. I suggest you also change the background collour to make the preview images more distinguishable. Export your image as PNG. Make sure your file ist named preview-image.png and store it in `/resources/images/`. In one last step you have to adapt the links to your file in the Metatag section in `index.html`.


## License

The repository can be used under GNU General Public Licese v3, except the /resources/sociologists.csv-file, which can only be used with explicit permission by the authors.
