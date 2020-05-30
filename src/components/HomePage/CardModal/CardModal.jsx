import './CardModal.scss';
import React, { Component } from "react";

class CardModal extends Component {
  render() {
    return (
      <div className="CardModal">
        <div className="top-card">
          <img src={this.props.photo} alt="profile" />
          <div className="info-top-card">
            <div>
              <h4>{this.props.user}</h4>
              <p className="info-hour">Il y a {this.props.hour} heures</p>
            </div>
          </div>
        </div>
        <p className="card-content">{this.props.content}</p>
      </div>
    );
  }
}

export default CardModal;
