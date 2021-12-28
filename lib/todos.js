// Going to do a test api fetch over here
// Using jsonplaceholder for testing, I'll fetch the entire list of 200 todos but only display 20 of them
export async function getTodosFromJsonPlaceHolder() {
  let allTodos = []

  // Return just 20 of them
  let todos20 = []

  /*
  const resopnse = await fetch('https://jsonplaceholder.typicode.com/todos')
  allTodos = await resopnse.json()
  for (let i = 0; i < 20; i++) {
    todos20.push(allTodos[i])
  }
  */

  return todos20
}
