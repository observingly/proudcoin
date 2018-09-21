import React from 'react'
import TodosContract from '../build/contracts/Todos.json'
import CoinContract from '../build/contracts/Coin.json'
import ItemsContract from '../build/contracts/Items.json'
import getWeb3 from './helpers'
import contract from 'truffle-contract'
import './index.scss'

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      textarea: '',
      web3: null,
      todos: [],
      todosContract: null,
      coinContract: null,
      items: [],
      itemsContract: null,
      name: '',
      description: '',
      price: '',
      stock: ''
    }
  
    this.renderItems = this.renderItems.bind(this);
    this.renderTodos = this.renderTodos.bind(this);
    this.instantiateContracts = this.instantiateContracts.bind(this);
    this.fetchTodos = this.fetchTodos.bind(this);
    // this.handleChange = this.handleChange.bind(this);
    // this.handleSubmit = this.handleSubmit.bind(this);
  }

  // handleSubmit (event) {
  //   event.preventDefault()
  //   this.setState({})
  // }

  // handleBuy (event) {
  //   event.preventDefault()
  //   this.setState({})
  // }

  componentWillMount() {
    getWeb3.then(results => {
      this.setState({
        web3: results.web3
      })
      this.instantiateContracts().then(() => {
        this.fetchTodos()
        this.fetchItems()
      })
    });
  }

  handleTextAreaChange(event) {
    this.setState({
      textarea: event.target.value
    });
  }

  renderTodos(todos) {
    return todos.map((todo, i) => {
      return (
        <li key={i}>{todo}</li>
      );
    })
  }

  renderItems(items) {
    return items.map((item, i) => {
      return (
        <li key={i}>{item}</li>
      );
    })
  }

  instantiateContracts() {
    const web3 = this.state.web3;
    const todos = contract(TodosContract);
    const coin = contract(CoinContract);
    const items = contract(ItemsContract);
    
    todos.setProvider(this.state.web3.currentProvider);
    coin.setProvider(this.state.web3.currentProvider);
    items.setProvider(this.state.web3.currentProvider);
    
    return todos.deployed().then(todosContract => {
      this.setState({
        todosContract
      })
    })

    return coin.deployed().then(coinContract => {
      this.setState({
        coinContract
      })
    })

    return items.deployed().then(itemsContract => {
      this.setState({
        itemsContract
      })
    })
  }

  fetchTodos() {
    const web3 = this.state.web3;
    const todosContract = this.state.todosContract;
    todosContract.getTodos().then(todos => {
      this.setState({
        todos: todos.map(todo => web3.toAscii(todo))
      })
    })
  }

  fetchItems() {
    const web3 = this.state.web3;
    const itemsContract = this.state.itemsContract;
    itemsContract.getItems().then(items => {
      this.setState({
        items: items.map(item => web3.toAscii(item))
      })
    })
  }

  addTodo() {
    const web3 = this.state.web3;
    const todosContract = this.state.todosContract;
    todosContract.addTodo(web3.fromAscii(this.state.textarea), {
      from: web3.eth.accounts[0]
    })
  }

  addItem() {
    const web3 = this.state.web3;
    const itemsContract = this.state.ItemsContract;
    itemsContract.addItem(web3.fromAscii(this.state.name, this.state.description, this.state.price, this.state.stock), {
      from: web3.eth.accounts[0]
    })
  }

  buyItem() {
    const web3 = this.state.web3;
    const itemsContract = this.state.ItemsContract;
    itemsContract.buyItem(web3.fromAscii(), {
      from: web3.eth.accounts[0]
    })
  }
  
  render() {
    if (!this.state.web3) {
      return (
        <div> Loading web3 </div>
      );
    }
    return (
      <div className="app">
        <header>
          <nav>
            <a href="#"> ProudCoin App</a>
          </nav>
        </header>
        <main>
          <h1>Store</h1>
          <form onSubmit={this.handleSubmit}>
            <label>Name</label>
            <input type="text" name="name" value={this.state.name} required onChange={this.handleChange} /> 
            <label>Description</label>
            <textarea name="description" value={this.state.description} onChange={this.handleChange} />
            <label>Price</label>
            <input type="text" name="price" value={this.state.price} required onChange={this.handleChange} />
            <label>Stock</label>
            <input type="number" name="stock" value={this.state.stock} required onChange={this.handleChange} />
            <button onClick={this.addItem.bind(this)}>Add Item</button>
          </form>
          <ul>
            {this.renderItems(this.state.items)}
          </ul>
      {/**<textarea id="textarea" value={this.state.textarea} onChange={this.handleTextAreaChange.bind(this)} />
          <button onClick={this.addTodo.bind(this)}>Add Todo</button>
          <ul>
            {this.renderTodos(this.state.todos)}
          </ul>**/}
        </main>
        <footer>
          <a href="https://metamask.io/" rel="noopener noreferrer" target="_blank">
            <img src={require("../assets/images/metamask.png")} alt="" className="metamask" />
          </a>
        </footer>
      </div>
    );
  }
}

export default App;
