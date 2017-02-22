# wikichat-rss

## Summary
<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->


- [Installation](#installation)
- [Start](#start)
- [Use](#use)
- [Tip](#tip)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Installation
```sh
git clone https://github.com/maxlath/wikichat-rss
cd wikichat-rss
npm install
```

## Start
* As a normal process
```sh
npm start
# Check that everything is fine
curl http://localhost:5432/?feed=project-chat
```

* As a daemon handled by [systemd](https://en.wikipedia.org/wiki/Systemd)
```sh
# Uses sudo so you will be prompt for your password
npm run add-to-systemd
sudo systemctl start wikichat-rss
# Check that everything is fine
sudo systemctl status wikichat-rss
curl http://localhost:5432/?feed=project-chat
```

## Use
After having started the server, simply pass one of the feed URL to your local RSS aggregator.

* [Wikidata Project chat](https://www.wikidata.org/wiki/Wikidata:Project_chat): http://localhost:5432/?feed=project-chat
* [Books WikiProject](https://www.wikidata.org/wiki/Wikidata_talk:WikiProject_Books): http://localhost:5432/?feed=books-project

Edit `./feeds.js` to add more. Should hopefully work: it's based on scrapping those pages, which is always somewhat dirty.

## Tip
I'm using it locally with Thunderbird (tuto: [en](https://support.mozilla.org/t5/News-Feeds-Blogs-and-Social/How-to-Subscribe-to-News-Feeds-and-Blogs/ta-p/16473), [fr](https://support.mozilla.org/t5/Bases/Comment-s-abonner-aux-flux-de-nouvelles-et-blogs/ta-p/5727)), but in case you need to use it with an online aggregator, you will need to make this server accessible from the all mighty Internet.
