import React from "react";
import { Link } from "react-router-dom";
import Dropzone from  'react-dropzone';
import Camera from 'react-camera';
import './_verification.css';

class Verification extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			height: 480,
			type: 0,
			method: 0,
			step: 1,
			front: null,
			back: null,
			clickedOK: false
		};
	}

	takePicture = () => {
		this.camera.capture()
		.then(blob => {
			// this.img.src = URL.createObjectURL(blob);
			// this.img.onload = () => { URL.revokeObjectURL(this.src); }
		})
	}	

	componentDidMount() {
		window.addEventListener('resize', this.handleResize);
		this.handleResize();
	}

	handleResize = () => {
		this.setState({
			height: window.innerHeight
		})
	}

	handleSelectType = (type) => {
		this.setState({
			type: type,
			step: 2
		})
	}

	handleSelectMethod = (method) => {
		this.setState({
			method: method,
			step: 3
		})
	}

	goStep = (step) => {
		this.setState({
			step: step
		})
	}

	handleDropRejected = (files) => {
		console.log(files)
	}

	handleDrop = (acceptedFiles, type) => {
		// let formData = new FormData()

		// acceptedFiles.forEach(function(file) {
		//     formData.append('avatar', file)
		// })

		console.log(acceptedFiles, type)
		// fetch('/talent/uploadUserAvatar', {
		//     method: 'POST',
		//     credentials: 'include',   //send the files to serverside
		//     body: formData
		// })

		if(type === 1) {
			this.setState({
				front: acceptedFiles
			})
		}else {
			this.setState({
				back: acceptedFiles
			})        	
		}
	}	

	hideOverlay = () => {
		this.setState({
			clickedOK: true
		})
	}

	render() {		
		return (
			<div className="verification-page" style={{minHeight: this.state.height}}>
				<div className={`wrapper ${(this.state.step === 4) ? 'last' : ''}`}>
					<h3>Verify your Identity</h3>
					<div className="panel">
						{
							(this.state.step === 1) ?
							<div className="select-type-form">
								<h5>Select ID type</h5>
								<div className="options">
									<div className={`col ${(this.state.type === 1) ? 'active' : ''}`} onClick={()=>this.handleSelectType(1)}>
										<div className="img-wrapper">
											<img src="/assets/img/verification/Passport.png" alt=""/>
										</div>
										<label>Passport</label>
									</div>
									<div className={`col ${(this.state.type === 2) ? 'active' : ''}`} onClick={()=>this.handleSelectType(2)}>
										<div className="img-wrapper">
											<img src="/assets/img/verification/driverlicens-ID.png" alt=""/>
										</div>
										<label>Driver's License</label>
									</div>
									<div className={`col ${(this.state.type === 3) ? 'active' : ''}`} onClick={()=>this.handleSelectType(3)}>
										<div className="img-wrapper">
											<img src="/assets/img/verification/driverlicens-ID.png" alt=""/>
										</div>
										<label>Photo ID</label>
									</div>
								</div>
								<a>I don't have one of these IDs</a>
							</div>: 

							(this.state.step === 2) ?
							<div className="upload-method-form">
								<h5 className="blue">Choose an upload method</h5>
								<div className="options">
									<div className={`col ${(this.state.method === 1) ? 'active' : ''}`} onClick={()=>this.handleSelectMethod(1)}>
										<div className="img-wrapper">
											<img src="/assets/img/verification/Webcam.png" alt=""/>
										</div>
										<label>Webcam</label>										
									</div>
									<div className={`col ${(this.state.method === 2) ? 'active' : ''}`} onClick={()=>this.handleSelectMethod(2)}>
										<div className="img-wrapper">
											<img src="/assets/img/verification/upload.png" alt=""/>
										</div>
										<label>File Upload</label>										
									</div>
								</div>
								<a onClick={()=>this.goStep(1)}>Go back</a>
							</div>: 

							(this.state.step === 3) ?							
							<div className="upload-image-form">
								<h5 className="blue">Upload Images</h5>
								<h6>Upload pictures of driver's licenses (JPEG or PNG).</h6>
								<div className="options">
									<div className="col">
										<Dropzone className="dragAndDropArea" onDrop={(e)=>this.handleDrop(e, 1)}
												  accept="image/jpeg,image/jpg,image/tiff,image/gif,image/png" multiple={false}
												  onDropRejected={this.handleDropRejected}>
											<img className="profile-panel DragnDropDP" src="/assets/img/verification/driverlicens-ID.png" alt=""/>
											<p>Drag & drop or click to upload</p>
										</Dropzone>		
										<div className="label">Front</div>							
									</div>
									<div className="col">
										<Dropzone className="dragAndDropArea" onDrop={(e)=>this.handleDrop(e, 2)}
												  accept="image/jpeg,image/jpg,image/tiff,image/gif,image/png" multiple={false}
												  onDropRejected={this.handleDropRejected}>
											<img className="profile-panel DragnDropDP" src="/assets/img/verification/driverlicens-ID.png" alt=""/>
											<p>Drag & drop or click to upload</p>
										</Dropzone>
										<div className="label">Back</div>										
									</div>
								</div>
								<p>Please do not redact, watermark or otherwise obscure any part of your ID. This will help ensure we can verify your idetify document as quickly and accurately as possible.</p>
								<button className="btn btn-primary continue-btn" onClick={()=>this.goStep(4)} disabled={(this.state.back === null && this.state.front === null) ? 'disabled' : ''}>Continue</button>
								<br/>
								<a onClick={()=>this.goStep(2)}>Go back</a>
							</div>: 

							(this.state.step === 4) ?
							<div className="finish-form">
								<div className="pull-left">
									<div className="top">
										<i>Example</i>
										<div className="clearfix"></div>
										<img src="/assets/img/verification/driverlicens-ID.png" alt=""/>
									</div>
									<ul>
										<li><b>Turnup your brightness</b> and avoid glare</li>
										<li><b>First name</b> and <b>last name</b> clearly visible</li>
										<li><b>Date of birth</b> clearly visible</li>
										<li><b>ID number</b> clearly visible</li>
										<li><b>Fully in frame</b> not cut off on any side</li>
									</ul>
									<div className="clearfix"></div>
								</div>
								<div className={`pull-right ${(this.state.clickedOK === false) ? 'has-overlay' : ''}`}>
									<Camera
										style={{position: 'relative'}}
										ref={(cam) => {
											this.camera = cam;
										}}
									>	
										{
											(this.state.clickedOK === false) ?
											<div className="overlay">
												<p>First, we need a picture of the front of your passport</p>
												<img src="/assets/img/verification/driverlicens-ID.png" alt=""/>
												<button className="btn btn-outline-light" onClick={this.hideOverlay}>OK</button>
											</div> : null
										}
									</Camera>
								</div>
								<div className="clearfix"></div>
							</div>:

							null
						}					
					</div>
					<Link to={`/${localStorage.getItem('lang')}`}>Go back to Blockchain Nordic Spain</Link>
				</div>
			</div>
		)
	}
}

export default Verification
