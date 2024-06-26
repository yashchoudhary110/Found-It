import React, { useEffect, useState, useContext } from 'react'
import './css/newcss.css';
import { useParams } from 'react-router-dom';
import Itemcontext from '../context APIs/items/Itemcontext';

export default function Details() {
	const { _id, userId } = useParams();

	const context = useContext(Itemcontext);
	const { getUserById, uploader, pItem, fetchPItem } = context;
	const [iflag, setIflag] = useState(false);
	const [uflag, setUflag] = useState(false);

	// const def_img = process.env.REACT_APP_DEFAULT;

	useEffect(() => {
		console.log(_id);
		_id && fetchPItem(_id).then((d) => {
			if (d.success) { setIflag(true); }
			else console.log(d.message);
		})
		userId && getUserById(userId).then((d) => {
			if (d.success) setUflag(true);
			else console.log(d.message);
		})
		console.log("Uploader: ", uploader);
		console.log("Item: ", pItem);
		// eslint-disable-next-line
	}, [])


	return (
		<div>
			<link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css" rel="stylesheet" />
			<div className="container">
				<div id="user-profile-2" className="user-profile">
					<div className="tabbable">
						{/* <ul className="nav nav-tabs padding-18">
                            <li className="active">
                                <a data-toggle="tab" href="#home">
                                    <i className="green ace-icon fa fa-user bigger-120"></i>
                                    Profile
                                </a>
                            </li>

                            <li>
                                <a data-toggle="tab" href="#feed">
                                    <i className="orange ace-icon fa fa-rss bigger-120"></i>
                                    Activity Feed
                                </a>
                            </li>

                            <li>
                                <a data-toggle="tab" href="#friends">
                                    <i className="blue ace-icon fa fa-users bigger-120"></i>
                                    Friends
                                </a>
                            </li>

                            <li>
                                <a data-toggle="tab" href="#pictures">
                                    <i className="pink ace-icon fa fa-picture-o bigger-120"></i>
                                    Pictures
                                </a>
                            </li>
                        </ul> */}

						<div className="tab-content no-border padding-24">
							<div id="home" className="tab-pane in active">
								<div className="row">
									<div className="col-xs-12 col-sm-3 center">
										
											{/* <img className="editable img-responsive" alt=" Avatar" id="avatar2" src="https://bootdey.com/img/Content/avatar/avatar6.png" /> */}

											
												<img src={uploader.user_image}
													alt="course"
													onError={({ currentTarget }) => {
														currentTarget.onerror = null; // prevents looping
														//currentTarget.src = { def_img };
													}} className="bd-placeholder-img bd-placeholder-img-lg featurette-image img-fluid mx-auto" style={{ "width": 300, "height": 300 }} preserveAspectRatio="xMidYMid slice" focusable="false" />
											
										

										<div className="space space-4 myn" ></div>

										{/* <a href="/" className="btn btn-sm btn-block btn-success">
											<i className="ace-icon fa fa-plus-circle bigger-120"></i>
											<span className="bigger-110">Add as a friend</span>
										</a> */}

										<a href="/" className="btn btn-sm btn-block btn-primary">
											<i className="ace-icon fa fa-envelope-o bigger-110"></i>
											<span className="bigger-110">  Send a message</span>
										</a>
									</div>

									{/* ************ Uploader Info *************/}
									{
										uflag &&
										<div className="col-xs-12 col-sm-9">
											{/* <h4 className="blue">
												<span className="middle">John Doe</span>

												<span className="label label-purple arrowed-in-right">
													<i className="ace-icon fa fa-circle smaller-80 align-middle"></i>
													online
												</span>
											</h4> */}

											<div className="profile-user-info">
												<div className="profile-info-row">
													<div className="profile-info-name"> Username </div>

													<div className="profile-info-value">
														<span>{uploader.name}</span>
													</div>
												</div>

												<div className="profile-info-row">
													<div className="profile-info-name"> Company : </div>

													<div className="profile-info-value">
														<i className="fa fa-map-marker light-orange bigger-110"></i>
														<span>{pItem.company_name}</span>
														{/* <span>Amsterdam</span> */}
													</div>
												</div>

												<div className="profile-info-row">
													<div className="profile-info-name"> Profile :</div>

													<div className="profile-info-value">
														<span>{pItem.profile}</span>
													</div>
												</div>

												<div className="profile-info-row">
													<div className="profile-info-name"> Date :</div>

													<div className="profile-info-value">
														<span>{pItem.date}</span>
													</div>
												</div>

												<div className="profile-info-row">
													<div className="profile-info-name"> Number of Rounds :</div>

													<div className="profile-info-value">
														<span>{pItem.No_rounds}</span>
													</div>
												</div>
												{/* <div className="profile-info-row">
													<div className="profile-info-name">  :</div>

													<div className="profile-info-value">
														<span>{pItem.No_rounds}</span>
													</div>
												</div> */}
											</div>

											<div className="hr hr-8 dotted"></div>

											<div className="profile-user-info">
												<div className="profile-info-row">
													<div className="profile-info-name">Intern or FTE :</div>

													<div className="profile-info-value">
														{pItem.intern_or_fte}
													</div>
												</div>

												{/* <div className="profile-info-row">
													<div className="profile-info-name">
														<i className="middle ace-icon fa fa-facebook-square bigger-150 blue"></i>
													</div>

													 <div className="profile-info-value">
														<a href="/">Find me on Facebook</a>
													</div> 
												</div> */}

												{/* <div className="profile-info-row">
													<div className="profile-info-name">
														<i className="middle ace-icon fa fa-twitter-square bigger-150 light-blue"></i>
													</div>

													 <div className="profile-info-value">
														<a href="/">Contact me</a>
													</div> 
												</div> */}
											</div>
										</div>
									}

								</div>
								{/* <!-- /.row --> */}

								<div className="space-20"></div>

								{
									iflag &&
									<div className="row">
										<div className="col-xs-12 col-sm-6">
											<div className="widget-box transparent">
												<div className="widget-header widget-header-small">
													<h4 className="widget-title smaller">
														{/* <i className="ace-icon fa fa-check-square-o bigger-110"></i> */}
														 {pItem.company_name} interview Experience: 
													</h4>
												</div>

												<div className="widget-body">
													<div className="widget-main" style={{ textAlign: "justify",
  textJustify: "inter-word"}}>
														<p>
															{/* My job is mostly lorem ipsuming and dolor sit ameting as long as consectetur adipiscing elit. */}
															{pItem.round_exp}
														</p>
														{/* <p>
															Sometimes quisque commodo massa gets in the way and sed ipsum porttitor facilisis.
														</p>
														<p>
															The best thing about my job is that vestibulum id ligula porta felis euismod and nullam quis risus eget urna mollis ornare.
														</p>
														<p>
															Thanks for visiting my profile.
														</p> */}
													</div>
												</div>
											</div>
										</div>
									</div>
								}

							</div>
							

							
														{/* <!-- /#pictures --> */}
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
