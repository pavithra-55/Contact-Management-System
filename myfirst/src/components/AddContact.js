import React from "react";

class AddContact extends React.Component {
    state = {
        name: "",
        email: ""
    }
    add = (e) => {
        e.preventDefault();
        if (this.state.name.trim() === "" && this.state.email.trim() === "") {
            alert("All Fields are mandatory!");
            return;
        }
        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailPattern.test(this.state.email.trim())) {
            alert("Please enter a valid email address!");
            return;
        }
        this.props.addContactHandler(this.state);
        this.setState({ name: "", email: "" });
        // console.log(this.props);
        this.props.history.push("/");

    };
    render() {
        return (
            <div className="ui main" style={{paddingTop:'5rem'}}>
                <h2>Add Contact</h2>
                <form className="ui form" onSubmit={this.add}>
                    <div className="field">
                        <label> Name :</label>
                        <input type="text" name="name" placeholder="Enter name"
                            value={this.state.name } onChange={(e) => this.setState({name: e.target.value})}  />

                    </div>
                     <div className="field">
                        <label> Email :</label>
                        <input type="email" name="name" placeholder="Enter Email" value={this.state.email } onChange={(e) => this.setState({email: e.target.value})} />

                    </div>

                    <button className="ui right labeled icon button blue"><i className="right arrow icon"></i>Add</button>
                </form>
                {/* <button className="ui right labeled icon button blue">
                    <i class="right arrow icon"></i>
                    Add Contact
                </button> */}
            </div>
        );
    }
}

export default AddContact;