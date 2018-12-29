const { mysql, CategoryRepo, Query } = require('./lib')

let conn = mysql.connect('127.0.0.1', 'admin', 'muzmatch_blog', 'root')


// let repo = new CategoryRepo(conn)
// console.log(repo)

// repo.add({
//     id:      '1cafb550-00a2-11e9-b70d-4b687f008cf0',
//     title:   'Mihai15',
//     slug:    'mihai15',
//     updated: '2018-12-17 20:11:09',
//     created: '2018-12-17 20:11:09'
// })
//
//
// repo.add({
//     id:      '1cafe550-00a2-11e9-b70d-4b687f008cf0',
//     title:   'Mihai',
//     slug:    'mihai',
//     updated: '2018-12-17 20:11:09',
//     created: '2018-12-17 20:11:09'
// })
//
// repo.flush().then((result)=> {
//     console.log(result)
// }).catch((error)=> {
//     console.log(error)
// })

// repo.all().then((categories)=> {
//     // console.log(categories)
//     repo.removeAll(categories).then((result)=> {
//         console.log(result)
//     }).catch((error)=> {
//         console.log(error)
//     })
// })

let query = Query.table('articles')
                 .where('id', '123')
                 .where('name', 234)
                 .orWhere('slug', 'mihai-is-great')
                 .createOrUpdate({
                     id: '123444',
                     name: 'Bogdan',
                     slug: 'bogdan-is-shit'
                 })
                 // .create({
                     // id: '123444',
                     // name: 'Bogdan',
                     // slug: 'bogdan-is-shit'
                 // })
                 // .update({
                 //     id: '123444',
                 //     name: 'Bogdan',
                 //     slug: 'bogdan-is-shit'
                 // })

console.log(query)
