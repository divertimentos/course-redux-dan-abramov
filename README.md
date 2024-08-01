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
