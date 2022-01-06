// Going to do a test api fetch over here
// Using jsonplaceholder for testing, I'll fetch the entire list of 200 todos but only display 20 of them

export interface Todo {
  title: string
  completed: boolean
  id?: number
}

export async function getTodosFromJsonPlaceHolder() {
  // Just create a fake list of todos, messing around using some weird map

  // Return a list of 20 todos
  const todos20 = Array<number>(20)
    .fill(0)
    .map(
      ({}, id) =>
        <Todo>{
          id: id,
          title: `Todo ${id}`,
          completed: id % 2 === 0,
        }
    )

  /*
  const resopnse = await fetch('https://jsonplaceholder.typicode.com/todos')
  allTodos = await resopnse.json()
  for (let i = 0; i < 20; i++) {
    todos20.push(allTodos[i])
  }
  */

  return todos20
}
