# Redux (Abramov)

## Reducer

A função que você cria para possuir toda a lógica é o reducer. Um exemplo simples de um reducer é esse `counter` no qual temos uma lógica de incrementar e decrementar números a partir do 0.

```javascript
const counter = (state = 0, action) => {
  switch (action.type) {
    case "INCREMENT":
      return state + 1;
    case "DECREMENT":
      return state - 1;
    default:
      return state;
  }
};
```

## Store

O próximo conceito importante é a store. Essa função possui três métodos principais:

1. `getState()`
2. `dispatch()`
3. `subscribe()`

Na sua sintaxe básica, você deve passar para a função `createStore()` o reducer que será utilizado:

```javascript
const { createStore } = Redux;
const store = createStore(counter);
```

O `getState()` retorna o estado atual da store. No caso atual, `console.log(store.getState())` irá retornar `0`, que é o estado inicial do reducer passado para a store.

O `dispatch()` é o método mais comum e é utilizado para "despachar" um ações que irão alterar estados dentro do reducer por meio da store. Por exemplo, para você incrementar um número, utilize `store.dispatch({ type: 'INCREMENT'})`. O resultado de `console.log(store.getState())` agora será `1`.

O método `subscribe()` nos permite disparar um callback para a aplicação toda vez que uma ação é despachada. No seguinte exemplo, iremos escrever o estado atualizado no HTML da página, utilizando o seguinte código:

```javascript
store.subscribe(() => {
  document.body.innerText = store.getState();
});

document.addEventListener("click", () => {
  store.dispatch({ type: "INCREMENT" });
});
```

OBS.: esses _snippets_ são meros exemplos. Encare-os como pseudo-JavaScript.

## Reimplementando a função `createStore` na mão
