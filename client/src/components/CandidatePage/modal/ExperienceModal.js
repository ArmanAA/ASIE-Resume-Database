import React, { Component } from 'react';
import Modal from 'react-responsive-modal';
import {SortableContainer, SortableElement, arrayMove} from 'react-sortable-hoc';
import ExperienceAddModal from './ExperienceAddModal';

const styles = {
  fontFamily: "sans-serif",
  textAlign: "center"
};

const SortableItem = SortableElement(({value}) =>
  <div className="noselect">
    <h4>{value.title}</h4><br/>
    <p>{value.company}</p>
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

export default class ExperienceModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false
    }
    this.componentWillReceiveProps(props);
  }

  onSortEnd = ({oldIndex, newIndex}) => {
    this.setState({
      experiences: arrayMove(this.state.experiences, oldIndex, newIndex),
    });
  };

  onOpenModal = () => {
    this.setState({ open: true });
  };

  onCloseModal = () => {
    this.setState({ open: false });
  };

  componentWillReceiveProps(nextProps) {
    if(nextProps.data) {
      let experiences = nextProps.data || [];
      this.setState({
        experiences: experiences
      });
    }
  }

  render() {
    const { open } = this.state;
    return (
      <div style={styles}>
        <h2 onClick={this.onOpenModal}>+ Experience</h2>
        <Modal open={open} onClose={this.onCloseModal} little>
          <ExperienceAddModal/>
          <div>
            <SortableList items={this.state.experiences} onSortEnd={this.onSortEnd} helperClass='sortableHelper'/>
          </div>
        </Modal>
      </div>
    )
  }
}