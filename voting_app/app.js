const ProductList = React.createClass({
  getInitialState: function() {
    return {
      products: [],
      isAsc: true
    };
  },
  componentDidMount: function() {
    this.sort(this.state.isAsc);
  },
  sortAsc: function() {
    const products = Data.sort((a, b) => {
      return b.votes - a.votes;
    });
    this.setState({ products: products, isAsc: true});
  },
  sortDesc: function()  {
    const products = Data.sort((a, b) => {
      return a.votes - b.votes;
    });
    this.setState({ products: products, isAsc: false});
  },
  sort: function(isAsc) {
    isAsc ? this.sortAsc() : this.sortDesc();
  },
  handleProductVote: function(productId, score) {
    Data.forEach((el) => {
      if (el.id === productId) {
        el.votes = el.votes + score;
        return;
      }
    });
    this.sort(this.state.isAsc);
  },
  handleOnOrderedSortButtonClick: function() {
    this.sort(!this.state.isAsc);
  },
  render: function() {
    const products = this.state.products.map((product) => {
      return (
        <Product 
          key={'product-' + product.id}
          id={product.id}
          title={product.title}
          description={product.description}
          url={product.url}
          votes={product.votes}
          submitter_avatar_url={product.submitter_avatar_url}
          product_image_url={product.product_image_url}
          onVote={this.handleProductVote}
        />
      );
   });
   const sortButton = (
      <OrderedSortButton
        onClick={this.handleOnOrderedSortButtonClick}
        isAsc={this.state.isAsc}
      />
    );

    return (
      <div>
        <div>
          {sortButton}
        </div>
        <div className="ui items">
          {products}
        </div>
      </div>
    );
  },
});

const Product = React.createClass({
  handleUpVote: function() {
    this.props.onVote(this.props.id, 1);
  },
  handleDownVote: function() {
    this.props.onVote(this.props.id, -1)
  },
  render: function() {
    return(
      <div className="item">
        <div className="image">
          <img src={this.props.product_image_url}/>
        </div>
        <div className="middle aligned content">
          <div className="header">
            <a onClick={this.handleUpVote}>
              <i className='large caret up icon'></i>
            </a>
            {this.props.votes}
            <a onClick={this.handleDownVote}>
              <i className='large caret down icon'></i>
            </a>
          </div>
          <div className="description">
            <a href={this.props.url}>
              {this.props.title}
            </a>
          </div>
          <div className='extra'>
            <span>Submitted by:</span>
            <img
              className="ui avatar image"
              src={this.props.submitter_avatar_url}
            />
          </div>
        </div>
      </div>
    );
  },
});

const OrderedSortButton = React.createClass({
  handleClick: function() {
    this.props.onClick();
  },
  render: function() {
    return (
      <button onClick={this.handleClick} className='ui button'>
        { this.props.isAsc ? "Most Upvoted" : "Most Downvoted" }
      </button>
    );
  }
});

ReactDOM.render(
  <ProductList />,
  document.getElementById('content')
);