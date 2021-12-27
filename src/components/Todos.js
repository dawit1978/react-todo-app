import React, { useState } from 'react'
import { Avatar,  Button,  List, ListItem, ListItemAvatar, ListItemText, Modal } from '@mui/material'
import {makeStyles} from '@mui/styles'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import FactCheckIcon from '@mui/icons-material/FactCheck';
import './Todos.css'
// import firebase from "firebase/compat/app"

import db from '../firebase'


const useStyles = makeStyles((theme) =>({
    paper:{
        // position: 'absolute',
        flexDirection: 'column',
        margin: '0 auto',
        width:500,
        background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
        border: 0,
        borderRadius: 3,
        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
        color: 'white',
        height: 48,
        padding: '0 30px',

    },
    root: {
        '&$selected': {
          backgroundColor: 'white',
          '&:hover': {
            backgroundColor: 'gray',
          }
        },
      },
      selected: {},
}));


function Todos(props) {
    const classes = useStyles();
    const[open, setOpen] = useState(false);
    const[input, setInput] = useState('');
    const {todo} = props
    // const { index, style } = props;

    const updateTodo = ()=>{
        db.collection('todos').doc(props.todo.id).set({
            todo:input
        },{merge:true})
        setOpen(false);
    }
    return (
        <>
        <Modal
        open={open}
        onClose={e=>setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        >
            <div className={classes.paper}>
                <h2 id="parent-modal-title">Edit Todos</h2>
                <input placeholder={props.todo.todo} value={input} onChange={e => setInput(e.target.value)}/>
                <Button variant="contained" onClick={updateTodo}>Update Todo</Button>
            </div>
        </Modal> 

        <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper', margin: '0 auto', }}>
      <ListItem  button selected >
        <ListItemAvatar>
          <Avatar>
           <FactCheckIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary={todo.todo} secondary="Dummy deadline ⏲️" />
            <EditIcon onClick={e=>setOpen(true)} classes={{ root: classes.root, selected: classes.selected }}/>
            <DeleteForeverIcon onClick={event=> {db.collection('todos').doc(todo.id).delete()}} />
      </ListItem>
     </List>

        </>
    )
}

export default Todos
