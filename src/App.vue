<template>
<div class="app">

    <div class="title has-text-centered">
        Att göra lista
    </div>

    <!-- FORM -->
    <form @submit.prevent="addToDo">
        <div class="field has-addons mb-5">
        <div class="control">
            <input v-model="newToDoContent" class="input" type="text" placeholder="Lägg till något att göra..">
        </div>
        <div class="control">
            <button :disabled="!newToDoContent" class="button is-info">
                Lägg till
            </button>
        </div>
    </div>
    </form>

    
    <!-- CARDS -->
    <div :class="{ 'has-background-success-light' : todo.done }"
    class="card mb-5" 
    v-for="todo in todos" >
        <div class="card-content">
            <div class="content">

                <div class="columns is-mobile is-vcentered">
                    <div class="column" :class="{ 'has-text-success line-through' : todo.done}">
                        {{todo.content}}
                    </div>
                    <div class="column is-5 has-text-right">
                        <button @click="toggleDone(todo.id)"
                        class="button"
                        :class=" todo.done ? 'is-success' : 'is-light' ">
                            &check;
                        </button>
                        <button @click="deleteToDo(todo.id)" class="button is-danger ml-2">
                            &cross;
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>

</div>
    
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { db } from './Firebase/index'
import { collection, onSnapshot, addDoc, deleteDoc, doc, updateDoc, query, orderBy } from "firebase/firestore";


const newToDoContent = ref('')

const todos = ref([
   
])

const todosCollectionRef = collection(db, "todos")
const todosCollectionQuery = query(todosCollectionRef, orderBy("date", "desc"));

onMounted( () => {

    onSnapshot(todosCollectionQuery, (querySnapshot) => {
    const fbTodos = [];
    querySnapshot.forEach((doc) => {
        const todo = {
            id: doc.id,
            content: doc.data().content,
            done: doc.data().done,
            date: doc.data().date
        }
        fbTodos.push(todo);
    });
        todos.value = fbTodos

});

}) 



const addToDo = () => {
    
    addDoc(todosCollectionRef, {
        content: newToDoContent.value,
        done: false,
        date: Date.now()
    });

    newToDoContent.value = ''
    
}
const deleteToDo = (id) => {

    deleteDoc(doc(todosCollectionRef, id));
}

const toggleDone = (id) => {
    const index = todos.value.findIndex(todo => todo.id === id)
    
    updateDoc(doc(todosCollectionRef, id), {
    done: !todos.value[index].done
    });
    
}


</script>

<style>

@import 'bulma/css/bulma.min.css';


.app {
    max-width: 400px;
    padding: 20px;
    margin: 0px auto;
}

.line-through {
    text-decoration: line-through;
}

</style>