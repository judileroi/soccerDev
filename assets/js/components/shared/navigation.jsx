// import React from 'react';
// import {connect} from "react-redux";
// import { push } from "react-router-redux";

// const Navigation = (props) => {
//     return (
//         <div id="header">

//         <div className="container">

//             <div className="left-side">
//                 <div id="logo">
//                     <a href="index.html"><img src="theme/images/logo.png" alt="" /></a>
//                 </div>
//                 <div className="menu-responsive">
//                     <i className="fa fa-reorder menu-trigger"></i>
//                 </div>
//                 <nav id="navigation" className="style-1">
//                     <ul id="responsive">

//                         <li><a className="current" href="#">Home</a>
//                             <ul>
//                                 <li><a href="index.html">Home 1</a></li>
//                                 <li><a href="index-2.html">Home 2</a></li>
//                                 <li><a href="index-3.html">Home 3</a></li>
//                                 <li><a href="index-4.html">Home 4</a></li>
//                                 <li><a href="/category" onClick={props.navigateTo.bind(this, '/category')}>Category Resource</a></li>
//                                 <li><a href="/" onClick={props.navigateTo.bind(this, '/')}>Banner</a></li>
//                             </ul>
//                         </li>

//                         <li><a href="#">Listings</a>
//                             <ul>
//                                 <li><a href="#">List Layout</a>
//                                     <ul>
//                                         <li><a href="listings-list-with-sidebar.html">With Sidebar</a></li>
//                                         <li><a href="listings-list-full-width.html">Full Width</a></li>
//                                     </ul>
//                                 </li>
//                                 <li><a href="#">Grid Layout</a>
//                                     <ul>
//                                         <li><a href="listings-grid-with-sidebar-1.html">With Sidebar 1</a></li>
//                                         <li><a href="listings-grid-with-sidebar-2.html">With Sidebar 2</a></li>
//                                         <li><a href="listings-grid-full-width.html">Full Width</a></li>
//                                     </ul>
//                                 </li>
//                                 <li><a href="#">Half Screen Map</a>
//                                     <ul>
//                                         <li><a href="listings-half-screen-map-list.html">List Layout</a></li>
//                                         <li><a href="listings-half-screen-map-grid-1.html">Grid Layout 1</a></li>
//                                         <li><a href="listings-half-screen-map-grid-2.html">Grid Layout 2</a></li>
//                                     </ul>
//                                 </li>
//                                 <li><a href="listings-single-page.html">Single Listing</a></li>
//                                 <li><a href="listings-booking.html">Booking Page</a></li>
//                             </ul>
//                         </li>

//                         <li><a href="#">User Panel</a>
//                             <ul>
//                             <li><a href="dashboard.html">Dashboard</a></li>
//                                 <li><a href="dashboard-messages.html">Messages</a></li>
//                                 <li><a href="dashboard-my-listings.html">My Listings</a></li>
//                                 <li><a href="dashboard-reviews.html">Reviews</a></li>
//                                 <li><a href="dashboard-bookmarks.html">Bookmarks</a></li>
//                                 <li><a href="dashboard-add-listing.html">Add Listing</a></li>
//                                 <li><a href="dashboard-my-profile.html">My Profile</a></li>
//                                 <li><a href="dashboard-invoice.html">Invoice</a></li>
//                             </ul>
//                         </li>

//                         <li><a href="#">Pages</a>
//                             <ul>
//                                 <li><a href="pages-blog.html">Blog</a>
//                                     <ul>
//                                         <li><a href="pages-blog.html">Blog</a></li>
//                                         <li><a href="pages-blog-post.html">Blog Post</a></li>
//                                     </ul>
//                                 </li>
//                                 <li><a href="pages-contact.html">Contact</a></li>
//                                 <li><a href="pages-elements.html">Elements</a></li>
//                                 <li><a href="pages-pricing-tables.html">Pricing Tables</a></li>
//                                 <li><a href="pages-typography.html">Typography</a></li>
//                                 <li><a href="pages-404.html">404 Page</a></li>
//                                 <li><a href="pages-icons.html">Icons</a></li>
//                             </ul>
//                         </li>

//                     </ul>
//                 </nav>
//             </div>

//             <div className="right-side">
//                 <div className="header-widget">
//                     <a href="#sign-in-dialog" className="sign-in popup-with-zoom-anim"><i className="sl sl-icon-login"></i> Sign In</a>
//                     <a href="dashboard-add-listing.html" className="button border with-icon">Devenir Organisateur <i className="sl sl-icon-plus"></i></a>
//                 </div>
//             </div>
//         </div>
//         </div>
//     );
// }

// const mapStateToProps = (state, ownProps) => {
//     return {
//         location: state.location
//     }
// }

// const mapDispatchToProps = (dispatch, ownProps) => {
//     return {
//         navigateTo: (location) => {
//             dispatch(push(location))
//         }
//     }
// }

// export default connect(mapStateToProps, mapDispatchToProps)(Navigation)
