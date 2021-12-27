import React, {useState, useEffect} from 'react'
import { Button, FormControl, Input, InputLabel } from '@mui/material';
import './App.css';
import Todos from './components/Todos';
import firebase from "firebase/compat/app"
// import firebase from 'firebase'
import  db  from './firebase';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) =>({
  root: {
    '&$selected': {
      backgroundColor: 'green',
      '&:hover': {
        backgroundColor: 'gray',
      }
    },
  },
  selected: {},
}));

function App() {
    const classes = useStyles();
    const [todos, setTodos] = useState([]);
    const [input, setInput] = useState('');
    // console.log(input);

    //when the app loads we need to listen to the database and fetch the todos
    // use effect runs when the app loads 

    useEffect(() => {

        db.collection('todos').orderBy('timestamp', 'desc').onSnapshot(snapShot=>{
           setTodos(snapShot.docs.map(doc=>({id:doc.id, todo: doc.data().todo})))
        })
    },[])

    const addTodo = e =>{
      e.preventDefault(); // stop the refresh

      db.collection('todos').add({
        todo: input,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
      })
      //  setTodos([...todos, input])
       setInput('') // clear up the input field after submit
    }
   
  return (
      <div className="App">
        
     <h1>Hello Good People 😃</h1>
     <h2>make plans 🚀</h2>
        <form onSubmit={addTodo}>
        <FormControl className={classes.root}>
              <InputLabel> ✔️ Write a todo</InputLabel>
              <Input id="my-input" aria-describedby="my-helper-text" type="text" 
                placeholder=" Enter your task"
                value = {input}
                onChange={e => setInput(e.target.value)}/>
              {/* <FormHelperText id="my-helper-text">We'll never share your email.</FormHelperText> */}
          </FormControl>
         
          <Button disabled={!input} type="submit" variant="contained"color="primary">add todos</Button>
        </form>
        <ul>
          {todos.map(todo =>(
             <Todos  todo={todo}/>
          ))}
        </ul>
    </div>
      
  );
}

export default App;
