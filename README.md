# graham's website

To edit the `writing` and `books` pages, find them in the `_pages` folder, and click the pencil icon to edit them. These pages are written in Markdown, which is a simple way to format text. Here's a [cheat sheet](https://www.markdownguide.org/cheat-sheet/) for Markdown. After you've made your changes, find the green "Commit changes" button, and click it to save your changes. Add a brief description of the changes you made in the "Commit changes" box (e.g. `Add Paris Review piece`), and then click the green "Commit changes" button to save your changes. The website should reflect your changes within a few minutes.

## Update "writing" page

Go to [\_pages/writing.md](_pages/writing.md) and add a new entry for the new publication. Follow the format of the existing entries.

### Section (genre) header

```
### Section header is preceded by hash marks
```

### Publication information

```
- [Title](URL) [Publisher]
```

## Update "books" page

Go to [\_pages/books.md](_pages/books.md) and add a new entry for the new publication. Follow the format of the existing entries.

### Book title

```
### Book title is preceded by hash marks
```

### Cover image

Upload the cover image into the [assets/img](assets/img) directory. Then add the following code to the book's entry:

```
{% include figure.liquid loading="eager" path="assets/img/cover.jpg" class="w-25 pr-3 pb-3 float-left" %}
```

### Book description

Any text that follows the cover image will be displayed as the book's description. For example:

```
Book description

Available from [Publisher](URL) and [Amazon](URL).
```
