require('dotenv').config();
const express=require('express');
const app = express();
const nunjucks=require('nunjucks');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const port = process.env.SERVER_PORT || 3000;


let connection = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'5353',
    database:'server'
});
connection.connect();

app.set('view engine','html');
nunjucks.configure('views',{
    express:app
})

app.use(express.static('public'));

app.use(bodyParser.urlencoded({extended:false}))




//index
app.get('/',(req,res)=>{
    res.render('index.html');
});


//signup
app.get('/signup',(req,res)=>{
    res.render('sign_up.html');
})

app.post('/signup',(req,res)=>{
    connection.query(`INSERT INTO user(id,password,sex) VALUES('${req.body.id}','${req.body.password}','${req.body.sex}')`,(error,results)=>{
        if(error) console.log(error);
        else{
            res.redirect('/');
        }
    })
})

app.get('/list',(req,res)=>{
    connection.query(`select idx,subject,username,date_format(today,'%Y.%m.%d') as today, hit from board ORDER BY idx DESC limit 20`,(error,results)=>{
        if(error) console.log(error);
        else{
            let total_record=results.length;
            results.forEach(ele=>{
                ele.idx = total_record;
                total_record--;
            });
                res.render('board_list.html',{
                title:results
            })}
    });
});


//write
app.get('/write',(req,res)=>{
    res.render('board_write.html')
});

app.post('/write',(req,res)=>{
    connection.query(`INSERT INTO board(subject,username,content) VALUES('${req.body.subject}','${req.body.board_name}','${req.body.context}')`,(error,results)=>{
        if(error) console.log(error);
        else{
            res.redirect('./list');
            }
    })
})

//view
app.get('/view',(req,res)=>{
    connection.query(`UPDATE board SET hit = hit+1 where idx=${req.query.idx}`);
    connection.query(`select*from board where idx=${req.query.idx}`,(error,results)=>{
        if(error) console.log(error);
        else{ 
            //console.log(results);
            res.render('board_view.html',{
                title: results[0].subject,
                name:results[0].username,
                content:results[0].content,
                id:results[0].idx
            });
        }
    });
});
        
//modify
app.get('/modify',(req,res)=>{
    connection.query(`select*from board where idx=${req.query.id}`,(error,results)=>{
        if(error) console.log(error);
        else{
            //console.log(results);
            res.render('board_modify.html',{
                title: results[0].subject,
                content:results[0].content,
                idx:results[0].idx
            })
        }

    })
})

app.post('/modify',(req,res)=>{
    connection.query(`UPDATE board SET subject='${req.body.board_subject}',content='${req.body.board_name}' WHERE idx='${req.body.board_num}'`,error=>{
        if(error) console.log(error);
        else{
            res.redirect('./list');
            }

    })
})

//delete
app.get('/delete',(req,res)=>{
    connection.query(`delete from board where idx=${req.query.id}`,(error,results)=>{
        if(error) console.log(error);
        else{
            console.log(results);
            res.redirect('./list');
        }

    })
})

app.listen(port,()=>{
    console.log(`server start port ${port}`);
})