import { Router } from "express";

import { Todo } from "../models/todo";

let todos:Todo[] = [];

type reqbody = {text: string}
type reqparamas = {todoid : string}

const router = Router();

router.get('/', (req,res,next)=>{
    res.status(200).json({todos:todos})
})

router.post('/todo', (req,res,next)=>{
    const body = req.body as reqbody
    const newtodo:Todo ={
        id: new Date().toISOString(),
        text: body.text
    }
    todos.push(newtodo)
    res.status(200).json({message:'Added Todo', todo:newtodo, todos:todos})

    router.put('/todo/:todoid', (req,res,next)=>{
        const param = req.params as reqparamas
        const tid = param.todoid;
        const body = req.body as reqbody
        const todoIndex = todos.findIndex((todoitem)=>(todoitem.id === tid))

        if(todoIndex >=0){
            todos[todoIndex] = {id:todos[todoIndex].id , text:body.text}
            return res.status(200).json({message:'updated todo'})
        }
        res.status(404).json({message:'could not find todo for this id'})
    })

    router.delete('/todo/:todoid', (req,res,next)=>{
        const param = req.params as reqparamas
        todos = todos.filter((todoitem)=> todoitem.id !== param.todoid);
        res.status(200).json({message:'deleted todo' , todos: todos})
    })
    
})

export default router