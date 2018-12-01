import React from 'react';

const SideBarAdmin = () => {
  return (
      <div>
      <div className="listing-item-container compact order-summary-widget">
        <div className="listing-item">
          <img src="images/listing-item-04.jpg" alt=""/>

            <div className="listing-item-content">
              <div className="numerical-rating" data-rating="5.0"></div>
              <h3>Burger House</h3>
              <span>2726 Shinn Street, New York</span>
            </div>
				</div>
        </div>
        <div className="boxed-widget opening-hours summary margin-top-0">
          <h3><i className="fa fa-calendar-check-o"></i> Booking Summary</h3>
          <ul>
            <li>Date <span>10/20/2017</span></li>
            <li>Hour <span>5:30 PM</span></li>
            <li>Guests <span>1-2 People</span></li>
            <li className="total-costs">Total Cost <span>$9.00</span></li>
          </ul>

        </div>
      </div>
      );
        }
         
export default SideBarAdmin;