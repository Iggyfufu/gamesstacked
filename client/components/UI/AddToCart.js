import React from 'react'
import {connect} from 'react-redux'
import {Button} from 'semantic-ui-react'

import {addToCart, addQuantity} from '../../reducers/cartReducer'
import {toggleModal} from '../../reducers/modalReducer'

class AddToCart extends React.Component {
  addOrEdit(id, cartId, userId) {
    const {
      cartItems,
      isCartLoading,
      selectedProduct,
      addQuantity,
      addToCart,
      toggleModal
    } = this.props

    if (isCartLoading) {
      return
    }

    const cartItem = cartItems.find(
      item => item.productId === selectedProduct.id
    )
    if (cartItem) {
      addQuantity(cartItem.id, cartItem.quantity + 1, userId)
    } else {
      addToCart(id, cartId, userId, selectedProduct)
    }

    toggleModal()
  }

  render() {
    const {cartId, user, match: {params}} = this.props
    return (
      <Button
        className="product-cover-button"
        primary
        onClick={() => this.addOrEdit(params.id, cartId, user.id)}
        fluid
        positive
      >
        Add to Cart
      </Button>
    )
  }
}

const mapStateToProps = state => {
  const {cartId, cartItems, isLoading} = state.cart
  const {selectedProduct} = state.products

  return {
    selectedProduct,
    cartId,
    user: state.user,
    cartItems,
    isCartLoading: isLoading
  }
}

export default connect(mapStateToProps, {
  addToCart,
  addQuantity,
  toggleModal
})(AddToCart)
