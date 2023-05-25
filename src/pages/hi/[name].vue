```js {1-2}
const md = new MarkdownIt()
md.use(Shiki)

const res = md.render(/** ... */)
console.log(res)
```
