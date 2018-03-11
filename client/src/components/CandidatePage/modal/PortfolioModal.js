import React, { Component } from 'react';
import Modal from 'react-responsive-modal';
import {SortableContainer, SortableElement, arrayMove} from 'react-sortable-hoc';
import PortfolioAddModal from './PortfolioAddModal';
import './style.css'
import "../../MenuBar.css";

const styles = {
  fontFamily: "sans-serif",
  textAlign: "center"
};

const SortableItem = SortableElement(({value}) =>
  <div className="noselect">
    <h4>{value.title}</h4><br/>
    <p>{value.description}</p>
  </div>
);

const SortableList = SortableContainer(({items}) => {
  return (
    <ul>
      {items.map((value, index) => (
        <SortableItem key={`item-${index}`} index={index} value={value} />
      ))}
    </ul>
  );
});

export default class PortfolioModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false
    };
    this.componentWillReceiveProps(props);

    this.componentWillReceiveProps = this.componentWillReceiveProps.bind(this);
  }

  onSortEnd = ({oldIndex, newIndex}) => {
    this.setState({
      items: arrayMove(this.state.items, oldIndex, newIndex),
    });
  };

  componentWillReceiveProps(nextProps) {
    this.setState({
      items: nextProps.data || []
    })
  }

  onOpenModal = () => {
    this.setState({ open: true });
  };

  onCloseModal = () => {
    this.setState({ open: false });
  };

  render() {
    const { open } = this.state;
    return (
      <div style={styles}>
        <h2 className="Link" onClick={this.onOpenModal}>+ Portfolio</h2>
        <Modal open={open} onClose={this.onCloseModal} little>
          <PortfolioAddModal />
          <div>
            <SortableList items={this.state.items} onSortEnd={this.onSortEnd} helperClass='sortableHelper'/>
          </div>
        </Modal>
      </div>
    );
  }
}