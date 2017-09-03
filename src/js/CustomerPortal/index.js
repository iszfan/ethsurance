import React from "react";

import BalanceCard from "./BalanceCard";
import MakePayment from "./MakePayment";

import "./style.scss";

class CustomerPortal extends React.Component {

  constructor(props) {
    super(props);
    this.state = {policy: null};

    this.handleMakePayment = this.handleMakePayment.bind(this);
  }

  componentWillMount() {
    const contract = this.props.contract;
    contract.getPolicy(this.props.address).then(policy => {
      this.setState({policy: policy});
    });
    contract.getPayments(this.props.address).then(payments => {
      console.log(payments);
    });
  }

  componentWillReceiveProps(nextProps) {
    const contract = nextProps.contract;
    contract.getPolicy(nextProps.address).then(policy => {
      this.setState({policy: policy});
    });
  }

  handleMakePayment(amount) {
    const contract = this.props.contract;
    contract.makePayment(amount, this.props.address).then(() => {
      contract.getPolicy(this.props.address).then(policy => {
        this.setState({policy: policy});
      });
    })
  }

  render() {
    const defaultPercentage = this.state.policy ? this.state.policy.guaranteedPercentage : null;
    const balance = this.state.policy ? this.state.policy.balance : null;
    return (
      <div className="customer-portal">
        <BalanceCard balance={balance} />
        <MakePayment makePayment={this.handleMakePayment} />
      </div>

    );
  }
}

CustomerPortal.propTypes = {
  address: React.PropTypes.string.isRequired,
  onLogout: React.PropTypes.func.isRequired,
  contract: React.PropTypes.object.isRequired,
};


export default CustomerPortal;