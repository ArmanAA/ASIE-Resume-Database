import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

const styles = {
	fontFamily: "sans-serif",
	textAlign: "center"
};

export default class PortfolioAddModal extends Component {
	constructor(props) {
		super(props);
		this.state = {
			modal: false,
			id: props.id,
			centered: true,
			imageDisable: false,
			videoDisable: false
		};

		this.handleSubmit = this.handleSubmit.bind(this);
		this.toggle = this.toggle.bind(this);
		this.disableImage = this.disableImage.bind(this);
		this.disableVideo = this.disableVideo.bind(this);
	}

	componentWillReceiveProps(nextProps) {}

	toggle() {
		this.setState({
			modal:!this.state.modal
		});
		this.setState({imageDisable: false});
		this.setState({videoDisable: false});

	}

	disableImage(event) {
		if (event.target.value) {
			this.setState({videoDisable: true});
		} else {
			this.setState({videoDisable: false});
		}
	}

	disableVideo(event) {
		
		if (event.target.value.length > 0) {
			this.setState({imageDisable: true});
		} else {
			this.setState({imageDisable: false});
		}
	}

	handleSubmit(event) {
		event.preventDefault();
		const data = new FormData(event.target);
		fetch('/api/candidates/portfolios/' + this.state.id + '/update', {
			method: 'POST',
			body: data,
			credentials: 'include'
		}).then(function(response) {
			if(response) {
				window.location.reload();
			}
			else {
				this.onCloseModal();
			}
		});
	}
	render() {
		const { modal, centered } = this.state;
		return (
			<div style={styles}>
				<Button onClick={this.toggle}>+ Add Portfolio</Button>
				<Modal centered={this.state.centered} isOpen={this.state.modal} toggle={this.toggle}>
					<form className="form-group" onSubmit={this.handleSubmit}>
						<ModalHeader toggle={this.toggle}>
								<h5>Add detailed information about your work experience!</h5>
						</ModalHeader>
						<ModalBody>
							<label className='row'> Title: <input className="form-control" type="text" name="title" required/></label>
							<label className='row'> Description: <input className="form-control" type="text" name="description" required/></label>
							<label className='row'> YouTube Video Link: 
								<input 
									className="form-control" 
									type="url" 
									name="video" 
									onChange={this.disableVideo} 
									disabled={this.state.videoDisable} 
									pattern="^((?:https?:)?\/\/)?((?:www|m)\.)?((?:youtube\.com|youtu.be))(\/(?:[\w\-]+\?v=|embed\/|v\/)?)([\w\-]+)(\S+)?$"
									title="The URL must be a YouTube link"
									required
								/>
							</label>
							<label className='row'> Image: <input className="form-control" accept="image/*" type="file" onChange={this.disableImage} disabled={this.state.imageDisable} name="image" required/></label>
						
						</ModalBody>
						<ModalFooter>
							<Button color="primary" type="submit">Submit Changes</Button>{' '}
							<Button color="secondary" onClick={this.toggle}>Cancel</Button>
						</ModalFooter>
					</form>
				</Modal>
			</div>
		);
	}
}