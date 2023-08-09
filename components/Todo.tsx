import Todo from "../interfaces/todo.interface";


interface Props {
    todo: Todo
}

export default function Todo({ todo }: Props) {
    return (
        <>
            <span>{todo.title}</span>
            <hr />
        </>
    )
}