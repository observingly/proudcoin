import React from 'react'
import CoinContract from '../build/contracts/Coin.json'
import StoreContract from '../build/contracts/Store.json'
import getWeb3 from './helpers'
import contract from 'truffle-contract'
import './index.scss'

class App extends React.Component {
  constructor(props) {
    super(props);
    

    this.state = {
      web3: null,
      coinContract: null,
      storeContract: null,
      textarea: '',
      name: '',
      code: '',
      description: '',
      price: '',
      stock: '',
      items: []
    }

    this.instantiateContracts = this.instantiateContracts.bind(this)
    this.fetchItems = this.fetchItems.bind(this)
    this.renderItems = this.renderItems.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.addItem = this.addItem.bind(this)
    this.addTomato = this.addTomato.bind(this)
  }

  componentWillMount() {
    getWeb3.then(results => {
      this.setState({
        web3: results.web3
      })
      this.instantiateContracts().then(() => {
        this.fetchItems()
      })
    })
  }

  instantiateContracts () {
    const web3 = this.state.web3
    const coin = contract(CoinContract)
    const store = contract(StoreContract)

    coin.setProvider(this.state.web3.currentProvider)
    store.setProvider(this.state.web3.currentProvider)

    return coin.deployed().then(coinContract => {
      this.setState({
        coinContract
      })
      return store.deployed().then(storeContract => {
        this.setState({
          storeContract
        })
      })
    })
  }

  fetchItems () {
    const web3 = this.state.web3
    const storeContract = this.state.storeContract
    storeContract.getItems([]).then(items => {
      this.setState({
        items: items.map(item => item)
      })
    })
  }

  renderItems(items) {
    return items.map((item, i) => {
      return (
        <div key={i}>
          <p>{item.name}</p>
          <p>{item.code}</p>
          <p>{item.description}</p>
          <p>{item.price}</p>
          <p>{item.stock}</p>
        </div>
      )
    })
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  addItem(event) {
    event.preventDefault()
    const web3 = this.state.web3
    const storeContract = this.state.storeContract
    storeContract.addItem(web3.fromAscii(this.state.name), (this.state.code),
      (this.state.description), (this.state.price), (this.state.stock), {
        from: web3.eth.accounts[0]
      })
    const item = { name: this.state.name,
      code: this.state.code,
      description: this.state.description,
      price: this.state.price,
      stock: this.state.stock
    }
    this.setState({ items: [...this.state.items, item] })
  }

  buyItem(event) {
    event.preventDefault()
    const web3 = this.state.web3
    const storeContract = this.state.storeContract
    // storeContract.buyItem(web3.fromAscii(), {
    //   from: web3.eth.accounts[0]
    // })
  }

  render() {
    if (!this.state.web3) {
      return (
        <div> Loading web3 </div>
      );
    }
    return (
      <div className="app">
        <main>
          <h1>Store</h1>
          <div className="container item-container">
            <div className="col-sm item-card">
              <img src={require("../assets/images/pengin.png")} className="rounded item-image" />
              <h5 className="item-name">Pengin</h5>
              <button type="button" className="btn btn-light item-btn">Buy</button>
            </div>
            <div className="col-sm item-card">
              <img src={require("../assets/images/shirokuma.png")} className="rounded item-image" />
              <h5 className="item-name">Shirokuma</h5>
              <button type="button" className="btn btn-light item-btn">Buy</button>
            </div>
            <div className="col-sm item-card">
              <img src={require("../assets/images/tonkatsu.png")} className="rounded item-image" />
              <h5 className="item-name">Tonkatsu</h5>
              <button type="button" className="btn btn-light item-btn">Buy</button>
            </div>
            <div className="col-sm item-card">
              <img src={require("../assets/images/neko.png")} className="rounded item-image" />
              <h5 className="item-name">Neko</h5>
              <button type="button" className="btn btn-light item-btn">Buy</button>
            </div>
            <div className="col-sm item-card">
              <img src={require("../assets/images/tokage.png")} className="rounded item-image" />
              <h5 className="item-name">Tokage</h5>
              <button type="button" className="btn btn-light item-btn">Buy</button>
            </div>
            <div className="col-sm item-card">
            </div>
          </div>
        </main>
        <form onSubmit={e => this.addItem(e)}>
          <div className="form-group">
            <label>Name</label>
            <input type="text" name="name" className="form-control" required onChange={this.handleChange} />
          </div>
          <div className="form-group">
            <label>Code</label>
            <input type="text" name="code" className="form-control" required onChange={this.handleChange} />
          </div>
          <div className="form-group">
            <label>Description</label>
            <input type="text" name="description" className="form-control" required onChange={this.handleChange} />
          </div>
          <div className="form-group">
            <label>Price</label>
            <input type="text" name="price" className="form-control" required onChange={this.handleChange} />
          </div>
          <div className="form-group">
            <label>Stock</label>
            <input type="text" name="stock" className="form-control" required onChange={this.handleChange} />
          </div>
          <div className="form-group">
            <input type="file" name="image" className="form-control-file" onChange={this.handleChange} />
          </div>
          <button type="submit" className="btn btn-primary">Add Item</button>
        </form>
        <ul>
          {this.renderItems(this.state.items)}
        </ul>
        <footer>
          <a href="https://metamask.io/" rel="noopener noreferrer" target="_blank">
            <img src={require("../assets/images/metamask.png")} alt="" className="metamask" />
          </a>
        </footer>
      </div>
    )
  }
}

export default App;
