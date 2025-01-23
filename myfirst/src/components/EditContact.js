import React from "react";

class EditContact extends React.Component {
    constructor(props) {
        super(props)
        const { id, name, email } = props.location.state.contact;
        this.state= {
             id,
             name,
             email,
        }
    }
    update = (e) => {
        e.preventDefault();
        if (this.state.name.trim() === "" && this.state.email.trim() === "") {
            alert("All Fields are mandatory!");
            return
        }
        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailPattern.test(this.state.email.trim())) {
            alert("Please enter a valid email address!");
            return;
        }
        this.props.updateContactHandler(this.state);
        this.setState({ name: "", email: "" });
        // console.log(this.props);
        this.props.history.push("/");

    };
    render() {
        return (
            <div className="ui main" style={{paddingTop:'5rem'}}>
                <h2>Edit Contact</h2>
                <form className="ui form" onSubmit={this.update}>
                    <div className="field">
                        <label> Name :</label>
                        <input type="text" name="name" placeholder="Enter name"
                            value={this.state.name } onChange={(e) => this.setState({name: e.target.value})} required />

                    </div>
                     <div className="field">
                        <label> Email :</label>
                        <input type="email" name="name" placeholder="Enter Email" value={this.state.email } onChange={(e) => this.setState({email: e.target.value})} required/>

                    </div>

                    <button className="ui right labeled icon button blue"><i className="right arrow icon"></i>Update</button>
                </form>
                {/* <button className="ui right labeled icon button blue">
                    <i class="right arrow icon"></i>
                    Add Contact
                </button> */}
            </div>
        );
    }
}

export default EditContact;