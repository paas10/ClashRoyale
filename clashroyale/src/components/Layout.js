import { React, Component } from "react";
import "./styles/Layout.css";
import SuperCell from "./../images/supercell_logo.png";
import ClashRoyale from "./../images/ClashRoyaleLogo.png";
import { GrPowerShutdown } from 'react-icons/gr';

class Layout extends Component {
  render () {
    return (
      <div>
        <div className="header">
          <div className="row rowHeader m-0">
            <div className="text-left col-2">
              <img src={SuperCell} className="SuperCellImg ml-2" />
            </div>
            <div className="text-center col-8">
              <img src={ClashRoyale} className="ClashRoyaleImg" />
            </div>
            <div className="text-right col-2">
              <a href="/login">
                <GrPowerShutdown />
              </a>
            </div>
          </div>
        </div>
        {this.props.children}
      </div>
    );
  }

  handleDelete() {
    this.props.onDelete(this.props.children);
  }
}

export default Layout;
