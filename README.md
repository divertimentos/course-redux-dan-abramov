# Fundamentals of Redux Course from Dan Abramov

<!--toc:start-->

- [Fundamentals of Redux Course from Dan Abramov](#fundamentals-of-redux-course-from-dan-abramov)
  - [Reducer](#reducer)
  - [Store](#store)
  - [Reimplementando a função `createStore`](#reimplementando-a-função-createstore)
  - [Reimplementando a função `combineReducers`](#reimplementando-a-função-combinereducers)
    
    <!--toc:end-->

![](https://github.com/divertimentos/course-redux-dan-abramov/blob/main/media/abramov-redux.png)

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

## Reimplementando a função `createStore`

```javascript
const createStore = (reducer) => {
  let state;
  listeners = [];

  const getState = () => state;

  const dispatch = (action) => {
    state = reducer(state, action);
    listeners.forEach((listener) => listener());
  };

  const subscribe = (listener) => {
    listeners.push(listener);
    return () => {
      listeners = listeners.filter((lis) => lis !== listener);
    };
  };

  dispatch({});

  return { getState, dispatch, subscribe };
};
```

Segundo o Dan Abramov, essa função é muito similar à que existe dentro do código oficial do Redux.

## Reimplementando a função `combineReducers`

```javascript
const combineReducers = (reducer) => {
  return (state = {}, action) => {
    return Object.keys(reducers).reduce((nextState, key) => {
      nextState[key] = reducers[key](state[key], action);
      return nextState;
    }, {});
  };
};
```

---

(Aprendi com o Dan Abramov que é possível passar a store do Redux pra baixo usando o Context. Redux + Context API. Não sabia que era possível!)

Um componente do tipo `<Provider />` nada mais é que um componente feito para retonar `{children}`.

```javascript
// exemplo class-based
class Provider extends Component {
  getChildContext() {
    return {
      store: this.props.store,
    };
  }

  render() {
    return this.props.children;
  }
}
```

(Ok, mais tarde o Abramov falou que precisa de uma porrada de outras configs para que o Provider e o Context funcionem juntos em componentes class-based :clown:)

Este curso está bastante datado; ele mistura classes funções e não incentiva o uso do ContextAPI por ser (à epoca) instável. Eu criei outro repositório chamado [Redux Essentials Tutorial](https://github.com/divertimentos/redux-essentials-tutorial).
