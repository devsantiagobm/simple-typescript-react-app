import Head from "next/head"
import { useEffect, useRef, useState } from "react"
import Todo from "../components/Todo"
import iTodo from "../interfaces/todo.interface";

export default function Home() {
    const [todos, setTodos] = useState<iTodo[]>([])
    const inputRef = useRef<HTMLInputElement>(null)


    useEffect(() => {
        (async () => {
            const data: iTodo[] = (await (await fetch('https://jsonplaceholder.typicode.com/todos')).json()).slice(0, 10)
            setTodos(data)
        })()
    }, [])

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()

        const todo = String(Object.fromEntries(new FormData(e.currentTarget)).tarea)
        if (!todo) return;

        const newTodo: iTodo = {
            title: todo,
            id: Math.floor(Math.random() * 1000),
            userId: 1,
            completed: false
        }

        setTodos((oldTodos) => [newTodo, ...oldTodos])
        e.currentTarget.reset()
        inputRef.current?.focus()
    }

    return (
        <main>
            <div>
                <Head>
                    <link rel="stylesheet" href="https://unpkg.com/boltcss/bolt.min.css" />
                </Head>

                <h1>Lista de tareas</h1>

                <form onSubmit={handleSubmit}>
                    <input type="text" name="tarea" placeholder="Tarea" ref={inputRef} />
                    <input type="submit" value="Crear tarea" />
                </form>

                {
                    todos.map(todo => (
                        <Todo key={todo.id} todo={todo} />
                    ))
                }
            </div>
        </main>
    )
}
