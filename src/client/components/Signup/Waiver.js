import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import './css/Signup.css';
import { Link } from 'react-router-dom'

export default class Waiver extends Component {

	constructor(props) {
		super(props);
		this.state = {
			modal: false,
			centered: true
		};

		this.toggle = this.toggle.bind(this);
	}

	toggle() {
		this.setState({
			modal:!this.state.modal
		});
	}

	render() {
		return (
			<span>
			<Link to="#" onClick={this.toggle}>terms & conditions</Link>
			<Modal centered={this.state.centered} isOpen={this.state.modal} toggle={this.toggle}>
				<ModalHeader toggle={this.toggle}>
					<h2>Terms & Conditions</h2>
				</ModalHeader>
				<ModalBody>
						Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Dignissim suspendisse in est ante in nibh. Elementum tempus egestas sed sed risus pretium quam. Ullamcorper velit sed ullamcorper morbi tincidunt ornare. Libero enim sed faucibus turpis in eu. Non curabitur gravida arcu ac tortor. Bibendum enim facilisis gravida neque. Massa massa ultricies mi quis. Nibh venenatis cras sed felis eget velit. Eget nunc scelerisque viverra mauris in aliquam sem fringilla ut. Metus vulputate eu scelerisque felis. Sociis natoque penatibus et magnis dis parturient. Viverra accumsan in nisl nisi. In cursus turpis massa tincidunt dui ut ornare lectus sit. Mattis aliquam faucibus purus in. Eu nisl nunc mi ipsum faucibus vitae. Lacinia at quis risus sed vulputate odio ut.
						Morbi tristique senectus et netus et malesuada fames. Non nisi est sit amet facilisis. Integer quis auctor elit sed vulputate mi sit. Euismod quis viverra nibh cras pulvinar. Lacinia quis vel eros donec ac odio tempor. Massa ultricies mi quis hendrerit dolor. Elementum facilisis leo vel fringilla est. Arcu bibendum at varius vel pharetra. Nunc congue nisi vitae suscipit tellus mauris a diam. Vulputate ut pharetra sit amet aliquam id diam. Ut consequat semper viverra nam libero justo laoreet. Sed vulputate mi sit amet mauris commodo quis imperdiet massa. At urna condimentum mattis pellentesque. Feugiat nibh sed pulvinar proin gravida hendrerit. Nulla pharetra diam sit amet nisl suscipit adipiscing. Cursus turpis massa tincidunt dui ut ornare.
						Tellus elementum sagittis vitae et leo duis ut. Ullamcorper eget nulla facilisi etiam dignissim. Egestas diam in arcu cursus euismod quis viverra. Purus faucibus ornare suspendisse sed nisi lacus sed. Pellentesque massa placerat duis ultricies lacus sed turpis. Convallis aenean et tortor at risus viverra adipiscing at in. Sollicitudin nibh sit amet commodo nulla facilisi nullam vehicula. Ultricies integer quis auctor elit sed vulputate mi sit. Porta non pulvinar neque laoreet suspendisse. Mauris ultrices eros in cursus turpis massa tincidunt dui. Arcu non sodales neque sodales ut etiam sit amet. Tellus cras adipiscing enim eu turpis. Porttitor rhoncus dolor purus non enim praesent. Eget duis at tellus at urna condimentum mattis. Id venenatis a condimentum vitae.
						Volutpat lacus laoreet non curabitur gravida arcu. Mauris pellentesque pulvinar pellentesque habitant morbi. Augue mauris augue neque gravida in fermentum et sollicitudin ac. Id ornare arcu odio ut sem nulla pharetra diam. Sed nisi lacus sed viverra tellus in hac habitasse. Pretium fusce id velit ut tortor pretium viverra. Lorem ipsum dolor sit amet. Auctor elit sed vulputate mi sit. Elementum facilisis leo vel fringilla. Elementum eu facilisis sed odio morbi quis.
						Adipiscing commodo elit at imperdiet dui accumsan sit. Integer feugiat scelerisque varius morbi enim nunc. Luctus accumsan tortor posuere ac ut consequat. Ante in nibh mauris cursus mattis molestie a iaculis. Lorem donec massa sapien faucibus et molestie ac feugiat sed. Id porta nibh venenatis cras sed felis. Cras fermentum odio eu feugiat pretium nibh. In iaculis nunc sed augue lacus viverra vitae. Duis tristique sollicitudin nibh sit amet commodo nulla facilisi nullam. Elementum sagittis vitae et leo duis ut diam. In aliquam sem fringilla ut morbi tincidunt. At quis risus sed vulputate odio ut enim blandit. Consequat interdum varius sit amet. Quis imperdiet massa tincidunt nunc pulvinar sapien et ligula. Euismod lacinia at quis risus sed vulputate. Neque vitae tempus quam pellentesque nec. Diam in arcu cursus euismod quis viverra nibh cras. Pretium nibh ipsum consequat nisl vel pretium lectus quam.
				</ModalBody>
				<ModalFooter>
					<Button color="secondary" onClick={this.toggle}>Cancel</Button>
				</ModalFooter>
			</Modal>
			</span>
		);
	}
}